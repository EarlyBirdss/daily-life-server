const Template = require('../models/template');

async function handleSaveTemplateDetail(params) {
  const { _id, ...content } = params;
  if (_id === undefined || _id === null) {
    return await Template.createTemplate({ ...content, createAt: new Date() });
  } else {
    return await Template.updateTemplate(_id, { ...content, modifyAt: new Date() });
  }
}

async function handleFetchTemplateList(query) {
  return await Template.fetchTemplateList(query)
}

async function handleDeleteTemplate({ _id }) {
  return await Template.deleteTemplate(_id);
}

async function handleFetchTemplateDetail(_id) {
  return await Template.fetchTemplateDetail(_id);
}
module.exports = {
  handleSaveTemplateDetail,
  handleFetchTemplateList,
  handleDeleteTemplate,
  handleFetchTemplateDetail,
};
