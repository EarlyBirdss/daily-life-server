const mongoose = require('mongoose');
const DiarySchema = require('../schemas/diary');
const lodash = require('lodash');

const Diary = mongoose.model('Diary', DiarySchema);

function getDiaries({ userId, dateRange }) {
  let query = { userId };
  if (lodash.isArray(dateRange)) {
    const dateQuery = {date: { $gte: dateRange[0], $lte: dateRange[1] }};
    query = {...query, ...dateQuery};
  }

  return Diary.find(query, (err, diaries) => {
    // util handle Error
    return new Promise(resolve => resolve(diaries), reject => reject([]));
  });
}

function createDiary(data) {
  return new Promise(resolve => {
    const diary = new Diary(data);
    diary.save(err => {
      resolve(diary);
    });
  });
}

function updateDiary({ _id, ...data }) {
  return Diary.findByIdAndUpdate(_id, data, {}, err => {
    return new Promise(resolve => resolve({_id, ...data}));
  });
}

function findDiary(query) {
  return Diary.find(query, (err, diaries) => {
    return new Promise(resolve => resolve(diaries));
  });
}

function deleteDiary(_id) {
  return Diary.findByIdAndDelete(_id).then(() => {
    return new Promise(resolve => {
      resolve({ _id });
    });
  });
}

module.exports = {
  getDiaries,
  createDiary,
  updateDiary,
  findDiary,
  deleteDiary,
};
