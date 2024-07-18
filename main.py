from flask import Flask, render_template, jsonify, request, redirect, url_for
import json

app = Flask(__name__)

class Car:
     def __init__(self,model,color,plate_number,area,rent_per_hour,rent_per_day):
        self.model = model
        self.color = color
        self.plate_number = plate_number
        self.area = area
        self.rent_per_hour = rent_per_hour
        self.rent_per_day = rent_per_day
        self.is_booked = False

     def to_dict(self):
        return {
            'model': self.model,
            'color': self.color,
            'plate_number': self.plate_number,
            'area': self.area,
            'rent_per_hour': self.rent_per_hour,
            'rent_per_day': self.rent_per_day,
            'is_booked': self.is_booked
        }

    
     def add_car(car):
            car_dict = car.to_dict()
            plate_number = car_dict['plate_number']
            
            with open('static/Cars.json', 'r+') as f:
                cars = json.load(f)
                for existing_car in cars:
                    if existing_car['plate_number'] == plate_number:
                        return False, "Car with this plate number already exists."

                car_dict['is_booked'] = False
                cars.append(car_dict)
                f.seek(0)
                f.truncate()
                json.dump(cars, f, indent=4)
                
                return True, "Car added successfully."

     def remove_car():
      plate_number = request.json.get('plate_number')
      with open('static/Cars.json', 'r+') as f:
        cars = json.load(f)
        cars = [car for car in cars if car['plate_number'] != plate_number]
        f.seek(0)
        f.truncate()
        json.dump(cars, f, indent=4)
        

     def update_car(car_data):
        plate_number = car_data.get('plate_number')
        with open('static/Cars.json', 'r+') as f:
            cars = json.load(f)
            for car in cars:
                if car['plate_number'] == plate_number:
                    car.update(car_data)
            f.seek(0)
            f.truncate()
            json.dump(cars, f, indent=4)

     def book(plate_number):
        with open('static/Cars.json', 'r+') as f:
            cars = json.load(f)
            for car in cars:
                if car['plate_number'] == plate_number:
                    car['is_booked'] = True
                    break
            f.seek(0)
            f.truncate()
            json.dump(cars, f, indent=4)
         
def check_credentials(username, password):
    with open('static/admin.json', 'r') as f:
        users = json.load(f)
    user = next((user for user in users if user['username'] == username and user['password'] == password), None)
    return user is not None

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username') 
    password = data.get('password')
    if check_credentials(username, password):
        return redirect(url_for('admin_page'))
    else:
        return jsonify({'message': 'Invalid username or password.'}), 401

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin_page')
def admin_page():
    return render_template('admin_page.html')

@app.route('/userPage')
def user_page():
    return render_template('userPage.html')

@app.route('/cars', methods=['GET'])
def get_cars():
        with open('static/Cars.json', 'r') as f:
            cars_data = json.load(f)
        return jsonify(cars_data)

@app.route('/add_car', methods=['POST'])
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
    
@app.route('/remove_car', methods=['POST'])
def remove_car_route():
    Car.remove_car()
    return redirect(url_for('admin_page'))

@app.route('/update_car', methods=['POST'])
def update_car_route():
    try:
        car_data = request.get_json()
        Car.update_car(car_data)
        return redirect(url_for('admin_page'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/book_car', methods=['POST'])
def book_car_route():
    plate_number = request.json.get('plate_number')
    try:
        Car.book(plate_number)
        return jsonify({'message': 'Car booked successfully!'})
    except FileNotFoundError:
        return jsonify({"message": "Cars.json file not found!"}), 404  
    except Exception as e:
        return jsonify({"message": f"Error booking car: {str(e)}"}), 500

