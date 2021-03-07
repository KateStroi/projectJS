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
 
document.addEventListener('DOMContentLoaded', () => {
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


             
    const formValueResult = (e) => {
        e.preventDefault();

        let newFilm = String(formInput.value);
        const favourite = checkbox.checked;
    
        if (newFilm) {
            if (newFilm.length > 5) {
                newFilm = `${newFilm.substring(0, 3)}...`;
            }

            if (favourite) {
                console.log("Add favourite film");
            }

            movies.push(newFilm.toUpperCase());
            sortArr(movieDB.movies);  
            createMovieList(movieDB.movies, moviesList);
        } 
        
        //e.target.reset();
    }; 

    const deleteAdv = (arr) => { 
        arr.forEach(element => {
            element.remove();
        });
    };

    const makeChanges = () => {
        poster.style.backgroundImage = 'url("img/bg.jpg")';
        
        ganre.textContent = "драма"; 
    };

    const sortArr = (arr) => {
        arr.sort();
    }; 
     
    let deleteBtnsListener = () => {
        const deleteBtns = document.querySelectorAll('.delete');
    
        deleteBtns.forEach((deleteBtn, i) => {
            deleteBtn.addEventListener('click', () => {
                deleteBtn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(movieDB.movies, moviesList);
            });
        }); 
    };
    
     function createMovieList(films, parent) {      
        parent.innerHTML = "";  
        sortArr(films);
        
        films.forEach((item, i) => { 
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1}. ${item} 
                    <div class=\"delete\"></div>
                </li>
            `; 
        });  

        deleteBtnsListener();
    } 
    
    let checkboxProperty = (e) => {
        if (checkbox.checked == true){
            console.log("To do the favourite");
          } else {
            console.log("Delete from the favouretes");
          }
    };
    
    deleteAdv(promoAdv);
    makeChanges();
    checkbox.addEventListener('click', checkboxProperty);
    formButton.addEventListener('click', formValueResult);
    createMovieList(movieDB.movies, moviesList);
});