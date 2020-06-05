const mongoose = require('mongoose');
const ModuleSchema = require('../schemas/module');

const Module = mongoose.model('Module', ModuleSchema);

function getModuleList({ userId }) {
  return Module.find({ userId }, (err, modules) => {
    // util handle Error
    return new Promise(resolve => resolve(modules), reject => reject(null));
  });
}

function createModule({ ...data }) {
  const module = new Module(data);
  return module.save(err => {
    return new Promise(resolve => resolve(data));
  });
}

function updateModule({ id, ...data }) {
  return Module.findByIdAndUpdate(id, data, {}, err => {
    return new Promise(resolve => resolve({id, ...data}));
  });
}

function updateSubModule({ id, ...data }) {
  return Module.findById(id, (err, module) => {
    const { children } = module;
    const { subId, ...content } = data;
    if (subId !== undefined && subId !== null) {
      // 更新
      const index = children.findIndex(({ _id }) => subId === _id.toString());
      Object.assign(children[index], { modifyAt: new Date(), ...content });
    } else {
      // 新增
      const newChild = new Module(data);
      Object.assign(newChild, { parentId: id, createAt: new Date() });
      children.push(newChild);
    }
    return module.save(err => {
      return new Promise(resolve => resolve(module));
    });
  });
}

function findModule(query) {
  return Module.find(query, (err, docs) => {
    // util handle Error
    return new Promise(resolve => resolve(docs), reject => reject(null));
  });
}

function deleteModule(id) {
  return Module.findByIdAndDelete(id, (err, docs) => {
    return new Promise(resolve => resolve(docs), reject => reject(null));
  });
}

function deleteSubModule(id, subId) {
  return Module.findById(id, (err, module) => {
    const { children } = module;
    const index = children.findIndex(({ id }) => subId === id);
    children.splice(index, 1);
    return module.save(err => {
      return new Promise(resolve => resolve(module));
    });
  });
}

module.exports = {
  getModuleList,
  createModule,
  updateModule,
  updateSubModule,
  findModule,
  deleteModule,
  deleteSubModule,
};