const mongoose = require('mongoose');
const TemplateSchema = require('../schemas/template');

const Template = mongoose.model('template', TemplateSchema);

function createTemplate(content) {
  const template = new Template(content);
  return template.save(err => {
    return new Promise(resolve => resolve(template));
  });
}

function updateTemplate(_id, content) {
  return Template.findByIdAndUpdate(_id, {...content}, {}, err => {
    return new Promise(resolve => resolve({ _id, ...content }));
  });
}

function fetchTemplateList(query) {
  return Template.find(query, (err, templates) => {
    return new Promise(resolve => resolve(templates));
  });
}

function deleteTemplate(_id) {
  return Template.findByIdAndDelete(_id, {}, (err, template) => {
    return new Promise(resolve => resolve(template));
  });
}

function fetchTemplateDetail(_id) {
  console.log(_id)
  return Template.findById(_id, {}, {}, (err, template) => {
    return new Promise(resolve => resolve(template));
  });
}

module.exports = {
  createTemplate,
  updateTemplate,
  fetchTemplateList,
  deleteTemplate,
  fetchTemplateDetail,
};
