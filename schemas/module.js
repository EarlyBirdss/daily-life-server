const mongoose = require('mongoose');
const { Schema } = mongoose;

const ModuleSchema = new Schema({
  // id: Schema.Types.ObjectId,
  userId: Number,
  userName: String,
  parentId: String, // 仅限子模块
  name: { type: String, default: '', trim: true, maxlength: 20 },
  description: { type: String, default: '', trim: true, maxlength: 400 },
  controllerType: String,
  editable: Boolean,
  type: String,
  createAt: Date,
  modifyAt: Date,
  children: Array,
}, { id: true });

// 输出id而不是_id
ModuleSchema.virtual('id').get(() => this._id);
ModuleSchema.set('toJSON', {
  virtuals: true
});

module.exports = ModuleSchema;