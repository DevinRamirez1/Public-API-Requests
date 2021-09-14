//variables
const gallery = document.getElementById('gallery');
const userURL = 'https://randomuser.me/api/?results=12';

//fetch user data fom url
fetch(userURL)
        .then(checkStatus)
        .then(response => response.json())
        .then(response => response.results)
        .then(generateUsersHTML)
        .catch(error => console.log('Server error', error))



//Generate each User's gallery card
function generateUsersHTML(data) {
    data.forEach( (user, index) => {
        gallery.insertAdjacentHTML('beforeend', 
        `<div class="card" data-index=${index}>
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.city}, ${user.state}</p>
            </div>
        </div>` );
    })
}



//check status of fetched API
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}


