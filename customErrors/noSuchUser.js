class noSuchUser extends Error {
  constructor(message) {
    super(message);
    this.name = "noSuchUser";
  }
}
module.exports = { noSuchUser };
