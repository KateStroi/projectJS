/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту 

*/

'use strict';

// Возьмите свой код из предыдущей практики 

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
      movies = movieDB.movies,
      formAdd = document.querySelector('.add'),
      formButton = formAdd.querySelector('button'),
      formInput = formAdd.querySelector('.adding__input'),
      checkbox = formAdd.querySelector('[type="checkbox"]');
 
promoAdv.forEach(element => {
    element.remove();
});

poster.style.backgroundImage = 'url("img/bg.jpg")';

ganre.textContent = "драма"; 

let deleteMovie = function()  {
    console.log('delete');
};
 
let setDeleteBtnsListener = () => {
    const deleteBtns = document.querySelectorAll('.delete');

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteMovie);
        console.log(deleteBtn);
    }); 
};

let addMovie = function() { 
    let resultMovie = '';

    moviesList.innerHTML = ""; 
    movies.sort();

    movies.forEach((item, i) => { 
        if (item.length > 5 ) {
            resultMovie += `<li class="promo__interactive-item">${i+1}. ${item.slice(0, 5)}... <div class=\"delete\"></div></li>`; 
        } else { 
            resultMovie += `<li class="promo__interactive-item">${i+1}. ${item} <div class=\"delete\"></div></li>`; 
        }
    }); 

    moviesList.insertAdjacentHTML("afterbegin", resultMovie);
    setDeleteBtnsListener();
};
 
addMovie();

const formValueResult = (e) => {
    let resultValue = String(formInput.value);
    e.preventDefault();

    if (resultValue != "") {
        movies.push(resultValue.toUpperCase()); 
        addMovie();
    } 
};  

formButton.addEventListener('click', formValueResult);

let checkboxProperty = (e) => {
    console.log(e.target);
    console.log(e.type);
    console.log(checkbox.value);
    if (checkbox.checked == true){
        console.log("To do the favourite");
      } else {
        console.log("Delete from the favouretes");
      }
};

checkbox.addEventListener('click', checkboxProperty);