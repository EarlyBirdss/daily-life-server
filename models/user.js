const mongoose = require('mongoose');
const UserShema = require('../schemas/user');

const User = mongoose.model('User', UserShema);

function createUser(params) {
  return new Promise(resolve => {
    const user = new User(params);
    user.save(err => {
      resolve(err ? undifined : user);
    });
  });
}

function updateUser(params) {

}

function deleteUser(params) {

}

function findUser(query) {
  return User.findOne(query, (err, user) => {
    return new Promise(resolve => resolve(user));
  });
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findUser,
};