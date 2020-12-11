const express = require("express");
const productsRoute = require("./products/index");

const server = express();
const port = 3001;
server.use(express.json());

server.use("/products", productsRoute);

server.listen(port, () => {
  console.log("teamwork TODAY");
});
