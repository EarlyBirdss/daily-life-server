const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiaryLogSchema = new Schema({
  id: Schema.Types.ObjectId,
  userId: String,
  diaryId: String,
  modifyAt: Date,
  remark: { type: String, default: '', trim: true, maxlength: 400 },
});

module.exports = DiaryLogSchema;