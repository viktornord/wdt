const express = require('express');

const { PORT } = require('./config');
const { logger } = require('./logger');
const { getToken } = require('./services/auth');
const { getServiceStatus } = require('./services/report');

const app = express();

const authMiddleWare = async (req, res, next) => {
  req.token = (await getToken()).accessToken;
  next();
};

app
  .use(express.static('ui'))
  .get('/service-status', authMiddleWare, async ({ token }, res) => {
    const serviceStatus = await getServiceStatus({ token });
    res.send(serviceStatus);
  });

app.listen(PORT, async () => {
  logger.info(`Server is listening on port ${PORT}`);
});

process.on('unhandledRejection', (error) => logger.error(error));
process.on('uncaughtException', (error) => logger.error(error));
