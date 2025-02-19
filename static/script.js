
let addCar = document.getElementById('addCar');
let updateCar = document.getElementById('updateCar');
const plateNumberInput = document.getElementById('PlateNumber');
const plateNumberExistsError = document.getElementById('plateNumberExists');
const PlateInvalid = document.getElementById("PlateInvalid")



document.getElementById('addCarBtn').addEventListener('click', function () {
  addCar.style.display = 'block';
  updateCar.style.display = 'none';
});

function fetchCarUpdate() {
  updateCar.style.display = 'block';
  addCar.style.display = 'none';
  fetch('/cars')
    .then(response => response.json())
    .then(data => {
      const carCardsContainer = document.getElementById('carCards');
      carCardsContainer.innerHTML = `
        <div id="carCarousel" class="carousel slide" data-bs-ride="carousel">
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
            <div class="card-body d-flex justify-content-between gap-2">
              <button class="btn btn-primary modify-btn w-50" data-plate-number="${car.plate_number}">Modify</button>
              <button class="btn btn-danger remove-btn w-50" data-plate-number="${car.plate_number}">Remove</button>
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


      function updateCarouselControls() {
        const carouselItems = carouselInner.querySelectorAll('.carousel-item');
        const prevButton = document.querySelector('.carousel-control-prev');
        const nextButton = document.querySelector('.carousel-control-next');

        if (carouselItems.length <= 1) {
          prevButton.style.display = 'none';
          nextButton.style.display = 'none';
        } else {
          prevButton.style.display = 'block';
          nextButton.style.display = 'block';
        }
      }
      updateCarouselControls();
      carouselInner.querySelectorAll('.modify-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const plateNumber = btn.getAttribute('data-plate-number');
          const carToUpdate = data.find(car => car.plate_number === plateNumber);

          const formHtml = `
            <div class="updateCarinfo">
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
                    <input class="form-check-input" type="radio" name="is_booked" id="booked" value="true" ${carToUpdate.is_booked ? 'checked' : ''}>
                    <label class="form-check-label" for="booked">Booked</label>
                  </div>
                  <div class="form-check pt-2">
                    <input class="form-check-input" type="radio" name="is_booked" id="notbooked" value="false" ${!carToUpdate.is_booked ? 'checked' : ''}>
                    <label class="form-check-label" for="notbooked">Not Booked</label>
                  </div>
                </div>
                <div class="price d-flex mb-4 gap-4">
                  <div class="hour">
                    <label for="RentHour" class="form-label h4 p-1">Rent Per Hour</label>
                    <input type="number" class="form-control" id="RentHour2" name="rent_per_hour" value="${carToUpdate.rent_per_hour}" min="1" required>
                    <div class="invalid-feedback">
                      Please provide a valid rent per hour.
                    </div>
                  </div>
                  <div class="day">
                    <label for="RentDay" class="form-label h4 p-1">Rent Per Day</label>
                    <input type="number" class="form-control" id="RentDay2" name="rent_per_day" value="${carToUpdate.rent_per_day}" min="1" required>
                    <div class="invalid-feedback">
                      Please provide a valid rent per day.
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-danger cancel" id="cancelButton" onclick="window.location.href = '/admin_page'">Cancel</button>

              </form>
            </div>
          `;

          carCardsContainer.innerHTML = formHtml;
          
          document.getElementById('updateForm').addEventListener('submit', event => {
            event.preventDefault();

            const form = event.target;

            if (!form.checkValidity()) {
              event.stopPropagation();
              form.classList.add('was-validated');
              return;
            }

            const formData = new FormData(form);
            const updatedData = {
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
              body: JSON.stringify(updatedData)
            })
              .then(response => {
                if (response.ok) {
                  alert("This car has been updated");
                  setTimeout(() => window.location.reload(), 500);
                } else {
                  alert("Failed to update the car.");
                }
              })
              .catch(error => {
                alert("An error occurred while updating the car.");
                console.error('Error:', error);
              });

            form.classList.add('was-validated');
          });
        });
      });

      // Add event listeners for remove buttons
      carouselInner.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const plateNumber = btn.getAttribute('data-plate-number');

          fetch('/remove_car', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plate_number: plateNumber })
          })
            .then(response => {
              if (response.ok) {
                alert("This car has been removed");
                setTimeout(() => window.location.reload(), 500);
              } else {
                alert("Failed to remove the car.");
              }
            })
            .catch(error => {
              alert("An error occurred while removing the car.");
              console.error('Error:', error);
            });
        });
      });
      updateCarouselControls();
    })
    .catch(error => {
      console.error('Error fetching cars:', error);
    });
}

fetchCarUpdate();

(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
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
document.getElementById('cancelButton').addEventListener('click', function() {
  window.location.href = '/admin_page';
});
