const express = require('express');
const Module = require('../controller/module');
const { userId } = require('../config');
const { handleRespondData } = require('../utils');
const { ControllerType } = require('../constant');

const router = express.Router();

router.get('/fetchDiaryList', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/fetchModuleList', (req, res, next) => {
  Module.handleFetchModule(userId, ['id', 'name'])
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchDetail', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/fetchTemplateContent', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/fetchModulesById', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/fetchConfig', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/fetchLogList', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/fetchModule', (req, res, next) => {
  Module.handleFetchModule({ userId })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchModuleDetail', (req, res) => {
  const { query: { id } } = req;
  Module.handleFetchModuleDetail(id)
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.post('/updateModuleDetail', async (req, res) => {
  const { body } = req;
  const { id, name, controllerType } = body;
  if (!ControllerType[controllerType]) {
    res.send(handleRespondData(false, false, '编辑框类型不合法'));
    return;
  }

  // 验证name唯一性
  if (await Module.hasName(name, id)) {
    res.send(handleRespondData(null, false, '模块名称已存在'));
    return;
  }

  Module.handleSaveModule({ ...body })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.delete('/deleteModule', (req, res, next) => {
  const { body: { id, parentId } } = req;
  if (id === undefined) {
    res.send(handleRespondData(null, false, '参数错误'));
    return;
  }

  Module.handleDeleteModule({ id, parentId })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchTemplate', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/fetchTemplateDetail', (req, res, next) => {
});

router.get('/fetchTemplateBasicDetail', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/updateTemplateDetail', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/updateTemplateBasicDetail', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/deleteTemplate', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;