class BaseRepository {
  async findById(id) {
    throw new Error("findById method must be implemented");
  }

  async update(entity) {
    throw new Error("update method must be implemented");
  }
}

module.exports = BaseRepository;
