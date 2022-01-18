const db = require("../../data/db-config");

const getAll = async () => {
  // DO YOUR MAGIC
  return db("accounts");
};

const getById = async (id) => {
  // DO YOUR MAGIC
  const newAccount = await db("accounts").where("id", id).select('name', 'budget').first()
  return newAccount;
};

const create = async (account) => {
  // DO YOUR MAGIC
  const [accountId] = await db("accounts").insert(account);
  return getById(accountId);
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").where("id", id).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const deleted = await db("accounts").where("id", id).del();
  return deleted;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
