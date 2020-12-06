require('dotenv').config();

const {
  GRANT_TYPE,
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
} = process.env;

module.exports = {
  GRANT_TYPE,
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
};
