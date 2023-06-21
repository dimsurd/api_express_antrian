const dbPool = require("../configs/database");
const bcrypt = require("bcrypt");

const doLogin = async (body) => {
  const { username, password } = body;

  try {
    // Check if username valid
    const [dataUser] = await dbPool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (dataUser.length < 1) {
      throw new Error("Wrong Username / Password");
    }
    // End Check if username valid

    const result = await bcrypt.compare(password, dataUser[0].password);
    if (result) {
      return { message: "Successful login" };
    } else {
      throw new Error("Wrong Username / Password");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const resetPassword = async (id, body) => {
  const { username, password, newPassword } = body;

  try {
    const [dataUser] = await dbPool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (dataUser.length < 1) {
      throw new Error("Wrong Username / Password");
    }

    const result = await bcrypt.compare(password, dataUser[0].password);

    if (result) {
      bcrypt.hash(newPassword, 10, function (err, hash) {
        const sqlQuery = "UPDATE users SET password=? WHERE id=?";
        return dbPool.execute(sqlQuery, [hash, id]);
      });
    } else {
      throw new Error("Wrong Username / Password");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { doLogin, resetPassword };
