const { getHWID } = require('hwid');
const axios = require('axios');

const API_KEY = 'pk_KvrP5CpaUvRMMpgUmfM6NIEzFMgXfxcx';

// Log function
function log(content) {
  const now = new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
  console.log(now, content);
}


// Retrieve license function
async function getLicense(license) {
  return axios.get(`https://api.hyper.co/v4/licenses/${license}`,
    { headers: { Authorization: `Bearer ${API_KEY}` } })
    .then((response) => response.data)
    .catch(() => undefined);
}


// Update license function
async function updateLicense(license, hwid) {
  return axios.patch(`https://api.hyper.co/v4/licenses/${license}`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
      'metadata.hwid': hwid,
    })
    .then((response) => response.data)
    .catch(() => undefined);
}

// Login function
async function checkLicense(license) {
  log('Checking license...');
  const licenseData = await getLicense(license);
  if (licenseData) {
    const hwid = await getHWID();
    if (licenseData.metadata === {}) {
      const updated = await updateLicense(license, hwid);
      if (updated) return true;
      log('Something went wrong, please retry.');
    } else {
      const currentHwid = licenseData.metadata.hwid;
      if (currentHwid === hwid) return true;
      log('License is already in use on another machine!');
    }
  } else {
    log('License not found.');
    return false;
  }
}
