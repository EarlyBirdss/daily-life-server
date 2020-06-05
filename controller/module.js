const { isArray } = require('lodash');
const Module = require('../models/module');
const { user } = require('../config');

async function handleFetchModule(params, filterFields) {
  const data = await Module.getModuleList(params);
  if (isArray(filterFields)) {
    return data.map(item => {
      const result = {};
      filterFields.forEach(field => {
        result[field] = item[field];
      });
      result.children = item.children.map(childItem => {
        const childResult = {};
        filterFields.forEach(field => {
          childResult[field] = childItem[field];
        });

        return childResult;
      });
      return result;
    });
  }
  return data;
}

async function handleSaveModule({ id, parentId, ...data}) {
  const { userId, userName } = user;
  if (parentId !== undefined && parentId !== null) {
    // 新增或更新子模块
    return await Module.updateSubModule({ id: parentId, subId: id, ...data });
  } else {
    // 新增或更新模块
    if (id !== undefined && id !== null) {
      return await Module.updateModule({ id, ...data, modifyAt: new Date() });
    } else {
      return await Module.createModule({ ...data, createAt: new Date(), userId, userName });
    }
  }
}

async function hasName(name, id) {
  const data = await Module.findModule({ name });
  return data.every(({ _id }) => _id.toString() === id) || !data.length ? false : true;
}

async function handleDeleteModule({ id, parentId }) {
  if (parentId !== undefined && parentId !== null) {
    // 删除子模块
    return await Module.deleteSubModule(parentId, id);
  } else {
    //  删除模块
    return await Module.deleteModule(id);
  }
}

async function handleFetchModuleDetail(id, parentId) {
  const modules = await Module.findModule({ _id: parentId || id });
  const module = modules.length ? modules[0] : {};

  if ( parentId ) {
    return module.children ? module.children.find(({ _id }) => _id.toString() === id) || {} : {};
  }
  return module;
}

async function handleFetchTodoList({ userId }, filterFields) {
  const modules = await Module.findModule({ controllerType: 'TODOLIST', userId });
  const todoList = modules.length ? modules[0].children : [];

  if (isArray(filterFields)) {
    return todoList.map(item => {
      const result = {};
      filterFields.forEach(field => {
        result[field] = item[field];
      });
      return result;
    });
  }

  return todoList;
}



module.exports = {
  handleFetchModule,
  handleSaveModule,
  hasName,
  handleDeleteModule,
  handleFetchModuleDetail,
  handleFetchTodoList,
};