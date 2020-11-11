let numberOfFilms = +prompt('How many films do you whached?', "");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genders: [],
    privat: false,
};



if (personalMovieDB.count >= 20 && personalMovieDB.count < 30) {
    alert("Filmwatcher");
} else if (personalMovieDB.count < 20 ) {
    alert ("Not filmwatcher");
} else {
    alert("Error");
}

let countQuestion = 0;
for( let i=0; i < 2; i++) {

    let a = prompt('Which last of the film did you watch?', ""),
        b = prompt('Please, write rating of this film', "");
    if ( a === "") {
        alert("Non empty, try again");
    } else if ( a == null) { 
        i--;
    } else { 
        personalMovieDB.movies[a] = b;
    }
}
// while (countQuestion <1) {
//     let a = prompt('Which last of the film did you watch?', ""),
//         b = prompt('Please, write rating of this film', "");

//     // switch (a) {
//     //     case "": 
//     //         alert("Non empty, try again");
//     //         break;
//     //     case a.length > 12 || a == null :  
//     //         while (countQuestion <2) {
//     //             alert(a); 
//     //             alert(b); 
//     //             personalMovieDB.movies[a] = b; 
//     //             countQuestion ++;
//     //         }
//     //         break;
//     // }

//     if ( a === "") {
//         alert("Non empty, try again");
//     } else if ( a == null) { 
//         a = prompt('Which last of the film did you watch?', "");
//         b = prompt('Please, write rating of this film', ""); 
//     } else { 
//         personalMovieDB.movies[a] = b; 
//         countQuestion ++;
//     }
// }



console.log(personalMovieDB.movies);

 