const mongoose = require('mongoose');
const DiarySchema = require('../schemas/diary');

const Diary = mongoose.model('Diary', DiarySchema);

function getDiaries({ userId }) {

  return Diary.find({ userId }, (err, diaries) => {
    // util handle Error
    return new Promise(resolve => resolve(diaries), reject => reject([]));
  });
}

function createDiary(data) {
  const diary = new Diary(data);
  return diary.save(err => {
    return new Promise(resolve => resolve(diary));
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
  return Diary.findByIdAndDelete(_id, {}, err => {
    return new Promise(resolve => resolve(_id));
  });
}

module.exports = {
  getDiaries,
  createDiary,
  updateDiary,
  findDiary,
  deleteDiary,
};
