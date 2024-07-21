from flask import request, jsonify, redirect, url_for, render_template
from car import Car 
import json
import utilities  

def login():
    data = request.get_json()
    username = data.get('username') 
    password = data.get('password')
    if utilities.check_credentials(username, password):
        return redirect(url_for('admin_page'))
    else:
        return jsonify({'message': 'Invalid username or password.'}), 401

def home():
    return render_template('index.html')

def admin_page():
    return render_template('admin_page.html')

def user_page():
    return render_template('userPage.html')

def get_cars():
    with open('static/Cars.json', 'r') as f:
        cars_data = json.load(f)
    return jsonify(cars_data)

def add_car_route():
    data = request.form
    car = Car(
        model=data.get('Select_Model'),
        color=data.get('Select_Color'),
        plate_number=data.get('PlateNumber'),
        area=data.get('Select_Area'),
        rent_per_hour=data.get('RentHour'),
        rent_per_day=data.get('RentDay')
    )
    
    Car.add_car(car)
    return redirect(url_for('admin_page'))

def remove_car_route():
    Car.remove_car()
    return redirect(url_for('admin_page'))

def update_car_route():
    try:
        car_data = request.get_json()
        Car.update_car(car_data)
        return redirect(url_for('admin_page'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def book_car_route():
    plate_number = request.json.get('plate_number')
    try:
        Car.book(plate_number)
        return jsonify({'message': 'Car booked successfully!'})
    except FileNotFoundError:
        return jsonify({"message": "Cars.json file not found!"}), 404  
    except Exception as e:
        return jsonify({"message": f"Error booking car: {str(e)}"}), 500
