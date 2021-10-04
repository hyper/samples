import re
import uuid
from datetime import datetime
from typing import Optional
from api import get_license, update_license


def log(content: str) -> None:
    """
    :param content: The content to log to stdout
    :type content: str
    :return: None

    Logs content and formatted timestamp to stdout
    """
    print('[{}] {}'.format(datetime.utcnow(), content))


def get_hwid() -> str:
    """
    :return: None

    Generates a unique identifier that represents the current machine
    """
    return ':'.join(re.findall('../..', '%012x' % uuid.getnode()))


def check_license(license_key: str, hardware_lock: bool = False) -> Optional[bool]:
    """
    :param license_key: The user's license key
    :type license_key: str
    :param hardware_lock:
    :type hardware_lock: bool
    :return: bool | None
    """
    log('Checking license {0}'.format(license_key))

    # Use the API to retrieve the license data
    license_data = get_license(license_key.strip())

    # Get the current hwid
    hardware_id = get_hwid()

    # If the license is not found
    if not license_data:
        return log('Invalid license.')

    # If we do not want to use hardware lock
    if not hardware_lock:
        # Check that the license is not canceled
        return license_data.get('status') in ['active', 'trialing', 'past_due']

    # If we want to use hardware lock and metadata is empty
    if license_data.get('metadata', {}) == {}:
        # Update the stored hwid
        updated = update_license(license_key, hardware_id)

        # If the license was successfully updated, return True
        if updated:
            return True

        # If we failed to update the license, alert the user
        else:
            return log('Something went wrong.')

    # If we want to use hardware lock and metadata is not empty
    else:
        # Get the current hwid from metadata
        current_hwid = license_data.get('metadata', {}).get('hwid', '')

        # If the current hwid matches the stored hwid, allow login
        if current_hwid == hardware_id:
            return True

        # If the current hwid does not match the stored hwid, do not allow login
        else:
            log('License is in use.')
            return False
