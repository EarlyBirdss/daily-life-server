const mongoose = require('mongoose');
const { Schema } = mongoose;

const TemplateSchema = new Schema({
  id: Schema.Types.ObjectId,
  userId: String,
  sortId: Number,
  name: { type: String, default: '', trim: true, maxlength: 20 },
  description: { type: String, default: '', trim: true, maxlength: 400 },
  createAt: Date,
  modifyAt: Date,
  todoList: [],
  modules: [],
  isDeleted: Boolean,
});

module.exports = TemplateSchema;
