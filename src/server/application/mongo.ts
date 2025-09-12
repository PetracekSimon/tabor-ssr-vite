import { mongoHelper } from "../helpers/mongo-helper.js";
import ApplicationModel from "./model.js";
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., `application:2026`
  seq: { type: Number, default: 0 },
});
const CounterModel = mongoose.models.ApplicationCounter || mongoose.model("ApplicationCounter", counterSchema);

class ApplicationMongo {
  async list(filter: Record<string, any> = {}, pageInfo: any) {
    pageInfo = mongoHelper(pageInfo);

    const page = {
      skip: pageInfo.pageIndex * pageInfo.itemsAmount,
      limit: pageInfo.itemsAmount,
    };


    // --- special handling pro childName ---
    if (filter.childName) {
      const name = filter.childName.trim();
      const parts = name.split(/\s+/);

      if (parts.length === 1) {
        // jedno slovo → hledáme v obou polích
        filter.$or = [
          { childFirstName: { $regex: parts[0], $options: "i" } },
          { childLastName: { $regex: parts[0], $options: "i" } },
        ];
      } else {
        // více slov → první část jako firstName, zbytek jako lastName
        filter.$and = [
          { childFirstName: { $regex: parts[0], $options: "i" } },
          { childLastName: { $regex: parts.slice(1).join(" "), $options: "i" } },
        ];
      }

      delete filter.childName;
    }

    // --- paging & query ---
    const total = await ApplicationModel.countDocuments(filter);
    const itemList = await ApplicationModel.find(filter, "", page).sort({ createdAt: -1 });

    return {
      itemList,
      pageInfo: { ...pageInfo, total },
    };
  }


  async get(id: string) {
    return await ApplicationModel.findById(id);
  }

  async getNextApplicationNumber(summerCampYear: number) {
    const key = `application:${summerCampYear}`;
    const result = await CounterModel.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return result.seq;
  }

  async create(body: any) {
    const app = new ApplicationModel(body);
    return await app.save();
  }

  async updateState(id: string, state: string) {
    console.log(id, state);

    return await ApplicationModel.findByIdAndUpdate(id, { state }, { new: true });
  }
}

export default ApplicationMongo; 