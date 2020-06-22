const express = require('express');
const Module = require('../controller/module');
const Diary = require('../controller/diary');
const Template = require('../controller/template');
const { userId } = require('../config');
const { handleRespondData } = require('../utils');
const { ControllerType } = require('../constant');

const router = express.Router();

router.get('/fetchDiaryList', (req, res) => {
  Diary.handleFetchDiaries({ userId })
    .then(data => {
      const result = {
        list: data,
        // list: [],
        pagination: {},
        customsColumns: [],
      };
      res.send(handleRespondData(result));
    });
});

router.get('/fetchDiary', (req, res) => {
  const { _id } = req.query;
  Diary.handleFetchDiary({ _id })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.post('/saveDiary', (req, res) => {
  const { remark, ...content } = req.body;
  Diary.hanleSubmitDiary({ userId, ...content })
    .then(data => {
      res.send(handleRespondData(data));
    });
    // 更新修改记录 log
});

router.post('/markGrade', (req, res) => {
  const { _id, grade, remark } = req.body;
  Diary.handleMarkGrade({ _id, grade, remark })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.delete('/deleteDiary', (req, res) => {
  const { _id } = req.body;
  Diary.handleDeleteDiary(_id)
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchModuleList', (req, res) => {
  Module.handleFetchModule({ userId }, ['_id', 'name'])
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

router.get('/fetchTodoList', (req, res, next) => {
  Module.handleFetchTodoList({ userId }, ['_id', 'name'])
    .then(data => {
      res.send(handleRespondData(data));
    });
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
  const { query: { _id, parentId } } = req;
  Module.handleFetchModuleDetail(_id, parentId)
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.post('/updateModuleDetail', async (req, res) => {
  const { body } = req;
  const { _id, name, controllerType } = body;
  if (!ControllerType[controllerType]) {
    res.send(handleRespondData(false, false, '编辑框类型不合法'));
    return;
  }

  // 验证name唯一性
  if (await Module.hasName(name, _id)) {
    res.send(handleRespondData(null, false, '模块名称已存在'));
    return;
  }

  Module.handleSaveModule({ ...body })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.delete('/deleteModule', (req, res, next) => {
  const { body: { _id, parentId } } = req;
  if (_id === undefined) {
    res.send(handleRespondData(null, false, '参数错误'));
    return;
  }

  Module.handleDeleteModule({ _id, parentId })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchTemplateList', (req, res) => {
  Template.handleFetchTemplateList({ userId })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchTemplateDetail', (req, res) => {
  const { _id } = req.query;
  Template.handleFetchTemplateDetail(_id)
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchTemplateBasicDetail', (req, res) => {
  const { _id } = req.query;
  Template.handleFetchTemplateDetail(_id)
    .then(data => {
      const { _id, name, description } = data || {};
      res.send(handleRespondData({ _id, name, description }));
    });
});

router.post('/saveTemplate', (req, res) => {
  const params = req.body;
  Template.handleSaveTemplateDetail({ ...params, userId })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.post('/saveTemplateBasicDetail', (req, res) => {
  const params = req.body;
  Template.handleSaveTemplateDetail({ ...params, userId })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.delete('/deleteTemplate', (req, res) => {
  const { _id } = req.body;
  Template.handleDeleteTemplate({ _id })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

module.exports = router;