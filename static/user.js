fetch('/cars')
  .then(response => response.json())
  .then(data => {
    const carCardsContainer = document.getElementById('Cards');
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

    let cardsInCurrentItem = 0;

    data.forEach((car, index) => {
      const cardHtml = `
        <div class="container">
          <div class="card mb-3 w-100 w-md-75">
            <div class="row">
              <div class="col-12 col-md-3 d-flex justify-content-center align-items-center carImg">
                <img src="/static/img/Cars/${car.model}.png" alt="${car.model}" class="card-img-top w-75 w-md-75">
              </div>
              <div class="col-12 col-md-6">
                <div class="card-body text-center text-md-left">
                  <h3 class="card-title mb-3">${car.model}</h3>
                  <div class="d-flex flex-column flex-md-row flex-wrap d-flex justify-content-between">
                    <div class="p-2 info">
                      <span class="font-weight-bold">Color</span><p> ${car.color}</p>
                    </div>
                    <div class="p-2 info">
                      <span class="font-weight-bold">Plate Number</span><p> ${car.plate_number}</p>
                    </div>
                    <div class="p-2 info">
                      <span class="font-weight-bold">Station</span><p> ${car.area}</p>
                    </div>
                    <div class="p-2 info">
                      <span class="font-weight-bold">Rent Per Hour</span> <p>${car.rent_per_hour}$</p>
                    </div>
                    <div class="p-2 info">
                      <span class="font-weight-bold">Rent Per Day</span> <p>${car.rent_per_day}$</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-3 d-flex align-items-center">
                <div class="card-body text-center text-md-left">
                  <button class="btn w-75 w-md-50 book-btn btn-success ${car.is_booked ? '' : 'modify-btn2'}" data-plate-number="${car.plate_number}" ${car.is_booked ? 'disabled style="background-color: red; color: white; border: 0px;"' : ''}>
                    ${car.is_booked ? 'Booked' : 'Book'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      carouselItem.innerHTML += cardHtml;
      cardsInCurrentItem++;

      if (cardsInCurrentItem === 2 || index === data.length - 1) {
        carouselInner.appendChild(carouselItem);
        carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        cardsInCurrentItem = 0;
      }
    });

    // Hide arrows if the number of items is 2 or fewer
    const totalItems = data.length;
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');

    if (totalItems <= 2) {
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
      nextButton.style.display = 'block';
    }

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


function bookCar(plateNumber, button) {
  fetch('/book_car', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ plate_number: plateNumber })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      alert('Car booked successfully!');
      button.disabled = true;
    } else {
      alert('Error booking car: ' + data.error);
    }
  })
  .catch(error => {
    alert('Error booking car: ' + error.message);
  });
}
document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logoutButton');

  logoutButton.addEventListener('click', function () {
    localStorage.removeItem('username');
    window.location.href = '/'; 
  });
});

document.addEventListener('DOMContentLoaded', function () {
const logoutButton = document.getElementById('logoutButton');

  logoutButton.addEventListener('click', function () {
      localStorage.removeItem('username');
      window.location.href = '/'; 
  });
});
