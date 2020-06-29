const User = require('../models/user');

async function handleCreateUser(params) {
  return await User.createUser(params);
}

async function handleFindUser(query) {
  return await User.findUser(query);
}

async function hasUserName(userName) {
  const data = await User.findUser({ userName });
  return !!data.length;
}

module.exports = {
  handleCreateUser,
  handleFindUser,
  hasUserName,
}