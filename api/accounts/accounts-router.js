const express = require("express");
const Account = require("./accounts-model");
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  await Account.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  await Account.getById(req.params.id)
    .then((account) => {
      res.json(account);
    })
    .catch(next);
});

router.post("/", checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  await Account.create(req.body)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(next)
});

router.put("/:id",
 checkAccountId, 
 checkAccountPayload, 
 async (req, res, next) => {
  // DO YOUR MAGIC
  await Account.updateById(req.params.id, req.body)
    .then(UpdatedAccount => {
      res.json(UpdatedAccount)
    })
    .catch(next)
});

router.delete("/:id", checkAccountId,async (req, res, next) => {
  // DO YOUR MAGIC
  await Account.deleteById(req.params.id)
    .then(deletedAccount => {
      res.json(deletedAccount)
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
