const httpuv = require('httpuv');

const { REPORTS_BASE_URL } = require('../config');


module.exports = {
  getServiceStatus,
};

const delay = (time) => new Promise(res => setTimeout(res, time));

async function requestServiceStatus({ token }) {
  const response = await httpuv.post(`${REPORTS_BASE_URL}/reports/status/service`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const { job_id: jobId } = response.data;

  return jobId;
}

async function getServiceStatus({ token }) {
  const jobId = await requestServiceStatus({ token });
  await delay(2000); // 2 sec delay (service is not ready to report yet)
  const response = await httpuv.get(`${REPORTS_BASE_URL}/reports/status/service/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });

  return response.data;
}
