const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const { connect } = require("./config/connection");
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

connect().then((db) => {
  //   console.log(db);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
