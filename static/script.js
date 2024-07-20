
let addCar = document.getElementById('addCar');
let updateCar = document.getElementById('updateCar');
let removeCar1 = document.getElementById('removeCar');
const plateNumberInput = document.getElementById('PlateNumber');
const plateNumberExistsError = document.getElementById('plateNumberExists');
const PlateInvalid = document.getElementById("PlateInvalid")



document.getElementById('addCarBtn').addEventListener('click', function () {
  addCar.style.display = 'block';
  updateCar.style.display = 'none';
  removeCar1.style.display = 'none';
});

document.getElementById('updateCarBtn').addEventListener('click', function () {
  updateCar.style.display = 'block';
  addCar.style.display = 'none';
  removeCar1.style.display = 'none';
});
document.getElementById('removeCarBtn').addEventListener('click', function () {
  removeCar1.style.display = 'block';
  updateCar.style.display = 'none';
  addCar.style.display = 'none';
});

function fetchCarUpdate() {
  updateCar.style.display = 'block';
  addCar.style.display = 'none';
  removeCar1.style.display = 'none';

  fetch('/cars')
    .then(response => response.json())
    .then(data => {
      const carCardsContainer = document.getElementById('carCards');
      carCardsContainer.innerHTML = `
        <div id="carCarousel" class="carousel slide " data-bs-ride="carousel">
          <div class="carousel-inner" id="carouselInner">
            <!-- Carousel items will be dynamically inserted here -->
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `;

      const carouselInner = document.getElementById('carouselInner');
      if (!carouselInner) {
        console.error('carouselInner element not found');
        return;
      }

      let carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item', 'active');
      let carsInCurrentItem = 0;

      let rowDiv = document.createElement('div');
      rowDiv.classList.add('row', 'g-4');

      data.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.classList.add('col-md-3');

        carCard.innerHTML = `
          <div class="card">
          <img src="/static/img/Cars/${car.model}.png" alt="${car.model}" class="card-img-top">
          <div class="card-body text-center">
            <h5 class="card-title">${car.model}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Color: ${car.color}</li>
            <li class="list-group-item">Plate Number: ${car.plate_number}</li>
            <li class="list-group-item">Station: ${car.area}</li>
            <li class="list-group-item">Car Rent Per Hour: ${car.rent_per_hour}</li>
            <li class="list-group-item">Car Rent Per Day: ${car.rent_per_day}</li>
          </ul>
          <div class="card-body">
            <button class="btn btn-primary w-100 modify-btn" data-plate-number="${car.plate_number}">Modify</button>
          </div>
        </div>
        `;

        rowDiv.appendChild(carCard);
        carsInCurrentItem++;

        if (carsInCurrentItem === 4 || index === data.length - 1) {
          carouselItem.appendChild(rowDiv);
          carouselInner.appendChild(carouselItem);

          carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');
          rowDiv = document.createElement('div');
          rowDiv.classList.add('row', 'g-4');
          carsInCurrentItem = 0;
        }
      });

      // Add event listeners for modify buttons
      carouselInner.querySelectorAll('.modify-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const plateNumber = btn.getAttribute('data-plate-number');
          const carToUpdate = data.find(car => car.plate_number === plateNumber);

          const formHtml = `
          <form id="updateForm" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="Select_Area" class="form-label h3 p-1">Area</label>
              <select id="Select_Area" class="form-select" name="area" required>
                <option ${carToUpdate.area === 'Area 1' ? 'selected' : ''}>Area 1</option>
                <option ${carToUpdate.area === 'Area 2' ? 'selected' : ''}>Area 2</option>
                <option ${carToUpdate.area === 'Area 3' ? 'selected' : ''}>Area 3</option>
                <option ${carToUpdate.area === 'Area 4' ? 'selected' : ''}>Area 4</option>
                <option ${carToUpdate.area === 'Area 5' ? 'selected' : ''}>Area 5</option>
              </select>
              <div class="invalid-feedback">
                Please select an area.
              </div>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="is_booked" id="booked" value="true" ${carToUpdate.is_booked === true ? 'checked' : ''}>
                <label class="form-check-label" for="booked">Booked</label>
              </div>
              <div class="form-check pt-2">
                <input class="form-check-input" type="radio" name="is_booked" id="notbooked" value="false" ${carToUpdate.is_booked === false ? 'checked' : ''}>
                <label class="form-check-label" for="notbooked">Not Booked</label>
              </div>
            </div>
            <div class="price d-flex mb-4 gap-4">
              <div class="hour">
                <label for="RentHour" class="form-label h4 p-1">Rent Per Hour</label>
                <input type="number" class="form-control" id="RentHour" name="rent_per_hour" value="${carToUpdate.rent_per_hour}" required>
                <div class="invalid-feedback">
                  Please provide a valid rent per hour.
                </div>
              </div>
              <div class="day">
                <label for="RentDay" class="form-label h4 p-1">Rent Per Day</label>
                <input type="number" class="form-control" id="RentDay" name="rent_per_day" value="${carToUpdate.rent_per_day}" required>
                <div class="invalid-feedback">
                  Please provide a valid rent per day.
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          `;

          carCardsContainer.innerHTML = formHtml;

          document.getElementById('updateForm').addEventListener('submit', event => {
            event.preventDefault();

            const form = event.target;

            // Check if the form is valid
            if (form.checkValidity() === false) {
              event.stopPropagation();
              form.classList.add('was-validated');
              return;
            }

            const formData = new FormData(form);
            const Data = {
              plate_number: carToUpdate.plate_number,
              area: formData.get('area'),
              rent_per_hour: formData.get('rent_per_hour'),
              rent_per_day: formData.get('rent_per_day'),
              is_booked: formData.get('is_booked') === 'true' 
            };

            fetch('/update_car', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(Data)
            })
              .then(response => {
                if (response.ok) {
                  window.alert("This car has been updated");
                  setTimeout(() => window.location.reload(), 500);
                } else {
                  window.alert("Failed to update the car.");
                }
              })
              .catch(error => {
                window.alert("An error occurred while updating the car.");
                console.error('Error:', error);
              });

            form.classList.add('was-validated');
          });
        });
      });
    })
    .catch(error => {
      console.error('Error fetching cars:', error);
    });
}



