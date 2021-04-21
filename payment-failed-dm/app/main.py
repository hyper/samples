import os
import traceback

import requests
import stripe
from dotenv import load_dotenv
from flask import Flask, request

from utils import message_channel, message_user

load_dotenv()

app = Flask(__name__)

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
STRIPE_WEBHOOK_SECRET = os.environ.get('STRIPE_ENDPOINT_SECRET')
HYPER_SECRET_KEY = os.environ.get('HYPER_SECRET_KEY')
DISCORD_BOT_TOKEN = os.environ.get('DISCORD_BOT_TOKEN')
DISCORD_CHANNEL_ID = os.environ.get('DISCORD_CHANNEL_ID')

@app.route('/', methods=['POST'])
def stripe_endpoint():
	body = request.data.decode('utf-8')
	signature_header = request.headers.get('Stripe-Signature', None)

	try:
		event = stripe.Webhook.construct_event(
			body, signature_header, STRIPE_WEBHOOK_SECRET
		)

		if event['type'] == 'charge.failed':
			customer_id = event['data']['object']['customer']

			headers = {
				'Authorization': f'Bearer {HYPER_SECRET_KEY}'
			}

			req = requests.get(f'https://api.hyper.co/v4/licenses?customer={customer_id}', headers=headers)
			if req.status_code == 200:
				data = req.json()
				if data['total'] > 0:
					user = data['data'][0].get('user', {}).get('discord', {})
					if user:
						content = '[Payment Failed] '
						messaged = message_user(
							token=DISCORD_BOT_TOKEN,
							user=user['id'],
							content='Your payment method on file has failed.'
						)
						if messaged:
							content += 'Message sent to '
						else:
							content += 'Failed to message '

						message_channel(
							token=DISCORD_BOT_TOKEN,
							channel=DISCORD_CHANNEL_ID,
							content=content + '**{}#{}**'.format(user['username'], user['discriminator'])
						)

		return '', 200
	except stripe.error.SignatureVerificationError:
		return 'Bad Request', 400
	except:
		traceback.print_exc()
		return 'Internal Server Error', 500

@app.errorhandler(404)
def page_not_found(e):
	return 'Not Found', 404
