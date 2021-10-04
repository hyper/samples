const dayjs = require('dayjs');
const { getHWID } = require('hwid');
const { retrieveLicense, updateLicense} = require('./api');

/**
 * Logs content and formatted timestamp to stdout
 * @param content The content to log to stdout
 * @returns {null}
 */
function log(content){
    console.log(`[${dayjs().format('YYYY-MM-DD hh:mm:ss:SSS')}] ${content}`);
}

/**
 * Returns a promise that resolves after a timeout
 * @param ms The number of milliseconds to wait before resolving the promise
 * @returns {Promise}
 */
function sleep(ms){
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * Performs all necessary authentication logic to log a user in
 * @param licenseKey The user's license key
 * @param hardwareLock Whether or not to use hardware ID locking
 * @returns {Boolean|null}
 */
async function checkLicense(licenseKey, hardwareLock = false){
    log(`Checking license ${licenseKey}`);

    // Use the API to retrieve the license data
    const licenseData = await retrieveLicense(licenseKey.trim());

    // Get the current hwid
    const hardwareId = getHWID();

    // If the license is not found
    if (!licenseData) return log('Invalid license.');

    // If we do not want to use hardware lock
    if (!hardwareLock)
        // Check that the license is not canceled
        return ['active', 'trialing', 'past_due'].includes(licenseData.status);

    // If we want to use hardware lock and metadata is empty
    if (Object.keys(licenseData.metadata).length === 0){
        // Update the stored hwid
        const updated = await updateLicense(licenseKey, hardwareId);

        // If the license was successfully updated, return True
        if(updated) return updated;

        // If we failed to update the license, alert the user
        return log('Something went wrong.')
    }

    // If we want to use hardware lock and metadata is not empty

    // Get the current hwid from metadata
    const currentHwid = licenseData.metadata.hwid;

    // If the current hwid matches the stored hwid, allow login
    if (currentHwid === hardwareId) return true;

    // If the current hwid does not match the stored hwid, do not allow login
    log('License is in use.');
    return false;
}

module.exports = {
    log,
    sleep,
    checkLicense
}
