const searchMeal = document.getElementById("input");
// console.log(searchMeal.value)


function fetchMeal() {
  if (searchMeal.value) {
      let url =
        `https://www.themealdb.com/api/json/v1/1/search.php?s= ${searchMeal.value}`;
      fetch(url)
        .then(res => res.json())
      .then(meals => showMeal(meals.meals));
    document.getElementById("noMeal").style.display = "none";
  } else {
    alert('Please Enter Your Search Item');
        document.getElementById("noMeal").style.display = 'block';
  }

}

function showMeal(meals) {
  // console.log(meal)
  meals.forEach(meal => {
    document.querySelector('.meal-wrapper').innerHTML += `
  <div class="meal-box">
  <img src=${meal.strMealThumb} alt=${meal.strMeal}>
 <div class="div-2">
  <h3 class="heading"> ${meal.strMeal} </h3>
  <p> ${meal.strInstructions.slice(0, 100)}... </p>
  <p><span> ${meal.strArea} </span>  <span> ${meal.strCategory}</span></p>
  <div class="div-3">
    <a href=${meal.strYoutube} target =" _blank" class="btn">Watch</a>
    <button class="btn-1" onclick="lookUpDeatails('${meal.idMeal}')">View Recipe</button>
  </div>
 </div>
</div>
  
  
    `;
})
}

function lookUpDeatails(id) {
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then(res => res.json())
    .then(meals => showId(meals.meals[0]));
}

function showId(meal) {
  console.log(meal)
  const details = document.getElementById('details');
  details.classList.add('visible');
  details.classList.remove('invisible');

  details.innerHTML = `
    <div class="bg-white w-64 p-6 rounded shadow-lg w-[70%] h-[600px]">
        <h2 class="text-xl font-bold mb-4"> ${meal.strMeal} </h2>
        <p class="mb-4 text-black font-medium"> ${meal.strInstructions}</p>
        <a href= ${meal.strYoutube}
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
         watch
        </a>
        <button class="btn" onclick= " coseBtn() "> close </button>
      </div>
  
  
  `;
}

function coseBtn() {
    details.classList.add('invisible');
    details.classList.remove('visible');
}


const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', () => {
  fetchMeal();
})

