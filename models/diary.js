const mongoose = require('mongoose');
const DiarySchema = require('./schemas/diary');

mongoose.model('Diary', DiarySchema);
