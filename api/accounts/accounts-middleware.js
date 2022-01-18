const dbConfig = require("../../data/db-config");
const A = require("./accounts-model");

async function checkAccountPayload(req, res, next) {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (!name || !budget) {
    res.status(400).json({
      message: "name and budget are required",
    });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({
      message: "name of account must be between 3 and 100",
    });
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({
      message: "budget of account is too large or too small",
    });
  } else if (isNaN(budget) === true) {
    res.status(400).json({
      message: "budget of account must be a number",
    });
  } else {
    next();
  }
}

async function checkAccountNameUnique(req, res, next) {
  // DO YOUR MAGIC
  try {
    const existing = await dbConfig("accounts")
      .where("name", req.body.name.trim())
      .first();
    if (existing) {
      res.status(400).json({
        message: "that name is taken",
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkAccountId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const account = await A.getById(req.params.id);
    if (!account) {
      res.status(404).json({
        message: "account not found",
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
};
