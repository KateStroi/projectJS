let numberOfFilms = +prompt('How many films do you whached?', "");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genders: [],
    privat: false,
};

let a = prompt('Which last of the film did you watch?', ""),
    b = prompt('Please, write rating of this film', "1-5"),
    c = prompt('Which last of the film did you watch?', ""),
    d = prompt('Please, write rating of this film', "1-5");



personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;
console.log(personalMovieDB.movies);

 