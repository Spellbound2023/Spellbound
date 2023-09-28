import bcrypt from "bcrypt";

export async function createUser(data) {
  let response = { success: true };
  let passwordHash = "";
  let passwordSalt = "";

  // attempt to create user
  await bcrypt
    .genSalt(parseInt(process.env.SALT_ROUNDS))
    .then((salt) => {
      console.log("Salt: ", salt);
      passwordSalt = salt;
      return bcrypt.hash(data.password, salt);
    })
    .then((hash) => {
      console.log("Hash: ", hash);
      passwordHash = hash;
    });

  console.log({ passwordHash, passwordSalt });

  // const hashAlgId = prisma.hashAlgorithm.findUnique({
  //   where: {
  //     Name: ""
  //   }
  // });

  // const user = prisma.useraccount.create({
  //   data: {
  //     Username: data.username,
  //     PasswordHash: passwordHash,
  //     Pass,
  //   },
  // });

  // error?

  return response;
}

// References:
// https://blog.logrocket.com/password-hashing-node-js-bcrypt
