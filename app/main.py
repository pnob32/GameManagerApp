#!flask/bin/python
from flask import Flask, jsonify, request
import json

app = Flask(__name__, static_url_path='')
#app.config.from_object('config')

#api = restful.Api(app)

users = [
    #{
     #   'firstname': 0,
     #   'lastname': 0,
     #   'age': 0, 
     #   'id': 0,
    #}
]

@app.after_request
def after_request(response):
    print "sending headers"
    response.headers.add('Acess-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


# Handle http requests
# PUT - add new resource
# POST - update resource
    
@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    b = 'user not found'
    print 'getting user: ' + user_id
    for cur in users:
        if cur['id'] == user_id:
            b = json.dumps(cur)
    return b

@app.route('/users/<user_id>', methods=['PUT'])
def put_user(user_id):
    b = 'OK'
    for user in users:
        if user['id'] == user_id:
            user = request.json
            return json.dumps(users)


@app.route('/users', methods=['GET'])
def get_users():
    print request;
    print request.json;
    return json.dumps(users)

@app.route('/users', methods=['POST'])
def post_users():
    print request.json
    
    userdata = request.json
    
    # check for duplicate email
    for user in users:
      if (user['email'] == userdata['email']):
        return 'exists'
    
    users.append(userdata)
    return json.dumps(users)

@app.route('/', methods=['GET'])
def root():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=80)
