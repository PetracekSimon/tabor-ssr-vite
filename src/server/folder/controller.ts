import express from 'express';
import Errors from './errors.js';

import FolderTypes from './types.js';
import FolderMongo from './mongo.js';

import ImageMongo from '../images/mongo.js';

import { slugify } from '../helpers/utils.js';
import verify from '../utiles/auth.js';
import requsetHelper from '../utiles/request-helper.js';

const _mongo = new FolderMongo();
const _imageMongo = new ImageMongo();

const router = express.Router();

interface LooseObject { [k: string]: any }


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
        return Errors.Delete.FolderIsntEmpty(res)
    }

    let subFolders = await _mongo.list({ parentFolderCode: req.data.code }, req.data.pageInfo);
    if (subFolders.itemList.length) {
        //A3 (folder contains subfolders)
        return Errors.Delete.FolderIsntEmpty(res)
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

router.get('/getImagesForGalleryPage', requsetHelper, async (req, res) => {
    //HDS 1 (body validation)
    let validate = FolderTypes.getImagesForGalleryPage.validate(req.data);

    if (validate.error?.details) {
        //A1
        return Errors.GetImagesForGalleryPage.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (find subfolders + transforms)
    const dtoOut: any = [];
    const subFolders = await _mongo.list({ parentFolderCode: req.data.filter.code }, req.data.pageInfo);

    const subFoldersCodes = subFolders.itemList.map(folder => folder.code)
    const subFoldersData: LooseObject = {};
    subFolders.itemList.forEach(folder => {
        subFoldersData[folder.code] = folder.name;
    })

    //HDS 3 (find images IN subFolderCodes[])
    const imagesWithFolderInfo = await _imageMongo.getImagesWithFolderInfo(subFoldersCodes);


    //HDS 4 (mapping structure)
    subFoldersCodes.forEach(folderCode => {
        const folderedImages = imagesWithFolderInfo.filter(image => {
            return image.folderInfo.code === folderCode
        });

        dtoOut.push({
            folderName: subFoldersData[folderCode],
            folderCode: folderCode,
            images: folderedImages
        })
    });


    return res.send(dtoOut);
})

export default router;
