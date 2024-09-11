import { mongoHelper } from '../helpers/mongo-helper';
import ImageModel from './model';

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
}

export default ImageMongo;
