import json
def check_credentials(username, password):
    with open('static/admin.json', 'r') as f:
        users = json.load(f)
    user = next((user for user in users if user['username'] == username and user['password'] == password), None)
    return user is not None