'''
Example of CLI license authentication using MAC address to allow
usage of this software on only one machine at a time
'''
import re
import time
import uuid
from datetime import datetime

import requests

API_KEY = 'pk_KvrP5CpaUvRMMpgUmfM6NIEzFMgXfxcx' # replace with your api key

def log(content):
	'''Print timestamp automatically'''
	print('[{}] {}'.format(datetime.utcnow(), content))

def get_license(license_key):
	'''Get license data (Meta Labs API)'''
	headers = {
		'Authorization': f'Bearer {API_KEY}'
	}

	req = requests.get(f'https://api.metalabs.io/v4/licenses/{license_key}', headers=headers)
	if req.status_code == 200:
		return req.json()

	return None

def update_license(license_key, hardware_id):
	'''Update hardware ID in license metadata (Meta Labs API)'''
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
		f'https://api.metalabs.io/v4/licenses/{license_key}',
		headers=headers,
		json=payload
	)

	if req.status_code == 200:
		return True

	return None

def check_license(license_key):
	'''Example of license checking on program start'''
	log('Checking license...')
	license_data = get_license(license_key.strip())
	if license_data:
		hardware_id = ':'.join(re.findall('..', '%012x' % uuid.getnode()))
		if license_data.get('metadata', {}) == {}:
			updated = update_license(license_key, hardware_id)
			if updated:
				return True
			else:
				log('Something went wrong, please retry.')
		else:
			current_hwid = license_data.get('metadata', {}).get('hwid', '')
			if current_hwid == hardware_id:
				return True
			else:
				log('License is already in use on another machine!')
	else:
		log('License not found.')

	return None

input_license = input('[{}] Input your license: '.format(datetime.utcnow()))
auth = check_license(input_license)
if auth:
	log('Authorized.')
	time.sleep(1)
	log('Launching...')
	# add your stuff here
