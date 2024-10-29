import mongoose from "mongoose";
import Config from "../config.js";

export default class Database {
  constructor() {
    this.connect();
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    try {
      const conn = await mongoose.connect(Config.db.uri);
      if (conn) console.log("DATABASE CONNECTED!🚀");
      return;
    } catch (err) {
      throw err;
    }
  }
}
