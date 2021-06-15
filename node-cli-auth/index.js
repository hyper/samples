const { getHWID } = require('hwid');
const axios = require('axios');

const API_KEY = 'pk_yMUmY4cxNax2r7uCevR5RfGx60p5IvrU';

// Log function
function log(content) {
  const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  console.log(now, content);
}

// Retrieve license function
function getLicense(license) {
  return axios.get(`https://api.hyper.co/v4/licenses/${license}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  }).then((response) => response.data)
    .catch(() => log('Failed to get license'));
}

// Update license function
function updateLicense(license, hwid) {
  return axios.patch(`https://api.hyper.co/v4/licenses/${license}`, {
    metadata: { hwid },
  }, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  }).then((response) => response.data)
    .catch(() => log('Error updating license'));
}

// Reset license function
function resetLicense(license) {
  return axios.patch(`https://api.hyper.co/v4/licenses/${license}`, {
    metadata: null,
  }, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  }).then((response) => response.data)
    .catch(() => log('Failed to reset license'));
}

// Login function
async function checkLicense(license) {
  log('Checking license...');
  const licenseData = await getLicense(license);
  if (licenseData?.user) {
    const hwid = await getHWID();
    if (Object.keys(licenseData.metadata).length === 0) {
      await updateLicense(license, hwid);
      log('Updating license');
    } else {
      const currentHwid = licenseData.metadata.hwid;
      if (currentHwid === hwid) {
        log('License is good to go!');
        return true;
      }
      log('License is already in use on another machine!');
      return false;
    }
  } else if (!licenseData.user) {
    log('License not bound.');
    return false;
  } else {
    log('License not found.');
    return false;
  }
}
