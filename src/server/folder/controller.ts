import express from 'express';
import Errors from './errors';

import FolderTypes from './types';
import FolderMongo from './mongo';

import ImageMongo from '../images/mongo';

import { slugify } from '../helpers/utils';
import verify from '../utiles/auth';
import requsetHelper from '../utiles/request-helper';

const _mongo = new FolderMongo();
const _imageMongo = new ImageMongo();

const router = express.Router();

router.post('/', verify, requsetHelper, async (req, res) => {
    //HDS 1
    let validate = FolderTypes.create.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Errors.Create.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (kontrola zda existuje parent folder)
    let parentFolder = await _mongo.getByCode(req.data.parentFolderCode);
    if (req.data.parentFolderCode !== 'root') {
        if (!parentFolder) {
            //A2
            return Errors.Create.ParentFolderDoesNotExist(res, req.data.parentFolderCode);
        }
    }

    //HDS 3 (folder)
    //HDS 3.1 (úprava vstupních dat)
    req.data.code = slugify(req.data.name);
    let dataOut;

    //HDS 3.2 (create mongo record)
    try {
        dataOut = await _mongo.create(req.data);
    } catch (error) {
        //A3
        return Errors.Create.DatabaseFailed(res, error);
    }

    //HDS 4 (return response)
    return res.send(dataOut);
});

router.delete('/', verify, requsetHelper, async (req, res) => {
    //HDS 1 (body validation)
    let validate = FolderTypes.delete.validate(req.data);

    if (validate.error?.details) {
        //A1
        return Errors.Delete.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (get folder images) 
    let folderImages = await _imageMongo.list({ folderCode: req.data.code }, req.data.pageInfo);
    if (folderImages.itemList.length) {
        //A2 (folder contains images)
        return Errors.Delete.FolderIsntEmpty(res, folderImages.itemList.length)
    }

    let subFolders = await _mongo.list({ parentFolderCode: req.data.code }, req.data.pageInfo);
    if (subFolders.itemList.length) {
        //A3 (folder contains subfolders)
        return Errors.Delete.FolderIsntEmpty(res, folderImages.itemList.length)
    }


    //HDS 4 (delete folder object)
    try {
        await _mongo.deleteByCode(req.data.code);
    } catch (error) {
        //A3
        return Errors.Delete.DatabaseFailed(res, error);
    }

    //HDS 5 (return response)
    return res.send({});
});

router.get('/list', verify, requsetHelper, async (req, res) => {
    //HDS 1 (body validation)
    let validate = FolderTypes.list.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Errors.List.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (find all discounts)
    let dataOut;
    try {
        dataOut = await _mongo.list(req.data.filter, req.data.pageInfo);
    } catch (error) {
        console.log(error);

        //A2
        return Errors.List.DatabaseFailed(res, error);
    }

    //HDS 3 (return response)
    res.send(dataOut);
});

router.get('/', async (req, res) => {
    //HDS 1 (body validation)
    let reqData = Object.keys(req.body).length === 0 ? req.query : req.body;
    let validate = FolderTypes.get.validate(reqData);

    if (validate.error?.details) {
        //A1
        return Errors.Get.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (find folder)
    let dataOut = await _mongo.getByCode(reqData.code);
    if (!dataOut) {
        return Errors.Get.FolderDoesNotExists(res, reqData.code);
    }

    //HDS 3
    res.send(dataOut);
});

export default router;
