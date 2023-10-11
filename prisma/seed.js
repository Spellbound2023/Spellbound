// This is the javascript file that is to be run
// to seed the user authentication database.
// Seeding includes records for roles, privileges, and hashing algorithms
// **This script is to be run once and once only when creating a server.
// Reference: https://planetscale.com/blog/how-to-seed-a-database-with-prisma-and-next-js

const { PrismaClient } = require("@prisma/client");
const {
  userAccounts,
  hashAlgorithms,
  roles,
  privileges,
  grantedPrivileges,
} = require("./data.js");
const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log("Seeding database...");

    // delete any existing data
    await prisma.userAccount.deleteMany();
    console.log("Deleted any existing records in the UserAccounts table");

    await prisma.hashAlgorithm.deleteMany();
    console.log("Deleted any existing records in the HashAlgorithm table");

    await prisma.role.deleteMany();
    console.log("Deleted any existing records in the Role table");

    await prisma.privilege.deleteMany();
    console.log("Deleted any existing records in the Privilege table");

    await prisma.grantedPrivilege.deleteMany();
    console.log("Deleted any existing records in the GrantedPrivilege table");

    // reset autoincrement sequences to 1
    await prisma.$queryRaw`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='UserAccount'`;
    console.log("Reset UserAccount auto increment to 1");

    await prisma.$queryRaw`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='HashAlgorithm'`;
    console.log("Reset HashAlgorithm auto increment to 1");

    await prisma.$queryRaw`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='Role'`;
    console.log("Reset Role auto increment to 1");

    await prisma.$queryRaw`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='Privilege'`;
    console.log("Reset Privilege auto increment to 1");

    // create new seed records
    for (const item of hashAlgorithms) {
      await prisma.hashAlgorithm.create({
        data: item,
      });
    }
    console.log("Created HashAlgorithm data");

    for (const item of roles) {
      await prisma.role.create({
        data: item,
      });
    }
    console.log("Created Role data");

    for (const item of privileges) {
      await prisma.privilege.create({
        data: item,
      });
    }
    console.log("Created Privilege data");

    for (const item of userAccounts) {
      await prisma.userAccount.create({
        data: item,
      });
    }
    console.log("Created UserAccount data");
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
