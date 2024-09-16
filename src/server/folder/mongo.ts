import { mongoHelper } from "../helpers/mongo-helper";
import FolderModel from "./model";

class FolderMongo {
  async list(filter = {}, pageInfo: any) {
    pageInfo = mongoHelper(pageInfo);

    let page = {
      skip: pageInfo.pageIndex * pageInfo.itemsAmount,
      limit: pageInfo.itemsAmount,
    };
    let total = await FolderModel.countDocuments(filter);
    return {
      itemList: await FolderModel.find(filter, "", page),
      pageInfo: { ...pageInfo, total },
    };
  }
  async get(id: string) {
    return await FolderModel.findById(id);
  }
  async getByCode(code: string) {
    return await FolderModel.findOne({ code });
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
