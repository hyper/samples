'''Hyper API wrapper using asynchronous requests'''
import aiohttp

BASE_URL = 'https://api.hyper.co/v4'

async def get_license(api_key, license_key):
    '''Get license data'''
    headers = {
        'Authorization': 'Bearer {}'.format(api_key)
    }

    url = BASE_URL + '/licenses/{}'.format(license_key)
    async with aiohttp.ClientSession(headers=headers) as session:
        async with session.get(url) as req:
            if req.status == 200:
                return await req.json()

    return None

async def update_license(api_key, license_key, payload:dict):
    '''Update license metadata'''
    headers = {
        'Authorization': 'Bearer {}'.format(api_key),
        'Content-Type': 'application/json'
    }

    url = BASE_URL + '/licenses/{}'.format(license_key)
    async with aiohttp.ClientSession(headers=headers) as session:
        async with session.patch(url, json=payload) as req:
            if req.status == 200:
                return True

    return None
