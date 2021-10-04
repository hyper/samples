import requests
from typing import Optional

API_KEY = ''  # replace with your api key


def get_license(license_key: str) -> Optional[dict]:
    """
    :param license_key: The user's license key
    :type license_key: str
    :return: dict | None

    Retrieves license from Hyper API, returns JSON dictionary if found. Else, returns None
    """
    headers = {
        'Authorization': f'Bearer {API_KEY}'
    }

    req = requests.get(f'https://api.hyper.co/v5/licenses/{license_key}', headers=headers)
    if req.status_code == 200:
        return req.json()

    return None


def update_license(license_key: str, hardware_id: str) -> Optional[bool]:
    """
    :param license_key: The user's license key
    :type license_key: str
    :param hardware_id: The computer's hardware ID
    :type hardware_id: str
    :return: dict | None

    Updates license metadata on Hyper API, returns True if found and updated. Else, returns None
    """
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        'metadata': {
            'hwid': hardware_id
        }
    }

    req = requests.patch(
        f'https://api.hyper.co/v5/licenses/{license_key}',
        headers=headers,
        json=payload
    )

    if req.status_code == 200:
        return True

    return None
