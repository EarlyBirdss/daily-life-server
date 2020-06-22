const DiaryLog = require('../models/diaryLog');

async function handleCreateDiaryLog({ userId, ...params }) {
  if (userId === undefined || userId === null) {
    return new Error('Params Error: miss "userId"');
  }
  return await DiaryLog.createLog({ ...params, userId, modifyAt: new Date()});
}

async function handleFetchDiaryLog(diaryId) {
  return await DiaryLog.fetchDiaryLogList({ diaryId });
}

async function handleDeleteDiaryLog(diaryId) {
  return await DiaryLog.deleteDiaryLog(diaryId);
}

module.exports = {
  handleCreateDiaryLog,
  handleFetchDiaryLog,
  handleDeleteDiaryLog,
};
