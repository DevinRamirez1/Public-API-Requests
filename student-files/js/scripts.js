//variables
const gallery = document.getElementById('gallery');
const userURL = 'https://randomuser.me/api/?results=12';
let currentIndex = 0;
let users = []
let data

//fetch user data fom url
fetch(userURL)
        .then(checkStatus)
        .then(response => response.json())
        .then(response => response.results)
        .then(generateUsersHTML)
        .catch(error => console.log('Server error', error))



//Generate each User's gallery card
function generateUsersHTML(data) {
    users = data;
    users.forEach( (user, index) => {
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

//generate modal box html
function generateModalBoxHTML(index) {
    const {name, email, location, phone, dob, picture} = users[index];
    
    gallery.insertAdjacentHTML("afterend", 
        `<div class="modal-container">
                 <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${location.city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${location.street}, ${location.city}, ${location.state} ${location.postcode}</p>
                        <p class="modal-text">Birthday: ${dob}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`);

//event listener to close the modal box
const modalClose = document.getElementById('modal-close-btn');
modalClose.addEventListener('click', () => {
    document.body.removeChild(document.body.lastElementChild);
})


//modal variables
const modalButtons = document.querySelector('.modal-btn-container');
const modalNext = document.getElementById('modal-next');
const modalPrev = document.getElementById('modal-prev');

//event listener for next and prev buttons to switch between employees
modalButtons.addEventListener('click', e => {

    if (e.target === modalNext && currentIndex < users.length - 1){
        currentIndex++
    } else if (e.target === modalNext && currentIndex === users.length - 1){
        currentIndex = 0
    } else if (e.target === modalPrev && currentIndex > 0){
        currentIndex--
    } else if (e.target === modalPrev && currentIndex === 0){
        currentIndex = users.length - 1
    }
    document.body.removeChild(document.body.lastElementChild);
    generateModalBoxHTML(currentIndex);
})
}

//event listener to generate modal boxes
gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    currentIndex = index
    generateModalBoxHTML(currentIndex);

})
