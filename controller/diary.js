const Diary = require('../models/diary');

async function handleFetchDiary({ userId }) {
  return await Diary.getDiary({ userId });
}

module.exports = {
  handleFetchDiary,
};