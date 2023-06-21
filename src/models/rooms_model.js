const dbPool = require("../configs/database");

const tableName = "rooms";
const uniqueColumn = "name";
const primaryKey = "id";

const getAll = () => {
  const sqlQuery = `SELECT * FROM ${tableName}`;
  return dbPool.execute(sqlQuery);
};

const getDetail = (id) => {
  const sqlQuery = `SELECT * FROM ${tableName} WHERE id = ? `;
  return dbPool.execute(sqlQuery, [id]);
};

const checkDuplicate = async (name, id = null) => {
  let [existingData] = [];

  if (id === null) {
    [existingData] = await dbPool.execute(
      `SELECT * FROM ${tableName} WHERE ${uniqueColumn} = ?`,
      [name]
    );
  } else {
    [existingData] = await dbPool.execute(
      `SELECT * FROM ${tableName} WHERE ${uniqueColumn} = ? AND ${primaryKey} <> ?`,
      [name, id]
    );
  }
  return existingData.length ? existingData.length : 0;
};

const createData = async (body) => {
  const { id_merchant, name, description } = body;

  const existingData = await checkDuplicate(name);

  if (existingData) {
    throw new Error("Name already taken");
  }

  try {
    const sqlQuery = `INSERT INTO ${tableName} (id_merchant,name,description) VALUE(?,?,?)`;
    return dbPool.execute(sqlQuery, [id_merchant, name, description]);
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

const updateUser = async (id, body) => {
  const { name, description } = body;

  const existingData = await checkDuplicate(name, id);

  if (existingData) {
    throw new Error("Name already taken");
  }

  try {
    const sqlQuery = `UPDATE ${tableName} set name=?,description=? WHERE ${primaryKey}=?`;
    return dbPool.execute(sqlQuery, [name, description, id]);
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

const deleteUser = (id) => {
  const sqlQuery = `DELETE FROM ${tableName} WHERE ${primaryKey} = ?`;
  return dbPool.execute(sqlQuery, [id]);
};

module.exports = {
  getAll,
  getDetail,
  createData,
  updateUser,
  deleteUser,
};
