const userAccounts = [
  {
    Username: "admin",
    PasswordHash:
      "$2b$10$ihCJ631y9z8DsdRGNgw8SemHCLuBejToswY91VHLFdR/yWhmh9IOe",
    PasswordSalt: "$2b$10$ihCJ631y9z8DsdRGNgw8Se",
    HashAlgorithm: {
      connect: { HashAlgorithmID: 1 },
    },
    Role: {
      connect: { RoleID: 1 },
    },
  },
  {
    Username: "nanthan987",
    PasswordHash:
      "$2b$10$WTPCt0xmc57ok/wpd9fLDOI77n4HL3b0xSuJvsnmV5zAgnfPkFXQ.",
    PasswordSalt: "$2b$10$WTPCt0xmc57ok/wpd9fLDO",
    HashAlgorithm: {
      connect: { HashAlgorithmID: 1 },
    },
    Role: {
      connect: { RoleID: 1 },
    },
    Granter: {
      connect: { UserAccountID: 1 },
    },
    GrantDateTime: new Date(),
  },
];

const hashAlgorithms = [
  {
    Name: "brcypt",
    Description: "The hashing algorithm used by the bcrypt library",
  },
];

const roles = [
  {
    Name: "admin",
    Description: "Administrative user",
  },
  {
    Name: "regular",
    Description: "Casual user",
  },
];

const privileges = [
  {
    Name: "api_all_access",
    Description: "Access all API routes, including protected routes",
  },
];

const grantedPrivileges = [
  {
    Role: {
      connect: {
        RoleID: 1,
      },
    },
    Privilege: {
      connect: { PrivilegeID: 1 },
    },
    Granter: {
      connect: { UserAccountID: 1 },
    },
    GrantDateTime: new Date(),
  },
];

module.exports = {
  userAccounts,
  hashAlgorithms,
  grantedPrivileges,
  roles,
  privileges,
};
