import Joi from "joi";

const applicationTypes = {
  create: Joi.object({
    captchaResponse: Joi.string().required(),
    childFirstName: Joi.string().required(),
    childLastName: Joi.string().required(),
    childBirthDate: Joi.string().required(),
    childAddress: Joi.string().required(),
    childGender: Joi.string().required(),

    insuranceNumber: Joi.string().required(),
    tetanusDate: Joi.string().required(),

    schoolInfo: Joi.string().allow(""),
    siblingsCount: Joi.number().min(0),
    firstTime: Joi.boolean(),
    hobbies: Joi.string().allow(""),

    parent1Name: Joi.string().allow(""),
    parent1Phone: Joi.string().allow(""),
    parent2Name: Joi.string().allow(""),
    parent2Phone: Joi.string().allow(""),

    parentEmail: Joi.string().email().required(),

    swimming: Joi.string().valid("plavec", "neplavec").required(),
    healthProblems: Joi.string().allow(""),
    foodAllergy: Joi.string().allow(""),
    childDescription: Joi.string().allow(""),
    tentPreference: Joi.string().allow(""),

    boardingPlace: Joi.string().valid("radotin", "radlice", "vlastni").required(),
    leavingPlace: Joi.string().valid("radotin", "radlice", "vlastni").required(),

    tripFreeTimeConsent: Joi.boolean(),
    photoConsent: Joi.boolean(),
    medicalTreatmentConsent: Joi.boolean(),
  }),
  list: Joi.object({
    filter: Joi.object(),
    pageInfo: Joi.object({
      pageIndex: Joi.number().min(0),
      itemsAmount: Joi.number().min(0),
    }),
  }),
  delete: Joi.object({
    id: Joi.string().required(),
  }),
  updateState: Joi.object({
    id: Joi.string().required(),
    state: Joi.string().valid("pending", "approved", "rejected", "paid").required(),
  }),
};

export default applicationTypes; 