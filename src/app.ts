console.log("hello world");
require("dotenv").config();
import express from "express";
import config from "config";
import connectToDb from "./util/connectToDb";
import log from "./util/logger";
import router from "./routes/index";

const app = express();
app.use(router);

const port = config.get("port");

app.listen(port, () => {
  log.info(`app listening at port ${port}`);

  connectToDb();
});
