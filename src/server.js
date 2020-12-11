const express = require("express");
const productsRoute = require("./products/index");
const {
  notFoundErrorHandler,
  unauthorizedErrorHandler,
  forbiddenErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
} = require("./errorHandling");
const server = express();
const port = 3001;
server.use(express.json());

server.use("/products", productsRoute);

server.use(notFoundErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(forbiddenErrorHandler);
server.use(badRequestErrorHandler);
server.use(catchAllErrorHandler);
server.listen(port, () => {
  console.log("teamwork TODAY");
});
