const axios = require('axios');

const API_KEY = ''; // replace with your api key

/**
 * Retrieves license from Hyper API, returns JSON object if found. Else, returns null
 * @param licenseKey the user's license key
 * @returns {Promise}
 */
async function retrieveLicense(licenseKey){
    return axios.get(`https://api.hyper.co/v5/licenses/${licenseKey}`, {
        headers: { Authorization: `Bearer ${API_KEY}`}
    }).then((response) => response.data)
        .catch(() => null);
}

/**
 * Updates license metadata on Hyper API, returns true if found and updated. Else, returns false
 * @param licenseKey the user's license key
 * @param hardwareId the computer's hardware ID
 * @returns {Promise<Boolean>}
 */
async function updateLicense(licenseKey, hardwareId){
    const response = await axios.patch(`https://api.hyper.co/v5/licenses/${licenseKey}`, {
        metadata: {
            hwid: hardwareId
        }
    }, {
        headers: { Authorization: `Bearer ${API_KEY}`}
    }).catch(() => null);

    return !!response.data;
}

module.exports = {
    retrieveLicense,
    updateLicense
}
