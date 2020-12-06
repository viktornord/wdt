const express = require('express');

const { PORT } = require('./config');
const { logger } = require('./logger');

const app = express();

app.listen(PORT, () => logger.info(`Server is listening on port ${PORT}`));
