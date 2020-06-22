const Diary = require('../models/diary');

async function handleFetchDiaries({ userId }) {
  return await Diary.getDiaries({ userId });
}

async function handleFetchDiary(query) {
  const diaries = await Diary.findDiary(query);
  return diaries.length ? diaries[0] : {};
}

async function hanleSubmitDiary({ _id, customModules, ...content }) {
  if (_id === undefined || _id === null) {
    content.createAt = new Date();
    return await Diary.createDiary({ modules: customModules, ...content });
  } else {
    content.modifyAt = new Date();
    return await Diary.updateDiary({ _id, modules: customModules, ...content });
  }
}

async function handleMarkGrade(params) {
  return await Diary.updateDiary(params);
}

async function handleDeleteDiary(_id) {
  return await Diary.deleteDiary(_id);
}

module.exports = {
  handleFetchDiaries,
  hanleSubmitDiary,
  handleFetchDiary,
  handleMarkGrade,
  handleDeleteDiary,
};