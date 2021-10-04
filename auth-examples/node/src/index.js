const inquirer = require('inquirer');
const dayjs = require("dayjs");
const { checkLicense, log, sleep } = require("./utils");

/**
 * The main function of the program. This is where you authenticate the user, and
 * call upon any external modules or initialize your task runner.
 * @returns {undefined}
 */
(async function main(){
    // Get the license from the user
    const { licenseKey } = await inquirer.prompt([{
        name: 'licenseKey',
        message: `[${dayjs().format('YYYY-MM-DD hh:mm:ss:SSS')}] Input your license:`,
    }]);

    const authData = await checkLicense(
        licenseKey,
        // true,
        // If you would like to restrict your software to 1 instance per machine, un-comment the line above.
    )

    // If the license is found, and is valid, continue to run program.
    if (authData){
        log('Authorized.');
        await sleep(1000);
        log('Launching...');

        // At this point, we know the user has successfully authenticated, has set their HWID
        // if applicable, and is allowed to run the main function of the software. You can import
        // this function from another library file, or put your code directly in this main function
        // after the validation above.
    }
})();
