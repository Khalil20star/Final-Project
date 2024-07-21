import json
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