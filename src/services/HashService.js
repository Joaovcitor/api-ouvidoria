import bcrypt from "bcryptjs";

class HashService {
  async hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}

export default new HashService();
