
const rowContainer = document.querySelector('.row-container');
const movieSelect = document.querySelector('#movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');

populateUI();

let ticketPrice = +movieSelect.value;

// Save slected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row > .selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
};

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
rowContainer.addEventListener('click', e => {

    if(e.target.parentElement.className !== '.seat .occupied') {
        e.target.parentElement.classList.toggle('selected');

        updateSelectedCount();
    }

});

// Initial count and total set
updateSelectedCount()





















// function uploadValues() {
//     const selectedSeats = document.querySelectorAll('.row > .selected');

//     count.innerText = selectedSeats.length;
// }

// function calculatElement() {
//    const price = movieSelect.value;

//    total.innerText = 
// }

// rowContainer.addEventListener('click', e => {

//     if(e.target.parentElement.className !== '.seat .occupied') {
//         e.target.parentElement.classList.toggle('selected');
//     }

//     uploadValues();
// })

// movieSelect.addEventListener('change', calculatElement);


