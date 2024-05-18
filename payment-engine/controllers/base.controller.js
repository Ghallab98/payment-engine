const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/CustomError");

class BaseController {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = catchAsync(async (req, res) => {
    const records = await this.repository.findAll();
    res.json(records);
  });

  getById = catchAsync(async (req, res) => {
    const record = await this.repository.findById(req.params.id);
    if (!record) return res.status(404).send("No record found");
    res.json(record);
  });

  create = catchAsync(async (req, res) => {
    const record = await this.repository.create(req.body);
    res.status(201).json(record);
  });

  updateById = catchAsync(async (req, res) => {
    const record = await this.repository.updateById(req.params.id, req.body);
    if (!record) return res.status(404).send("No record found");
    res.json(record);
  });

  delete = catchAsync(async (req, res) => {
    const record = await this.repository.delete(req.params.id);
    if (!record) return res.status(404).send("No record found");
    res.status(204).send();
  });
}

module.exports = BaseController;
