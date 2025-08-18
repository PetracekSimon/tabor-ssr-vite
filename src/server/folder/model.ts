import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({

  /**
   * Název složky
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * Kód složky
   */
  code: {
    type: String,
    required: true,
    unique: true,
  },

  /**
   * Příznak zda je složka viditělná
   */
  isVisible: {
    type: Boolean,
    default: false,
  },

  /**
   * Kód nadřazené složky
   */
  parentFolderCode: {
    type: String,
    required: true
  },

  /**
   * Pořadí
   */
  order: {
    type: Number,
    require: true
  }
}, { timestamps: true });

export default mongoose.model("Folder", folderSchema);
