const { getHWID } = require("hwid");
const axios = require("axios");

const API_KEY = "pk_KvrP5CpaUvRMMpgUmfM6NIEzFMgXfxcx";

// Log function
function log(content) {
  const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  console.log(now, content);
}

// Retrieve license function
async function getLicense(license) {
  return axios
    .get(`https://api.hyper.co/v4/licenses/${license}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    .then((response) => response.data)
    .catch(() => log("Failed to get license"));
}

// Update license function
async function updateLicense(license, hwid) {
  return axios
    .patch(`https://api.hyper.co/v4/licenses/${license}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      "metadata.hwid": hwid,
    })
    .then((response) => response.data)
    .catch(() => log("Failed to update license"));
}

// Reset license function
async function resetLicense(license) {
  return axios
    .patch(`https://api.hyper.co/v4/licenses/${license}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      "metadata.hwid": null,
    })
    .then((response) => response.data)
    .catch(() => log("Failed to reset license"));
}

// Login function
async function checkLicense(license) {
  log("Checking license...");
  const licenseData = await getLicense(license);
  if (licenseData && licenseData.user) {
    const hwid = await getHWID();
    if (licenseData.metadata === {}) {
      await updateLicense(license, hwid);
    } else {
      const currentHwid = licenseData.metadata.hwid;
      if (currentHwid === hwid) return true;
      log("License is already in use on another machine!");
    }
  } else if (!licenseData.user) {
    log("License not bound.");
    return false;
  } else {
    log("License not found.");
    return false;
  }
}
