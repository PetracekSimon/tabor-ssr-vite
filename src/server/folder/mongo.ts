import { mongoHelper } from "../helpers/mongo-helper";
import FolderModel from "./model";

class FolderMongo {
  async list(filter = {}, pageInfo) {
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
  async get(id) {
    return await FolderModel.findById(id);
  }
  async getByCode(code) {
    return await FolderModel.findOne({ code });
  }
  async create(body) {
    const folder = new FolderModel(body);
    return await folder.save();
  }
  async deleteByCode(code) {
    return await FolderModel.findOneAndDelete({ code });
  }
}

export default FolderMongo;
