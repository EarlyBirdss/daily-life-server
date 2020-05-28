const express = require('express');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const diary = require('./routes/diary');

const app = express();

// 设置静态文件存放文件夹
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/diary', diary);

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

mongoose.connection
  .on('error', console.log)
  // .on('disconnected', connect)
  .once('open', () => {
    const server = app.listen(8082, () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`Server started! Please visit ${host}:${port}`);
    });
  });

mongoose.connect(config.db, {
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
