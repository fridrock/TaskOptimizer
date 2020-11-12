class UserWithSameLogin extends Error {
  constructor(message) {
    super(message);
    this.name = "UserWithSameLogin";
  }
}
module.exports = { UserWithSameLogin };
