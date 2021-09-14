
//fetch user data fom url
function fetchUserData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('Server error', error))
        .then(data => console.log(data))
}
Promise.all([
    fetchUserData('https://randomuser.me/api/?results=12')
])
.then(data => {
    

})

//Generate each User's gallery card
function generateUsersHTML(data) {
    data.map( person => {
        const gallery = document.getElementById('gallery');
        if (person.type == 'standard') {
            gallery.innerHTML = 
            `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">first last</h3>
                <p class="card-text">email</p>
                <p class="card-text cap">city, state</p>
            </div>
        </div>`
        }
    })
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}



