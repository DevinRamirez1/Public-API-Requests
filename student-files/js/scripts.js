//variables
const gallery = document.getElementById('gallery');
const userURL = 'https://randomuser.me/api/?results=12';
let data
let users = []
let currentIndex = 0;
let filteredUsers = "";
const searchContainer = document.querySelector('.search-container');

//fetch user data fom url
fetch(userURL)
        .then(checkStatus)
        .then(response => response.json())
        .then(response => {
            response.results.map(user => {
                users.push(user);
                generateUsersHTML(users);
            })
        })
        .catch(error => console.log('Server error', error))



//Generate each User's gallery card
function generateUsersHTML(users) {
    gallery.innerHTML = "";
    users.forEach( (user, index) => {
        gallery.insertAdjacentHTML('beforeend', 
        `<div class="card" data-index=${index}>
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
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

//format birthday
function formatDOB(dob) {
    const year = dob.substring(0,4);
    const month = dob.substring(5,7)
    const day = dob.substring(8,10);

    return `${month}/${day}/${year}`;
}

//generate modal box html
function generateModalBoxHTML(index) {
    const {name, email, location, cell, dob, picture} = users[index];
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
                        <p class="modal-text">${cell}</p>
                        <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
                        <p class="modal-text">Birthday: ${formatDOB(dob.date)}</p>
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
    document.querySelector('.modal-container').remove();
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
    document.querySelector('.modal-container').remove();
    generateModalBoxHTML(currentIndex);
})
}

//generate search bar html
function generateSearchHTML() {
    searchContainer.insertAdjacentHTML('beforeend', 
        `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`)

 

}

generateSearchHTML();

const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-submit');


//search event listener
searchContainer.addEventListener('keyup', () => {
    let searchText = searchField.value.toUpperCase();
        searchBtn.onclick = () => {
        searchField.value = '';
   }
//
const filteredList = users.filter(student => {
    return (
       student.name.first.toUpperCase().includes(searchText) ||
       student.name.last.toUpperCase().includes(searchText)
    );
 });
    filteredUsers = filteredList
    generateUsersHTML(filteredUsers);
//
})

//event listener to generate modal boxes
gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    currentIndex = index
    generateModalBoxHTML(currentIndex);

})
