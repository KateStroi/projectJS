/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const promoAdv = document.querySelectorAll('.promo__adv img'), 
      poster = document.querySelector('.promo__bg'),
      ganre = poster.querySelector('.promo__genre'),
      moviesList = document.querySelector('.promo__interactive-list'),
      movies = movieDB.movies;

let  resultMovie = '';

promoAdv.forEach(element => {
    element.remove();
});

poster.style.cssText = 'background-image: url(img/bg.jpg)';

ganre.textContent = "драма"; 

moviesList.innerHTML = "";

movies.sort();

movies.forEach((item, i) => {
    resultMovie += `<li class="promo__interactive-item">${i+1}. ${item} <div class=\"delete\"></div></li>`;
});

moviesList.insertAdjacentHTML ("afterbegin", resultMovie);

console.log(resultMovie);