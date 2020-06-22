module.exports = {
  db: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017', // /?compressors=disabled&gssapiServiceName=mongodb
  userId: '100024', // 调试开发暂时使用
  user: { userId: '100024', userName: 'Mathilda' },
};