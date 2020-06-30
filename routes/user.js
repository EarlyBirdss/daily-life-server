const express = require('express');
const User = require('../controller/user');
const { handleRespondData } = require('../utils');

const router = express.Router();

router.get('/fetchUserInfo', (req, res) => {

});

router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  if (!userName) {
    res.send(handleRespondData(null, false, '请输入用户昵称'));
  }

  User.handleFindUser({ userName })
    .then(data => {
      if (data && data.password === password) {
        req.session.regenerate(err => {
          if (err) {
            res.send(handleRespondData(null, false, '登录失败'));
          }
          req.session.user = data;
          console.log('session', req.session.user)
          res.send(handleRespondData({ userName }));
        });
      } else {
        res.send(handleRespondData(null, false, '用户名或密码错误'));
      }
    });
});

router.post('/loginOut', (req, res) => {
  console.log(req.session.user);
  req.session.destroy(err => {
    if (err) {
      res.send(handleRespondData(null, false, '退出登录失败'));
    }

    res.send(handleRespondData({ userName }));
  });
});

router.post('/register', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName) {
    res.send(handleRespondData(null, false, '请输入用户昵称'));
  }

  // 验证name唯一性
  if (await User.hasUserName(userName)) {
    res.send(handleRespondData(null, false, '用户昵称已存在'));
    return;
  }

  User.handleCreateUser({ userName, password })
    .then(data => {
      res.send(handleRespondData(data));
    });
});


module.exports = router;