const mongoose = require('mongoose');
const TemplateSchema = require('../schemas/template');

const Template = mongoose.model('template', TemplateSchema);

function createTemplate(content) {
  return new Promise(resolve => {
    const template = new Template(content);
    template.save(err => {
      resolve(err ? undifined : template);
    });
  });
}

function updateTemplate(_id, content) {
  return new Promise(resolve => {
    Template.findByIdAndUpdate(_id, {...content}, {}, err => {
      resolve({ _id, ...content });
    });
  });
}

function fetchTemplateList(query) {
  return Template.find(query, (err, templates) => {
    return new Promise(resolve => resolve(templates));
  });
}

function deleteTemplate(_id) {
  return Template.findByIdAndDelete(_id).then(() => {
    return new Promise(resolve => resolve({ _id }));
  });
}

function fetchTemplateDetail(_id) {
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
