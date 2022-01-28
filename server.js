const express = require("express");
const app = new express();
const router = express.Router();
const port = 3000;
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
