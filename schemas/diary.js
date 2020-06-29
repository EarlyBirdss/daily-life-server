const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiarySchema = new Schema({
  id: Schema.Types.ObjectId,
  userId: Number,
  sortId: Number,
  date: { type: Date, required: true },
  createAt: Date,
  modifyAt: Date,
  grade: { type: Number, min: 0, max: 100 },
  // completedModules: [String],
  // modules: [Object],
  // modules: [{
  //   id: Schema.Types.ObjectId,
  // }],
  todoList: [],
  modules: [],
  remark: String,
  isDeleted: Boolean,
}, {
  // safe: true,
  // autoIndex: true,
  toJSON: { virtuals: true },
});

DiarySchema.methods = {
  update: content => {
    const err = this.validateSync();
    this.save();
  },
  markGrade: (id, grade) => {
    this.findById(id, (error, diary) => {
      // const err = this.validateSync();
      // if (err && err.toString()) throw new Error(err.toString());
      diary.grade = grade;
      return diary.save();
    });
  },
};

DiarySchema.virtual('completedModules').get(function() {
  const modules = this.modules || [];
  return modules.reduce((a, b) => a.concat(b.children || b), [])
    .filter(module => module.content)
    .map(item => item.name);
});

module.exports = DiarySchema;