# Carness

Carness is a web application that allows users to rent cars on a daily or hourly basis. It offers a user-friendly interface for browsing available vehicles, making reservations, and managing rentals.

## Table of Contents

1. [Installation](#installation)
3. [Technologies Used](#technologies-used)
4. [Contributing](#contributing)
5. [Contact](#contact)

## Installation

To get started with Carness, follow these steps:

Ensure that Python and pip are installed on your system. 

1. **Checking Python and pip**
    ```bash
    python --version
    pip --version
    ```
    If not, follow the instructions below based on your operating system:
    - Download the Python installer from the official Python website https://www.python.org/downloads.
    - Run the installer, making sure to check the option to "Add Python to PATH".

2. **Install pip**
    ```bash
    py -m pip install --upgrade pip
    ```
3. **Install Flask**
    ```bash
    pip install Flask
    ```
4. **Clone the repository:**
    ```bash
    git clone https://github.com/Khalil20star/Final-Project.git
    cd Final-Project
    ```

5. **Run the application:**
     Start the backend server:
      ```bash
      flask --app main.py --debug run
      ```

1. **Browse Available Cars:** View a list of cars available for rent.
2. **Make Reservations:** Reserve a car for a specific time period.
3. **Manage Rentals:** View and manage your current rentals.
4. **CRUD Operations for Cars:**
   - **Add Car:** Add new cars to the system with details such as model, color, rental price per hour and day, station.
   - **Update Car:** Modify the details of existing cars, such as changing the rental price or updating availability.
   - **Remove Car:** Delete cars from the system that are no longer available for rent.
   - **View Cars:** View the list of all cars available in the system, including details such as model, color, rental price, and station.


## Technologies Used

- **Backend:** Flask (Python)
- **Frontend:** JavaScript, CSS, HTML, Bootstrap

## Contributing

We welcome contributions to Carness! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Contact

- **Author:** Khalil Ahmed
- **Email:** Khalil.star2020@gmail.com
- **GitHub:** [github.com/Khalil20star](https://github.com/Khalil20star)

Feel free to reach out if you have any questions or need further assistance.
