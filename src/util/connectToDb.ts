import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function main() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    log.info("connected to Db");
  } catch (error) {
    log.info("ERROR CONNECTING: ", error);
    process.exit(1);
  }
}

export default main;
