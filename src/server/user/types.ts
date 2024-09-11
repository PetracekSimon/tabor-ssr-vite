import Joi from "joi";

const mongoId = Joi.string()
  .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
  .message("Please insert valid MongoId.");

const userTypes = {
  register: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("SuperAdmin", "Admin", "User"),
  }),
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  list: Joi.object({
    filter: Joi.object(),
    pageInfo: Joi.object({
      pageIndex: Joi.number().min(0),
      itemsAmount: Joi.number().min(0),
    }),
  }),
  updatePassword: Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
    newPasswordConfirm: Joi.string().min(8).required(),
  }),
  update: Joi.object({
    id: mongoId.required(),
    email: Joi.string(),
    role: Joi.string().valid("SuperAdmin", "Admin", "User"),
    password: Joi.string().min(8),
  }),
  delete: Joi.object({
    id: mongoId.required(),
  }),
};

export default userTypes;
