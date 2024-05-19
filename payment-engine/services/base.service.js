class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = () => this.repository.findAll();

  getById = (id) => this.repository.findById(id);

  create = (entity) => this.repository.create(entity);

  updateById = (id, entity) => this.repository.updateById(id, entity);

  delete = (id) => this.repository.delete(id);
}

module.exports = BaseService;
