import requests

BASE_URL = 'https://discordapp.com'

def message_user(token, user, content):
	'''Send a direct message to the user'''
	headers = {
		'Authorization': f'Bot {token}',
		'Content-Type': 'application/json'
	}

	req = requests.post(
		BASE_URL + '/api/users/@me/channels',
		headers=headers,
		json={'recipient_id': user}
	)
	if req.status_code == 200:
		message_req = requests.post(
			BASE_URL + '/api/channels/{}/messages'.format(req.json()['id']),
			headers=headers,
			json={'content': content}
		)

		if message_req.status_code == 200:
			return True

	return None

def message_channel(token, channel, content):
	'''Send a message in a channel'''
	headers = {
		'Authorization': f'Bot {token}',
		'Content-Type': 'application/json'
	}

	req = requests.post(
		BASE_URL + f'/api/channels/{channel}/messages',
		headers=headers,
		json={'content': content}
	)
	if req.status_code == 200:
		return True

	return None
