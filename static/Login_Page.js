const radioButtons = document.querySelectorAll('input[name="role"]');
const username = document.getElementById('adminname').value;
const password = document.getElementById('password').value;
const hiddenLogin = document.getElementById('Login');
const hiddeUser = document.getElementById('userform')
const userRole = document.getElementById('userRole');
const storedUsername = localStorage.getItem('username');

radioButtons.forEach(function (radio) {
        radio.addEventListener('click', toggleradioButtons);
});

    function toggleradioButtons() {
        const option2 = document.querySelector('input[name="role"][value="admin"]');
        if (option2.checked) {
            hiddenLogin.style.display = 'block';
            hiddeUser.style.display = 'none'
        } else {
            hiddenLogin.style.display = 'none';
            hiddeUser.style.display = 'block'
        }
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

document.getElementById('Login').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('adminname').value;
    const password = document.getElementById('password').value;
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })  
    })
    .then(response => {
        if (response.status === 401) {
            return response.json().then(data => {
                alert(data.message);
            });
        } else if (response.redirected) {
            window.location.href = response.url;
        }
    });
});

hiddeUser.addEventListener('submit', function (event) {
        if (userRole.checked) {
            const username = document.getElementById('username').value;
            localStorage.setItem('username', username);
        }
});

if (storedUsername) {
        window.location.href = '/userPage'; // Change this to the actual user page URL
}