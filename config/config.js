require("dotenv").config();

module.exports = {
  [process.env.NODE_ENV]: {
    username: process.env.LOCAL_DB_USER_NAME,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_DATABASE,
    host: process.env.LOCAL_DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
