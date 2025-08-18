import { mongoHelper } from "../helpers/mongo-helper.js";
import FolderModel from "./model.js";

type Role = "SuperAdmin" | "Admin" | "User" | "Public";
class FolderMongo {
  async list(filter: Record<string, any> = {}, pageInfo: any, role: Role | undefined) {
    pageInfo = mongoHelper(pageInfo);

    const showAll = role === "SuperAdmin" || role === "Admin";
    if (!showAll) {
      filter.isVisible = true; // only show visible folders for non-admin users
    }

    const page = {
      skip: pageInfo.pageIndex * pageInfo.itemsAmount,
      limit: pageInfo.itemsAmount,
    };

    
    const total = await FolderModel.countDocuments(filter);
    const itemList = await FolderModel.find(filter, "", page)
      .sort({ order: -1 }); // řazení podle "order" sestupně

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
