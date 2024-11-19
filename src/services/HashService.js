import bcrypt from "bcryptjs";

class HashService {
  static async hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}

export default HashService;