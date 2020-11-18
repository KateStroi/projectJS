let numberOfFilms;

function start() {
    numberOfFilms = +prompt('How many films do you whached?', "");

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('How many films do you whached?', "");
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: true,
}; 

if (personalMovieDB.count >= 20 && personalMovieDB.count < 30) {
    alert("Filmwatcher");
} else if (personalMovieDB.count < 20 ) {
    alert ("Not filmwatcher");
} else {
    alert("Error");
}
 

function detectPersonalLevel() { 
    if ( personalMovieDB.count < 10) {
        console.log("Watched not a lot of films");
    } else if ( personalMovieDB.count >=10 && personalMovieDB.count< 30) { 
        console.log("You are classical watcher");
    } else if (personalMovieDB.count >=30) { 
        console.log("You are filmwatcher");
    } else {
        console.log("Something went wrong!");
    }
}

detectPersonalLevel();

//console.log(personalMovieDB); 

function showMyDB(hidden) {
    if (!hidden) {
        console.log(personalMovieDB);
    } 
} 

showMyDB(personalMovieDB.privat);

function writeYourGenres() { 
    for (let i = 1; i <= 3; i++) { 
        personalMovieDB.genres[i - 1] = prompt(`Your favourite genre on the number ${i}`);
    }
 
    
}
writeYourGenres();