from instagram_private_api import Client, ClientCompatPatch
#from flask import Flask, Response, request
import json

user_name = 'test'
password = 'test'

api = Client(user_name, password)
uuid = api.generate_uuid()
#app = Flask(__name__)

#@app.route('/api/get/userFollowers')
#def getUserFollowers():
    #following = api.user_followers()
    #return Response(json.dumps(following), mimetype='application/json')
following = api.user_followers(api.authenticated_user_id, uuid)
#following = api.user_following('243722311', uuid)
print(following)
