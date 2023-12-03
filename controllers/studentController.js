/**
 * Title: Student Information Controller
 * Description: This file controlles the CRUD operations of studentRoute (Route: {Baseurl}/api/student/)
 * Date: 2023-11-29
 * Author: Masud Parvez
 */

const mongoose = require("mongoose");
const studentModel = require("../models/studentModel");

//module scaffolding
const controller = {};

//C-Create a document
controller.insertData = (req, res) => {
  let reqBody = req.body;

  studentModel
    .create(reqBody)
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.json(err).status(400);
    });
};

//R-Read a document
controller.viewData = (req, res) => {
  //* below commented code is without aggreagation, if want it back then I have to replace .aggreagate with find() method.
  // const Query = {};
  // const Projection = { Name: 1, Age: 1, City: 1, _id: 0 };

  const projection = { Name: 1, Age: 1, City: 1, _id: 0 };
  const aggregationPipeline = [
    { $sort: { Age: 1 } }, //stage 1: making document sort in ascending order by Age field
    { $project: projection }, //Stage 2: projection for what field should be returned
    { $limit: 1 }, //Stage 3: limiting that, how many document should be returned
  ];

  studentModel
    .aggregate(aggregationPipeline)
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.json(err).status(500);
    });
};

//U-Update a document
controller.updateData = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };
  let reqBody = req.body;

  studentModel
    .findOneAndUpdate(Query, reqBody, { new: true }) //new:true return the modified document
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => res.json(err).status(404));
};

//D-Delete a document
controller.deleteData = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };

  studentModel
    .deleteOne(Query)
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => res.json(err).status(404));
};

controller.dhaka = async (req, res) => {
  const newModel = new studentModel();
  const data = await newModel.findDhaka();
  res.status(200).json(data);
};

module.exports = controller;
