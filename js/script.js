let numberOfFilms; 

function start() {
   numberOfFilms = +prompt("How many films have you watched?", ""); 

    while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt("How many films have you watched?", ""); 

    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};
  
function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        let lastFilm = prompt("One of the latest films", ""),
            rating = +prompt("How many point you can give for this film?", "");
    
        if (lastFilm != '' && rating!= '' && lastFilm != null && rating != null && lastFilm.length <= 50) {
            personalMovieDB.movies[lastFilm] = rating;
    
            lastFilm = prompt("One of the latest films", "");
            rating = prompt("How many point you can give for this film?", "");
        } else if (lastFilm.length >= 50) {
            console.log("Error");
            i--; 
        } 
    }  
}

rememberMyFilms();
 
function detectPersonalLevel() {
    let countMovie = personalMovieDB.count;
    
    if (countMovie < 10) {
        console.log("So small count of the watched films" + countMovie);
    } else if (countMovie >= 10 && countMovie < 30) {
        console.log("You a classic watcher");
    } else if (countMovie >= 30) {
        console.log("You are films lover");
    }
}

detectPersonalLevel();

function showMyBD (isPivat) {
    if ( !isPivat) {
        console.log(personalMovieDB);
    }
}

showMyBD(personalMovieDB.privat);

function writeYourGenres() {  
    let i = 0;
    while ( i < 3) {
        personalMovieDB.genres[i - 1] = prompt(`Your favourite genre is number ${i}`, "");
    }
}

writeYourGenres();