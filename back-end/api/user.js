const { createUser } = require("../utils/authUtils");

/* Creates a user if the username has not already been taken.*/
exports.register = async function (req, res, next) {
  const data = req.body;

  const userCreationResponse = await createUser({
    username: data.username,
    password: data.password,
  });

  if (userCreationResponse.success) {
    res.status(201).send();
  } else {
    res.status(409).send({ error: userCreationResponse.message });
  }
};
