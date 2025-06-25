import Joi from "joi";

const folderTypes = {
  create: Joi.object({
    name: Joi.string().required(),
    parentFolderCode: Joi.string().required(),
    order: Joi.number().required()
  }),
  delete: Joi.object({
    code: Joi.string().required(),
  }),
  list: Joi.object({
    filter: Joi.object(),
    pageInfo: Joi.object({
      pageIndex: Joi.number().min(0),
      itemsAmount: Joi.number().min(0),
    }),
  }),
  get: Joi.object({}),
  getImagesForGalleryPage: Joi.object({
    filter: Joi.object(),
    pageInfo: Joi.object({
      pageIndex: Joi.number().min(0),
      itemsAmount: Joi.number().min(0),
    }),
  }),
  update: Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    parentFolderCode: Joi.string().required(),
  }), 
};

export default folderTypes;
