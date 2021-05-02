import requests

def get_license(api_key, license_key):
	'''Get license data from API'''
	headers = {
		'Authorization': f'Bearer {api_key}'
	}

	req = requests.get(f'https://api.metalabs.io/v4/licenses/{license_key}', headers=headers)
	if req.status_code == 200:
		return req.json()

	return None
