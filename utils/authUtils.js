import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function getPasswordHashSalt(password) {
  let passwordHash = "";
  let passwordSalt = "";

  await bcrypt
    .genSalt(parseInt(process.env.SALT_ROUNDS))
    .then((salt) => {
      passwordSalt = salt;
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      passwordHash = hash;
    });

  return {
    passwordHash,
    passwordSalt,
  };
}

export async function createUser(data) {
  let response = { success: true, message: "" };

  // check if such a user already exists
  const existingUser = await prisma.userAccount.findUnique({
    where: {
      Username: data.username,
    },
  });
  console.log("Existing user: ", existingUser);

  if (existingUser === null) {
    // get the hash algorithm being used
    const hashAlgorithm = await prisma.hashAlgorithm.findUnique({
      where: {
        Name: process.env.HASH_ALGORITHM,
      },
    });
    console.log("Hash algorithm: ", hashAlgorithm);

    // get password hash and salt
    const { passwordHash, passwordSalt } = await getPasswordHashSalt(
      data.password
    );

    // create a new user
    console.log("Creating new user");
    const user = await prisma.userAccount.create({
      data: {
        Username: data.username,
        PasswordHash: passwordHash,
        PasswordSalt: passwordSalt,
        HashAlgorithm: {
          connect: { HashAlgorithmID: hashAlgorithm.HashAlgorithmID },
        },
        Role: {
          connect: { RoleID: 2 },
        },
        Granter: {
          connect: { UserAccountID: 1 },
        },
        GrantDateTime: new Date(),
      },
    });
    console.log("Created user: ", user);
  } else {
    response = {
      success: false,
      message: "The username has already been taken",
    };
  }

  // TODO: error handling

  return response;
}

export async function checkUser({ username, password }) {
  let userLoggedIn = false;

  // check if such a user already exists
  const existingUser = await prisma.userAccount.findUnique({
    where: {
      Username: username,
    },
  });
  if (existingUser) {
    await bcrypt.compare(password, existingUser.PasswordHash).then((res) => {
      userLoggedIn = res;
    });
  }

  if (userLoggedIn) {
    return existingUser;
  } else return null;
}

// References:
// https://blog.logrocket.com/password-hashing-node-js-bcrypt
