import time
from datetime import datetime
from utils import check_license, log

API_KEY = ''  # replace with your api key


def main() -> None:
    """
    :return:

    The main function of the program. This is where you authenticate the user, and
    call upon any external modules or initialize your task runner.
    """

    # Get the license from the user
    license_key = input('[{}] Input your license: '.format(datetime.utcnow()))

    # Use the check license function to retrieve the license data and validate it
    auth_data = check_license(
        license_key,
        # hardware_lock=True
        # If you would like to restrict your software to 1 instance per machine, un-comment the line above.
    )

    # If the license is found, and is valid, continue to run program.
    if auth_data:
        log('Authorized.')
        time.sleep(1)
        log('Launching...')

        # At this point, we know the user has successfully authenticated, has set their HWID
        # if applicable, and is allowed to run the main function of the software. You can import
        # this function from another library file, or put your code directly in this main function
        # after the validation above.


if __name__ == '__main__':
    main()
