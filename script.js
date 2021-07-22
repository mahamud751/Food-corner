const buttonSearch = document.getElementById('button-search');
const mealL = document.getElementById('meal');
const closeBtn = document.getElementById('close-btn');
const foodDetails = document.querySelector('.food-details');

buttonSearch.addEventListener('click', getMealL);
mealL.addEventListener('click', getMR);
closeBtn.addEventListener('click', () => {
    foodDetails.parentElement.classList.remove('showFood');
});


function getMealL() {
    let searchInput = document.getElementById('input-search').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            let html = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    
                    <div class="meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}" alt="food">
                                </div>
                                <div class="meal-name">
                                    <h3>${meal.strMeal}</h3>
                                    <a href="#" class="recipe-btn">Get Recipe</a>
                                </div> 
                    </div> 
                    </div>     
                `;
                });
                mealL.classList.remove('notFound');
            } else {
                mealL.classList.add('notFound');
                html = "sorry";
            }
            mealL.innerHTML = html;
        });

}

function getMR(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealI = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealI.dataset.id}`)
            .then(response => response.json())
            .then(data => sc(data.meals))
    }
}
function sc(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class = "title">${meal.strMeal}</h2>
          <p >${meal.strCategory}</p>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class = "food-img">
            <img src = "${meal.strMealThumb}" alt = "">
          </div>   
    `;
    foodDetails.innerHTML = html;
    foodDetails.parentElement.classList.add('showFood');
}
