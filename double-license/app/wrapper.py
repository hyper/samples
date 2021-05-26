import requests

BASE_URL = 'https://api.hyper.co/v5'

def create_license(api_key, license_data):
    """Create Hyper license"""
    headers = {
        'Authorization': f'Bearer {api_key}'
    }

    payload = {
        'plan': '271qifPfmIx5F6d2sqGzV',
        'user': license_data['user']['id'],
        'email': license_data['email']
    }

    req = requests.post(
        BASE_URL + '/licenses',
        headers=headers,
        json=payload
    )
    if req.status_code == 200:
        return req.json()

    return None

def get_license(api_key, license_key):
    """Get Hyper license"""
    headers = {
        'Authorization': f'Bearer {api_key}'
    }

    req = requests.get(BASE_URL + f'/licenses/{license_key}', headers=headers)
    if req.status_code == 200:
        return req.json()

    return None

def email_license(api_key, license_key):
    """Email Hyper license"""
    headers = {
        'Authorization': f'Bearer {api_key}'
    }

    req = requests.post(BASE_URL + f'/licenses/{license_key}/send', headers=headers)
    if req.status_code == 202:
        return True

    return None

def revoke_license(api_key, license_key):
    """Revoke Hyper license"""
    headers = {
        'Authorization': f'Bearer {api_key}'
    }

    req = requests.delete(BASE_URL + f'/licenses/{license_key}', headers=headers)
    if req.status_code == 202:
        return True

    return None
