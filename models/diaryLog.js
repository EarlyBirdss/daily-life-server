const mongoose = require('mongoose');
const DiaryLogSchema = require('../schemas/diaryLog');

const DiaryLog = mongoose.model('DiaryLog', DiaryLogSchema);

function createLog(params) {
  console.log('createLog', params)
  const log = new DiaryLog(params);
  return log.save((err, diaryLog) => {
    new Promise(resolve => resolve(diaryLog));
  });
}

function fetchDiaryLogList(query) {
  return DiaryLog.find({}, (err, diaryLogs) => {
    return new Promise(resolve => resolve(diaryLogs));
  });
}

function deleteDiaryLog(diaryId) {
  return DiaryLog.deleteMany({ diaryId }, err => {
    return new Promise(resolve => resolve(diaryId));
  });
}

module.exports = {
  createLog,
  fetchDiaryLogList,
  deleteDiaryLog,
};