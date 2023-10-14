var express = require("express");
var router = express.Router();

const { randword } = require("../api/randword");
const { word } = require("../api/word");
const { register, login } = require("../api/user");

router.get("/randword", randword);
router.get("/word/:word", word);
router.post("/user/register", register);
router.post("/user/login", login);

module.exports = router;
