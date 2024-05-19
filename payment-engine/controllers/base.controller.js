const catchAsync = require("../common/utils/catchAsync");

class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAll = catchAsync(async (req, res) => {
    const records = await this.service.findAll();
    res.json(records);
  });

  getById = catchAsync(async (req, res) => {
    const record = await this.service.findById(req.params.id);
    if (!record) return res.status(404).send("No record found");
    res.json(record);
  });

  create = catchAsync(async (req, res) => {
    const record = await this.service.create(req.body);
    res.status(201).json(record);
  });

  updateById = catchAsync(async (req, res) => {
    const record = await this.service.updateById(req.params.id, req.body);
    if (!record) return res.status(404).send("No record found");
    res.json(record);
  });

  delete = catchAsync(async (req, res) => {
    const record = await this.service.delete(req.params.id);
    if (!record) return res.status(404).send("No record found");
    res.status(204).send();
  });
}

module.exports = BaseController;
