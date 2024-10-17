import {mongoHelper} from "../helpers/mongo-helper.js";
import UsersModel from "./model.js";

export default class UserMongo {
  async list(filter = {}, pageInfo: any) {
    pageInfo = mongoHelper(pageInfo);
    let page = {
      skip: pageInfo.pageIndex * pageInfo.itemsAmount,
      limit: pageInfo.ammount,
    };
    let total = await UsersModel.countDocuments(filter);
    return {
      itemList: await UsersModel.find(filter, "_id role email", page),
      pageInfo: { ...pageInfo, total },
    };
  }
  async getPassword(id: any) {
    return await UsersModel.findById(id, "password");
  }
  async getByEmail(email: any) {
    return await UsersModel.findOne({ email });
  }
  async get(id: any) {
    return await UsersModel.findById(id);
  }
  async create(body: any) {
    const discount = new UsersModel(body);
    return await discount.save();
  }
  async update(id: any, newObject: any) {
    return await UsersModel.findByIdAndUpdate(id, newObject, { new: true });
  }
  async delete(id: any) {
    return await UsersModel.findByIdAndDelete(id);
  }
}