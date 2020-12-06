require('dotenv').config();

const {
  GRANT_TYPE,
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
  AUTH_BASE_URL,
  REPORTS_BASE_URL,
} = process.env;

module.exports = {
  GRANT_TYPE,
  CLIENT_ID,
  CLIENT_SECRET,
  PORT,
  AUTH_BASE_URL,
  REPORTS_BASE_URL,
};
