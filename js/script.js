const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function() {
        personalMovieDB.count = +prompt("How many films have you watched?", ""); 
     
         while(personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
             personalMovieDB.count = +prompt("How many films have you watched?", "");
         }
     },

    rememberMyFilms: function() {
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
    },
     
    detectPersonalLevel: function() {
        let countMovie = personalMovieDB.count;
        
        if (countMovie < 10) {
            console.log("So small count of the watched films" + countMovie);
        } else if (countMovie >= 10 && countMovie < 30) {
            console.log("You a classic watcher");
        } else if (countMovie >= 30) {
            console.log("You are films lover");
        }
    },
    
    showMyBD: function(isPivat) {
        if ( !isPivat) {
            console.log(personalMovieDB);
        }
    },


    writeYourGenres: function() {   
        for(let i = 0; i <= 2; i++) {
            let genresName = prompt(`Your favourite genre is number ${i + 1}`, "");

            if (genresName != "" && genresName != null) {
                personalMovieDB.genres[i] = genresName;
            } else { 
                genresName = prompt(`Your favourite genre is number ${i + 1}`, ""); 
                personalMovieDB.genres[i] = genresName;
            }
        } 
    },

    toggleVisibleMyBD: function(statePrivate) {
        if(!personalMovieDB.privat) {
            personalMovieDB.privat = true;        
        } else { 
            personalMovieDB.privat = false;
        }
    },

};

// personalMovieDB.start();
// personalMovieDB.rememberMyFilms();
// personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyBD(personalMovieDB.privat);
personalMovieDB.writeYourGenres();
// personalMovieDB.toggleVisibleMyBD();

personalMovieDB.genres.forEach((item, i) => {
    console.log(`Favourite ganre ${i+1} is call ${personalMovieDB.genres[i]}`)
});