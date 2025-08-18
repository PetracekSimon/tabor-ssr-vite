import { mongoHelper } from '../helpers/mongo-helper.js';
import ImageModel from './model.js';

class ImageMongo {
    async list(filter = {}, pageInfo: any) {
        pageInfo = mongoHelper(pageInfo);
        let page = {
            skip: pageInfo.pageIndex * pageInfo.itemsAmount,
            limit: pageInfo.itemsAmount,
        };
        let total = await ImageModel.countDocuments(filter);
        return {
            itemList: await ImageModel.find(filter, '', page),
            pageInfo: { ...pageInfo, total },
        };
    }
    async get(id: any) {
        return await ImageModel.findById(id);
    }
    async create(body: any) {
        const image = new ImageModel(body);
        return await image.save();
    }
    async delete(id: any) {
        return await ImageModel.findByIdAndDelete(id);
    }
    async update(id: any, newObject: any) {
        return await ImageModel.findByIdAndUpdate(id, newObject, { new: true });
    }
    async getImagesWithFolderInfo(subFolders: string[]) {
        return await ImageModel.aggregate([
            {
              $match: {
                folderCode: { $in: subFolders }
              }
            },
            {
              $lookup: {
                from: "folders",              // Název kolekce složek
                localField: "folderCode",     // Pole v kolekci obrázků
                foreignField: "code",         // Pole v kolekci složek
                as: "folderInfo"              // Název výsledného pole
              }
            },
            {
              $unwind: "$folderInfo"          // Rozbalení pole, aby byla data zjednodušená
            },
            {
              $project: {
                path: 1,
                size: 1,
                width: 1,
                height: 1,
                destination: 1,
                filename: 1,
                description: 1,
                thumbnailPath: 1,
                "folderInfo.name": 1,        // Vrácení pouze názvu složky
                "folderInfo.code": 1
              }
            }
          ])
    }
}

export default ImageMongo;
