const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiaryLogSchema = new Schema({
  id: Schema.Types.ObjectId,
  userId: Number,
  diaryId: String,
  modifyAt: Date,
  remark: { type: String, default: '', trim: true, maxlength: 400 },
});

module.exports = DiaryLogSchema;