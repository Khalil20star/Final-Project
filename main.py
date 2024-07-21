from flask import Flask, render_template, jsonify, request, redirect, url_for
import json
import routes  
import utilities

app = Flask(__name__)
    
app.add_url_rule('/login', 'login', routes.login, methods=['POST'])
app.add_url_rule('/', 'home', routes.home)
app.add_url_rule('/admin_page', 'admin_page', routes.admin_page)
app.add_url_rule('/userPage', 'user_page', routes.user_page)
app.add_url_rule('/cars', 'get_cars', routes.get_cars, methods=['GET'])
app.add_url_rule('/add_car', 'add_car_route', routes.add_car_route, methods=['POST'])
app.add_url_rule('/remove_car', 'remove_car_route', routes.remove_car_route, methods=['POST'])
app.add_url_rule('/update_car', 'update_car_route', routes.update_car_route, methods=['POST'])
app.add_url_rule('/book_car', 'book_car_route', routes.book_car_route, methods=['POST'])

if __name__ == "__main__":
    app.run(debug=True)


