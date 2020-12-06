const httpuv = require('httpuv');

const { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, AUTH_BASE_URL } = require('../config');

let token = null;

module.exports = {
  getToken,
};

isTokenValid = () => !!token && new Date(token.expiresAt) > new Date();

async function getToken({ obtainNew = !isTokenValid() } = {}) {
  if (!obtainNew) return token;

  const response = await httpuv.post(`${AUTH_BASE_URL}/oauth/token`, {
    headers: { 'Content-Type': 'application/json' },
    body: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: GRANT_TYPE,
    }
  });
  const { access_token: accessToken, expires_in: expiresIn } = response.data;

  token = {
    accessToken,
    expiresAt: new Date(Date.now() + expiresIn * 1000),
  };

  return token;
}

