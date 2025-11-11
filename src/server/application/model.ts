import mongoose, { InferSchemaType } from "mongoose";
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
  childGender: { type: String, required: true },

  // Health / insurance
  insuranceNumber: { type: String, required: true },
  tetanusDate: { type: String, required: true },

  // School / family
  schoolInfo: { type: String },
  siblingsCount: { type: Number },
  firstTime: { type: Boolean, default: false },
  hobbies: { type: String },

  // Parents
  parent1Name: { type: String, required: true },
  parent1Phone: { type: String, required: true },
  parent2Name: { type: String },
  parent2Phone: { type: String },

  // Contact
  parentEmail: { type: String, required: true },

  // Additional info
  swimming: { type: String, enum: ["plavec", "neplavec"], required: true },
  healthProblems: { type: String },
  foodAllergy: { type: String },
  childDescription: { type: String },
  tentPreference: { type: String },

  // Logistics
  boardingPlace: { type: String, enum: ["radotin", "radlice", "vlastni"], required: true },
  leavingPlace: { type: String, enum: ["radotin", "radlice", "vlastni"], required: true },

  // Consents
  tripFreeTimeConsent: { type: Boolean, default: false },
  photoConsent: { type: Boolean, default: false },
  medicalTreatmentConsent: { type: Boolean, default: false },

}, { timestamps: true });

applicationSchema.index({ summerCampYear: 1, applicationNumber: 1 }, { unique: true });
//TODO: možná jestli tohle nerozjebává celej build;
export type ApplicationType = InferSchemaType<typeof applicationSchema>;
export default mongoose.model("Application", applicationSchema); 