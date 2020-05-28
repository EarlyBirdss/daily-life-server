const mongoose = require('mongoose');
const { Schema } = mongoose;

const TemplateSchema = new Schema({
  id: Schema.Types.ObjectId,
  userId: Number,
  name: { type: String, default: '', trim: true, maxlength: 20 },
  descritpion: { type: String, default: '', trim: true, maxlength: 400 },
  createAt: Date,
  modifyAt: Date,
});

module.exports = TemplateSchema;