function handleRespondData(data, success, tip) {

  if (data === false || data === undefined || data === null) {
    success = success || false;
    tip = tip || '请求失败';
  } else {
    success = true;
    tip = '请求成功';
  }

  return {
    data,
    tip,
    success,
  };
}

module.exports = {
  handleRespondData,
};
