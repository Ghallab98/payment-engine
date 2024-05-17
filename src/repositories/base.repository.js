class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async updateById(id, data) {
    const entity = await this.findById(id);
    const keys = Object.keys(data);
    keys.forEach((key) => {
      entity[key] = data[key];
    });
    return entity.save();
  }

  async create(entity) {
    return this.model.create(entity);
  }

  async delete(id) {
    return this.model.destroy({ where: { id } });
  }
}

module.exports = BaseRepository;
