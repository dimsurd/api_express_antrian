const dbPool = require("../configs/database");
const bcrypt = require("bcrypt");

const tableName = "users";
const uniqueColumn = "username";
const primaryKey = "id";

const getAllUsers = () => {
  const sqlQuery = `SELECT * FROM ${tableName}`;
  return dbPool.execute(sqlQuery);
};

const getDetail = (id) => {
  const sqlQuery = `SELECT * FROM ${tableName} WHERE id = ? `;
  return dbPool.execute(sqlQuery, [id]);
};

const checkDuplicate = async (username, id = null) => {
  let [existingData] = [];

  if (id === null) {
    [existingData] = await dbPool.execute(
      `SELECT * FROM ${tableName} WHERE ${uniqueColumn} = ?`,
      [username]
    );
  } else {
    [existingData] = await dbPool.execute(
      `SELECT * FROM ${tableName} WHERE ${uniqueColumn} = ? AND ${primaryKey} <> ?`,
      [username, id]
    );
  }
  return existingData.length ? existingData.length : 0;
};

const createUser = async (body) => {
  const { name, username, password, role } = body;

  const existingData = await checkDuplicate(username);

  if (existingData) {
    throw new Error("Username already taken");
  }

  try {
    bcrypt.hash(password, 10, function (err, hash) {
      const sqlQuery = `INSERT INTO ${tableName} (name,username,password,role) VALUE(?,?,?,?)`;
      return dbPool.execute(sqlQuery, [name, username, hash, role]);
    });
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

const updateUser = async (id, body) => {
  const { name, username, password } = body;

  const existingData = await checkDuplicate(username, id);

  if (existingData) {
    throw new Error("Username already taken");
  }

  try {
    const sqlQuery = `UPDATE ${tableName} set name=?,username=? WHERE ${primaryKey}=?`;
    return dbPool.execute(sqlQuery, [name, username, id]);
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

const deleteUser = (id) => {
  const sqlQuery = `DELETE FROM ${tableName} WHERE ${primaryKey} = ?`;
  return dbPool.execute(sqlQuery, [id]);
};

module.exports = {
  getAllUsers,
  getDetail,
  createUser,
  updateUser,
  deleteUser,
};
