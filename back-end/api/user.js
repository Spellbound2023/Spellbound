const { checkUser, createUser, generateToken } = require("../utils/authUtils");

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

/* Handle user login attempt */
exports.login = async function (req, res, next) {
  const user = await checkUser(req.body);

  if (user) {
    // const token = generateToken(user.UserAccountID);
    // res.json({ username: user.Username, accessToken: token });
    res.json({ username: user.Username });
  } else {
    res.status(401).send();
  }
};

/* Middleware: verify JWT */
exports.verifyJwtToken = function (req, res, next) {
  let validToken = false;
  let user = null;
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader) {
    const split = authorizationHeader.split(" ");
    if (split.length > 1) {
      const token = split[1];
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
        validToken = true;
      } catch (e) {
        console.error("Invalid JWT token " + token);
        return res.status(403);
      }
    }
  }

  if (validToken) {
    req.user = user;
    next();
  } else {
    return res.status(401);
  }
};

// References:
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
