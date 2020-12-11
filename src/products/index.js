const { Router } = require("express");
const { body, validationResult, check } = require("express-validator");
const express = require("express");

const router = express.Router();

const path = require("path");

const fs = require("fs");

const uniqid = require("uniqid");

const fileReader = (file) => {
  const myPath = path.join(__dirname, file);
  const myFileAsBuffer = fs.readFileSync(myPath);
  const fileAsString = myFileAsBuffer.toString();
  return JSON.parse(fileAsString);
};

router.get("/", (req, res, next) => {
  try {
    const productsArray = fileReader("products.json");
    res.send(productsArray);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const productsArray = fileReader("products.json");
    const idFromReq = req.params.id;
    const products = productsArray.filter(
      (products) => products.ID === idFromReq
    );

    res.send(products);
    console.log(products);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const productsArray = fileReader("products.json");
    const newproduct = { ...req.body, ID: uniqid(), postedAt: new Date() };
    productsArray.push(newproduct);
    console.log(productsArray);
    fs.writeFileSync(
      path.join(__dirname, "products.json"),
      JSON.stringify(productsArray)
    );
    res.status(201).send();
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", (req, res, next) => {
  const productsArray = fileReader("products.json");

  const newproductArray = productsArray.filter(
    (products) => products.ID !== req.params.id
  );

  const modifiedproducts = req.body;

  modifiedproducts.ID = req.params.id;
  newproductArray.push(modifiedproducts);

  fs.writeFileSync(
    path.join(__dirname, "products.json"),
    JSON.stringify(newproductArray)
  );

  console.log("PUT ID");
  res.status(200).send();
});
router.delete("/:id", (req, res, next) => {
  const productsArray = fileReader("products.json");
  const newproductArray = productsArray.filter(
    (products) => products.ID !== req.params.id
  );

  fs.writeFileSync(
    path.join(__dirname, "products.json"),
    JSON.stringify(newproductArray)
  );
  console.log("DELETE ID");
  res.status(200).send();
});

module.exports = router;
