import requests

def update_license(api_key, license_key, hardware_id:str):
	'''Update hardware ID in license metadata'''
	headers = {
		'Authorization': f'Bearer {api_key}',
		'Content-Type': 'application/json'
	}

	payload = {
		'metadata': {
			'hwid': hardware_id
		}
	}

	req = requests.patch(f'https://api.metalabs.io/v4/licenses/{license_key}', headers=headers, json=payload)
	if req.status_code == 200:
		return True

	return None
