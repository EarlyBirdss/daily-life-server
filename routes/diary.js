const express = require('express');
const Module = require('../controller/module');
const Diary = require('../controller/diary');
const Template = require('../controller/template');
const DiaryLog = require('../controller/diaryLog');
const { handleRespondData } = require('../utils');
const { ControllerType } = require('../constant');

const router = express.Router();

router.get('/fetchDiaryList', (req, res) => {
  let { modules = "[]", childModules = "[]", dateRange, dayIndexMin, dayIndexMax, userId } = req.query;
  const dayIndexRange = [dayIndexMin, dayIndexMax];
  modules = modules ? JSON.parse(modules) : [];
  childModules = childModules ? JSON.parse(childModules) : [];
  const children = childModules.map(({ key, label }) => {
    const [childId, id] = key.split('__');
    const module = modules.find(({ key }) => key === id) || {};
    return {
      key,
      id: childId,
      parentId: id,
      label: `${module.label || ''}-${label}`
    }
  });
  const parents = modules.filter(({ key }) => !children.find(({ parentId }) => parentId === key));

  Diary.handleFetchDiaries({ userId, dateRange, dayIndexRange })
    .then(data => {
      const result = {
        list: data,
        pagination: {},
        customsColumns: [...parents, ...children],
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
  const { remark, userId, ...content } = req.body;
  Diary.hanleSubmitDiary({ userId, ...content })
    .then(data => {
      if (remark !== undefined && remark !== null) {
      // 更新修改记录 log
      DiaryLog.handleCreateDiaryLog({ userId, diaryId: data._id, remark })
        .then(() => {
          res.send(handleRespondData(data));
        });
      } else {
        res.send(handleRespondData(data));
      }
    });
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
      // 删除修改记录
      DiaryLog.handleDeleteDiaryLog(_id)
        .then(() => {
          res.send(handleRespondData(data));
        });
    });
});

router.get('/fetchModuleList', (req, res) => {
  const { userId } = req.query;
  Module.handleFetchModule({ userId }, ['_id', 'name'])
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchTodoList', (req, res, next) => {
  const { userId } = req.query;

  Module.handleFetchTodoList({ userId }, ['_id', 'name'])
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchLogList', (req, res) => {
  const { _id } = req.query;
  DiaryLog.handleFetchDiaryLog(_id)
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.get('/fetchModule', (req, res) => {
  const { userId } = req.query;
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
  const { userId } = req.query;
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
  const { userId, ...params } = req.body;
  Template.handleSaveTemplateDetail({ ...params, userId })
    .then(data => {
      res.send(handleRespondData(data));
    });
});

router.post('/saveTemplateBasicDetail', (req, res) => {
  const { userId, ...params } = req.body;
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