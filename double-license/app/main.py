import os
import traceback

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore
from flask import Flask, request

from .wrapper import create_license, email_license, get_license, revoke_license

load_dotenv()

app = Flask(__name__)

with open('serviceAccountKey.json') as p:
    cred_json = {}

cred = credentials.Certificate(cred_json)
firebase_admin.initialize_app(cred, {
	'databaseURL': 'https://{}.firebaseio.com'.format(cred_json['project_id'])
})

db = firestore.client()

MAIN_ACCOUNT_SK = os.environ.get('MAIN_ACCOUNT_SK')
SECOND_ACCOUNT_SK = os.environ.get('SECOND_ACCOUNT_SK')

@app.route('/', methods=['POST'])
def licenses():
    try:
        body = request.json
        if body['type'] == 'license.created':
            license_data = get_license(MAIN_ACCOUNT_SK, body['data']['key'])
            created = create_license(SECOND_ACCOUNT_SK, license_data) # create license in secondary account
            if created:
                db.collection('licenses').document(license_data['key']).set({'license': created['key']})
                email_license(SECOND_ACCOUNT_SK, created['key'])
                print('[{}] License created'.format(created['key']))
            else:
                print('[{}] Error revoking license'.format(created['key']))

            return '', 200

        elif body['type'] == 'license.deleted':
            license_data = get_license(MAIN_ACCOUNT_SK, body['data']['key'])
            doc_ref = db.collection('licenses').document(license_data['key']).get()
            if doc_ref.exists:
                aio_license = doc_ref.to_dict()['license']
                revoked = revoke_license(SECOND_ACCOUNT_SK, aio_license) # revoke license in secondary account
                if revoked:
                    db.collection('licenses').document(license_data['key']).delete()
                    print('[{}] License revoked'.format(aio_license))
                else:
                    print('[{}] Error revoking license'.format(aio_license))
            else:
                print('[{}] License not found'.format(license_data['key']))

            return '', 200

        return 'Not Found', 404
    except:
        traceback.print_exc()
        return 'Internal Server Error', 500

@app.errorhandler(404)
def page_not_found(e):
    return 'Not Found', 404
