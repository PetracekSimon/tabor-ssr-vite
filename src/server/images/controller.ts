import dotenv from 'dotenv';
import express from 'express';
import Errors from './errors.js';
import multer from 'multer';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import ImageTypes from './types.js';
import ImageMongo from './mongo.js';
import FolderMongo from '../folder/mongo.js';

import { slugify } from '../helpers/utils.js';
import verify from '../utiles/auth.js';
import requsetHelper from '../utiles/request-helper.js';

dotenv.config();

const router = express.Router();
const _mongo = new ImageMongo();
const _mongoFolder = new FolderMongo();

const storage = multer.memoryStorage(); // Změna na memoryStorage

const fileFilter = (_req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30, // 30 MB najednou 
    },
    fileFilter: fileFilter,
});

// Funkce pro kompresi a uložení obrázku
const compressAndSaveImage = async (file: any): Promise<string> => {
    const filename = Date.now() + '-' + slugify(file.originalname);
    
    const outputPath = process.env.NODE_ENV === "production" 
    ? `/srv/uploads/${filename}` 
    : `./public/uploads/${filename}`;

    await sharp(file.buffer)
        .resize(1920) // Změňte rozměry podle potřeby
        .jpeg({ quality: 80 }) // Nastavte kvalitu podle potřeby
        .toFile(outputPath);

    return outputPath;
};

router.post('/', verify, requsetHelper, upload.any(), async (req, res) => {
    //HDS 1
    let validate = ImageTypes.create.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Errors.Create.InvalidBody(res, validate.error.details);
    }
    //HDS 2 (image)
    let dataOut = [];
    //HDS 2.1 (upload image)

    if (Array.isArray(req.files)) {
        for (const file of req.files) {
            try {
                
                const compressedImagePath = await compressAndSaveImage(file);
                const imageMetadata = await sharp(compressedImagePath).metadata();

                const reqData = {
                    path: compressedImagePath,
                    size: (await fs.promises.stat(compressedImagePath)).size,
                    destination: process.env.NODE_ENV === "production" ? "/srv/uploads" : './public/uploads/',
                    filename: path.basename(compressedImagePath),
                    folderCode: req.body.folderCode,
                    width: imageMetadata.width,
                    height: imageMetadata.height
                };
                const createdItem = await _mongo.create(reqData);
                dataOut.push(createdItem);
            } catch (error) {
                //A3
                return Errors.Create.DatabaseFailed(res, error);
            }
        }
    }

    //HDS 3 (return response)
    return res.send(dataOut);
});
router.delete('/', verify, requsetHelper, async (req, res) => {
    //HDS 1 (body validation)
    let validate = ImageTypes.delete.validate(req.data);

    if (validate.error?.details) {
        //A1
        return Errors.Delete.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (get image)
    let image;
    try {
        image = await _mongo.get(req.data.id);
        if (!image) {
            //A2
            return Errors.Delete.ImageDoesNotExists(res);
        }
    } catch (error) {
        //A3
        return Errors.Delete.DatabaseFailed(res, error);
    }

    //HDS 3 (delete image object)
    try {
        await _mongo.delete(req.data.id);
    } catch (error) {
        //A4
        return Errors.Delete.DatabaseFailed(res, error);
    }

    //HDS 4 (delete image from disk)
    let imagePath = `${image.destination}/${image.filename}`;
    if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
            if (err) {
                //A5
                return Errors.Delete.DeleteImageFailedByFs(res, err);
            }
        });
    } else {
        //A6
        return Errors.Delete.ImagePathDoesNotExists(res);
    }

    //HDS 5 (return response)
    return res.send({});
});
router.get('/list', verify, requsetHelper, async (req, res) => {
    //HDS 1 (body validation)
    let validate = ImageTypes.list.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Errors.List.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (find all discounts)
    let dataOut;
    try {
        dataOut = await _mongo.list(req.data.filter, req.data.pageInfo);
    } catch (error) {
        //A2
        return Errors.List.DatabaseFailed(res, error);
    }

    //HDS 3 (return response)
    res.send(dataOut);
});

const _handleImagePath = (image: any) =>{
    if (process.env.NODE_ENV === "production") {
        return image.destination + '/' + image.filename;
    } 
    return process.cwd() + image.destination.replace('./', '/') + '/' + image.filename;
}
router.get('/:id', verify, async (req, res) => {
    let validate = ImageTypes.get.validate(req.params);
    if (validate.error?.details) {
        //A1
        return Errors.Get.InvalidBody(res, validate.error.details);
    }
    let image = await _mongo.get(req.params.id);

    if (!image) {
        return Errors.Get.ImageDoesNotExists(res, req.params.id);
    }

    res.sendFile(_handleImagePath(image));
});

router.get('/', async (req, res) => {
    //HDS 1 (body validation)
    let reqData = Object.keys(req.body).length === 0 ? req.query : req.body;
    let validate = ImageTypes.get.validate(reqData);

    if (validate.error?.details) {
        //A1
        return Errors.Get.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (find image)
    let dataOut = await _mongo.get(reqData.id);
    if (!dataOut) {
        return Errors.Get.ImageDoesNotExists(res, reqData.id);
    }

    //HDS 3
    res.send(dataOut);
});

router.patch('/changeFolder', verify, requsetHelper, async (req, res) => {
    let validate = ImageTypes.changeFolder.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Errors.ChangeFolder.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (find image)
    let image = await _mongo.get(req.data.id);
    if (!image) {
        //A2
        return Errors.ChangeFolder.ImageDoesNotExists(res, req.data.id);
    }

    //HDS 3 (find folder)
    let folder = await _mongoFolder.getByCode(req.data.folderCode);
    if (!folder) {
        //A3
        return Errors.ChangeFolder.FolderDoesNotExists(res, req.data.folderCode);
    }

    //HDS 4 (change image property)
    image.folderCode = folder.code;

    //HDS 5 (update image)
    let dataOut;
    try {
        dataOut = await _mongo.update(req.data.id, image);
    } catch (error) {
        //A4
        return Errors.ChangeFolder.DatabaseFailed(res, error);
    }

    //HDS 6
    return res.send(dataOut);
});

router.patch('/updateDescription', verify, requsetHelper, async (req, res) => {
    let validate = ImageTypes.updateDescription.validate(req.data);
    if (validate.error?.details) {
        return Errors.UpdateDescription.InvalidBody(res, validate.error.details);
    }

    let image = await _mongo.get(req.data.id);
    if (!image) {
        return Errors.UpdateDescription.ImageDoesNotExists(res, req.data.id);
    }

    image.description = req.data.description;

    let dataOut;
    try {
        dataOut = await _mongo.update(req.data.id, image);
    } catch (error) {
        return Errors.UpdateDescription.DatabaseFailed(res, error);
    }

    return res.send(dataOut);
});

export default router;
