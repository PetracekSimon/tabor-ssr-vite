import mongoose from "mongoose";
import config from "../../config.js"

const applicationSchema = new mongoose.Schema({

  //TODO: přidat příznaky zda máme fyzicky (mail etc...) přilohy k přihlášce (jako kartička pojištěnce atd..)

  // Application info

  summerCampYear: { type: Number, required: true, default: config.campYearInfo.year },
  applicationNumber: { type: String, required: true },
  state: { type: String, required: true, default: "pending" },

  // Child info
  childFirstName: { type: String, required: true },
  childLastName: { type: String, required: true },
  childBirthDate: { type: String, required: true },
  childAddress: { type: String, required: true },

  // Health / insurance
  insuranceNumber: { type: String, required: true },
  tetanusDate: { type: String, required: true },

  // School / family
  schoolInfo: { type: String },
  siblingsCount: { type: Number },
  firstTime: { type: Boolean, default: false },
  hobbies: { type: String },

  // Parents
  motherName: { type: String },
  motherPhone: { type: String },
  fatherName: { type: String },
  fatherPhone: { type: String },

  // Contact
  parentEmail: { type: String, required: true },

  // Additional info
  swimming: { type: String, enum: ["plavec", "neplavec"], required: true },
  healthProblems: { type: String },
  foodAllergy: { type: String },
  childDescription: { type: String },

  // Logistics
  boardingPlace: { type: String, enum: ["radotin", "radlice", "vlastni"], required: true },
  leavingPlace: { type: String, enum: ["radotin", "radlice", "vlastni"], required: true },

}, { timestamps: true });

applicationSchema.index({ summerCampYear: 1, applicationNumber: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema); 