document.getElementById('updateCarBtn').addEventListener('click', fetchCarUpdate);


function fetchCar(){
  fetch('/cars')
    .then(response => response.json())
    .then(data => {
      const carCardsContainer = document.getElementById('carCardsremove');
      carCardsContainer.innerHTML = `
        <div id="carCarousel" class="carousel slide position-relative" data-bs-ride="carousel">
          <div class="carousel-inner" id="carouselInnerRemove">
            <!-- Carousel items will be dynamically inserted here -->
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `;

      const carouselInner = document.getElementById('carouselInnerRemove');
      if (!carouselInner) {
        console.error('carouselInner element not found');
        return;
      }

      let carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item', 'active');
      let carsInCurrentItem = 0;

      let rowDiv = document.createElement('div');
      rowDiv.classList.add('row', 'g-4');

      data.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.classList.add('col-md-3');

        carCard.innerHTML = `
          <div class="card">
            <img src="/static/img/Cars/${car.model}.png" alt="${car.model}" class="card-img-top">
            <div class="card-body text-center">
              <h5 class="card-title">${car.model}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Color: ${car.color}</li>
              <li class="list-group-item">Plate Number: ${car.plate_number}</li>
              <li class="list-group-item">Station: ${car.area}</li>
              <li class="list-group-item">Car Rent Per Hour: ${car.rent_per_hour}</li>
              <li class="list-group-item">Car Rent Per Day: ${car.rent_per_day}</li>
            </ul>
            <div class="card-body">
              <button class="btn btn-danger w-100" onclick="removeCar('${car.plate_number}'); setTimeout(() => window.location.reload(), 500);">
                Remove
              </button>
            </div>
          </div>
        `;

        rowDiv.appendChild(carCard);
        carsInCurrentItem++;

        if (carsInCurrentItem === 4 || index === data.length - 1) {
          carouselItem.appendChild(rowDiv);
          carouselInner.appendChild(carouselItem);

          carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');
          rowDiv = document.createElement('div');
          rowDiv.classList.add('row', 'g-4');
          carsInCurrentItem = 0;
        }
      });

      // Add event listeners for carousel control arrows
      const prevButton = document.querySelector('.carousel-control-prev');
      const nextButton = document.querySelector('.carousel-control-next');

      prevButton.addEventListener('click', () => {
        const carousel = new bootstrap.Carousel(document.getElementById('carCarousel'));
        carousel.prev();
      });

      nextButton.addEventListener('click', () => {
        const carousel = new bootstrap.Carousel(document.getElementById('carCarousel'));
        carousel.next();
      });
    })
    .catch(error => {
      console.error('Error fetching cars:', error);
    });
}


document.getElementById('removeCarBtn').addEventListener('click', fetchCar);


function removeCar(plateNumber) {
  fetch('/remove_car', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ plate_number: plateNumber })
    
  })
  window.alert("This car has been removed")
}

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

plateNumberInput.addEventListener('input', async function(event) {
  const plateNumber = event.target.value.trim();
  if (plateNumber === '') {
      return;
  }

  try {
      const response = await fetch('/cars');
      const carsData = await response.json();

      const carExists = carsData.some(car => car.plate_number === plateNumber);
      if (carExists) {
          plateNumberExistsError.style.display = 'block';
          PlateInvalid.style.display = 'none'
          plateNumberInput.setCustomValidity('Car with this Plate Number already exists.');
          
      } else {
          plateNumberExistsError.style.display = 'none';
          
          plateNumberInput.setCustomValidity('');
      }
  } catch (error) {
      console.error('Error checking car existence:', error);
  }
});

  const logButton = document.getElementById('logButton');
    logButton.addEventListener('click', function () {
        window.location.href = '/'; 
});