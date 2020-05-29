const mongoose = require('mongoose');
const DiarySchema = require('../schemas/diary');

const Diary = mongoose.model('Diary', DiarySchema);

function getDiary({ userId }) {
  return Diary.find({ userId }, (err, diaries) => {
    // util handle Error
    return new Promise(resolve => resolve(diaries), reject => reject([]));
  });
}

module.exports = {
  getDiary,
};
