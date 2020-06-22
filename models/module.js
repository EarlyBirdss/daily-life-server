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

function updateModule({ _id, ...data }) {
  return Module.findByIdAndUpdate(_id, data, {}, err => {
    return new Promise(resolve => resolve({_id, ...data}));
  });
}

function updateSubModule({ _id, ...data }) {
  return Module.findById(_id, (err, module) => {
    const { children } = module;
    const { subId, ...content } = data;
    if (subId !== undefined && subId !== null) {
      // 更新
      const index = children.findIndex(({ _id: id }) => subId === id.toString());
      Object.assign(children[index], { modifyAt: new Date(), ...content });
    } else {
      // 新增
      const newChild = new Module(data);
      Object.assign(newChild, { parentId: _id, createAt: new Date() });
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

function deleteModule(_id) {
  return Module.findByIdAndDelete(_id, (err, docs) => {
    return new Promise(resolve => resolve(docs), reject => reject(null));
  });
}

function deleteSubModule(_id, subId) {
  return Module.findById(_id, (err, module) => {
    const { children } = module;
    const index = children.findIndex(({ _id }) => subId === _id);
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