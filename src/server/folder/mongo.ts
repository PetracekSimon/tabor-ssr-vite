import { mongoHelper } from "../helpers/mongo-helper.js";
import FolderModel from "./model.js";

class FolderMongo {
  async list(filter = {}, pageInfo: any) {
    pageInfo = mongoHelper(pageInfo);

    const page = {
      skip: pageInfo.pageIndex * pageInfo.itemsAmount,
      limit: pageInfo.itemsAmount,
    };

    const total = await FolderModel.countDocuments(filter);

    const itemList = await FolderModel.find(filter, "", page)
      .sort({ order: 1 }); // řazení podle "order" vzestupně

    return {
      itemList,
      pageInfo: { ...pageInfo, total },
    };
  }

  async get(id: string) {
    return await FolderModel.findById(id);
  }
  async getByCode(code: string) {
    return await FolderModel.findOne({ code });
  }
  async updateByCode(code: string, newObject: object) {
    return await FolderModel.findOneAndUpdate({ code }, newObject, { new: true });
  }
  async create(body: object) {
    const folder = new FolderModel(body);
    return await folder.save();
  }
  async deleteByCode(code: string) {
    return await FolderModel.findOneAndDelete({ code });
  }
}

export default FolderMongo;
