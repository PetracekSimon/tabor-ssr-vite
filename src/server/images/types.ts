import Joi from "joi";

const ImageTypes = {
    create: Joi.object({}),
    delete: Joi.object({
        id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).message('Please insert valid MongoId.').required(),
    }),
    list: Joi.object({
        filter: Joi.object(),
        pageInfo: Joi.object({
            pageIndex: Joi.number().min(0),
            itemsAmount: Joi.number().min(0),
        }),
    }),
    get: Joi.object({
        id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).message('Please insert valid MongoId.').required(),
    }),
    changeFolder: Joi.object({
        id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).message('Please insert valid MongoId.').required(),
        folderCode: Joi.string().required(),
    }),
};

export default ImageTypes;
