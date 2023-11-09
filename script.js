'use strict';

////////////////////////////////////////////////

// SETTING VARIABLES

let oldDateThreshhold = 90;

// JSON

const getData = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const nutr = getData('./nutrients.json');
// console.log(nutr);

// const setData = async function (url = '', data = {}) {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// };

// HTML ELEMENTS

// BUTTONS
const btnCreateNew = document.getElementById('btnCreateNew');
const btnToggleAdd = document.querySelector('.btn-toggle-add-mineral');
const btnAddIngredient = document.querySelector('.btn-add-ingredient');
const closeModalBtn = document.querySelector('.close-modal');

// INPUTS
const inputName = document.getElementById('inpName');
const inputUnit = document.getElementById('inpUnit');

// DIVS
const mineralsDiv = document.querySelector('.minerals');
const ingredientsDiv = document.querySelector('.ingredients');
const createNewMineralDiv = document.querySelector('.create-new-mineral');
const modalContentDiv = document.querySelector('.modal-content');
const shoppingListDiv = document.querySelector('.shopping-list');

// MODAL
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

let btnInfoMineral; // TODO: refaktorera bort dessa med samma metod som ingredienslistan
let btnEditMineral;
let btnDeleteMineral;

let minerals = [
  {
    name: 'Kalcium',
    unit: 'mg',
    info: 'Dairy products, eggs, canned fish with bones (salmon, sardines), green leafy vegetables, nuts, seeds, tofu, thyme, oregano, dill, cinnamon.',
    category: 'mineral',
  },
  {
    name: 'Zinc',
    unit: 'mg',
    info: 'Oysters*, red meat, poultry, nuts, whole grains, dairy products',
    category: 'mineral',
  },
  {
    name: 'Iron',
    unit: 'mg',
    info: 'Meat, seafood, nuts, beans, dark chocolate',
    category: 'mineral',
  },
];

let ingredients = [
  {
    name: 'Paprika, grön',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Banan',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Paprika, röd',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Mjölk',
    category: 'dairy',
    addedToListDates: [],
  },
  {
    name: 'Yoghurt',
    category: 'dairy',
    addedToListDates: [],
  },
  {
    name: 'Creme Fraiche',
    category: 'dairy',
    addedToListDates: [],
  },
  {
    name: 'Bröd',
    category: 'skafferi',
    addedToListDates: [],
  },
  {
    name: 'Gurka',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Morötter',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Clementin',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Äpple',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Vitkål',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Grape',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Päron',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Ananas',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
  {
    name: 'Gul lök',
    category: 'fruitAndVeg',
    addedToListDates: [],
  },
];

let shoppingList = [];

let ingredientCategories = ['fruitAndVeg', 'dairy', 'skafferi'];

// CLASSES

class Mineral {
  category = 'Mineral';
  info = '';

  constructor(name, unit) {
    this.name = name;
    this.unit = unit;
  }
}

class Ingredient {
  ID = String(
    Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000)
  ).padStart(6, '0');
  category = '';
  addedToListDates = [];

  constructor(name, category) {
    this.name = name;
    this.category = category;
  }
}

class ShoppingListItem {
  amount = 10;
  amountUnit = 'st';

  constructor(ingredient) {
    this.ingredient = ingredient;
  }
}

// Create new mineral
btnCreateNew?.addEventListener('click', function (event) {
  event.preventDefault();

  const mineral = new Mineral(inputName.value, inputUnit.value);
  minerals.push(mineral);

  inputName.value = '';
  inputUnit.value = '';

  inputName.focus();

  createNewMineralDiv.classList.toggle('hidden');

  displayMinerals();
});

// const displayIngredients = function () {
//   ingredientsDiv.innerHTML = '';

//   ingredients = ingredients.sort((a, b) => b.name.localeCompare(a.name));

//   const ingredientsFruitAndVeg = ingredients.filter(
//     ing => ing.category === 'fruitAndVeg'
//   );
//   ingredientsFruitAndVeg.forEach(function (ingredient, i) {
//     const html = `
//       <div class="ingredient">
//         <div class="ingredient-main">
//           <p class="ingredient-title">${ingredient.name}</p>
//           <button value="${i}" class="btn btn-ingredient-info"><i class="fa-solid fa-circle-info"></i></button>
//         </div>
//         <div class="ingredient-side-right">
//           <button value="${i}" class="btn btn-edit-ingredient"><i class="fa-solid fa-pencil"></i></button>
//           <button value="${i}" class="btn btn-delete-ingredient"><i class="fa-regular fa-trash-can"></i></button>
//         </div>
//       </div>
//     `;

//     ingredientsDiv.insertAdjacentHTML('afterbegin', html);
//   });
// };

const displayIngredients = function () {
  ingredientsDiv.innerHTML = '';

  // console.log(ingredientsByCategory);

  // Create a div for all items in a category

  // ingredientCategoryDiv.classList.add(`ingredients-${cat}`);

  // ingredientsByCategory.forEach(function (ingredient, i) {
  //   let ingredientDiv = document.createElement('div');
  //   ingredientDiv.innerHTML = `<p>${ingredient.name}</p>`;
  //   console.log(ingredientDiv);
  //   ingredientCategoryDiv.appendChild(ingredientDiv);
  // });
  //   console.log(ingredientCategoryDiv);
  // ingredientsDiv.appendChild(ingredientCategoryDiv);
  // ingredientCategoryDiv.classList.remove(`ingredients-${cat}`);

  // Loop over each category
  ingredientCategories.forEach(function (cat, i) {
    let html = `<div class="ingredients-${cat}">
    <h3>${cat}</h3>
    </div>
    `;
    // Empty the content of the ingredient categoty div
    // ingredientCategoryDiv.innerHTML = '';
    // Filter the ingredients array by category

    ingredientsDiv.insertAdjacentHTML('beforeend', html);
  });

  let ingredientsByCategory = [];

  ingredientCategories.forEach(function (cat, i) {
    ingredientsByCategory = ingredients
      .filter(ing => ing.category === cat)
      .sort((a, b) => a.name.localeCompare(b.name));

    const activeCategory = document.querySelector(`.ingredients-${cat}`);

    ingredientsByCategory.forEach(function (ingredient, i) {
      const html = `
      <div class="ingredient">
        <div class="ingredient-main">
          <p class="ingredient-title">${ingredient.name}</p>
          <button value="${ingredient.ID}" class="btn btn-info"><i class="fa-solid fa-circle-info"></i></button>
        </div>
        <div class="ingredient-side-right">
          <button value="${ingredient.ID}" class="btn btn-edit-ingredient"><i class="fa-solid fa-pencil"></i></button>
          <button value="${ingredient.ID}" class="btn btn-delete-ingredient"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
      `;
      activeCategory.insertAdjacentHTML('beforeend', html);
    });
  });
};

const displayMinerals = function () {
  // Sort the minerals array
  minerals = minerals.sort((a, b) => b.name.localeCompare(a.name));

  // Clear all minerals
  mineralsDiv.innerHTML = '';

  // Generate one div + content for all minerals in array
  minerals.forEach(function (mineral, i) {
    const html = `
      <div class="mineral">
        <div class="mineral-main">
          <p class="mineral-title">${mineral.name}<span class="text-muted"> (${mineral.unit})</span></p>
          <button value="${i}" class="btn btn-info"><i class="fa-solid fa-circle-info"></i></button>
        </div>
        <div class="mineral-side-right">
          <button value="${i}" class="btn btn-edit-mineral"><i class="fa-solid fa-pencil"></i></button>
          <button value="${i}" class="btn btn-delete-mineral"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    `;

    mineralsDiv.insertAdjacentHTML('afterbegin', html);
  });

  // Re-assign all buttons in mineral div
  btnInfoMineral = document.querySelectorAll('.btn-info');
  btnEditMineral = document.querySelectorAll('.btn-edit-mineral');
  btnDeleteMineral = document.querySelectorAll('.btn-delete-mineral');

  // Mineral Information (MODAL)
  btnInfoMineral.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const i = btn.value;

      const html = `
      <h1>${minerals[i].name}</h1>
      <h3>Information</h3>
      <p>${minerals[i].info}</p>
      `;

      toggleModal(html);
    });
  });

  // Edit Mineral (MODAL)
  btnEditMineral.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const i = btn.value;

      const html = `
      <h1>Edit Mineral</h1>
      <form action="">
      <input type="text" name="inpEditName" id="inpEditName" placeholder="Name" />
      <input type="text" name="inpEditUnit" id="inpEditUnit" placeholder="Unit" />
      <textarea type="text" rows="4" name="inpEditInfo" id="inpEditInfo" placeholder="Information"></textarea>
      <input
          type="submit"
          value="Save Changes"
          name=""
          class="btn-save-changes"
        />
        </form>
        `;

      toggleModal(html);

      const inputEditName = document.querySelector('#inpEditName');
      inputEditName.value = minerals[i].name;
      const inputEditUnit = document.querySelector('#inpEditUnit');
      inputEditUnit.value = minerals[i].unit;
      const inputEditInfo = document.querySelector('#inpEditInfo');
      inputEditInfo.value = minerals[i].info;

      const btnSaveChanges = document.querySelector('.btn-save-changes');
      btnSaveChanges.addEventListener('click', function (event) {
        event.preventDefault();
        minerals[i].name = inputEditName.value;
        minerals[i].unit = inputEditUnit.value;
        minerals[i].info = inputEditInfo.value;
        displayMinerals();
        toggleModal();
      });
    });
  });

  // Delete mineral
  btnDeleteMineral.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (confirm('Are you sure about this?')) {
        minerals.splice(btn.value, 1);
      }
      displayMinerals();
    });
  });
};

const toggleModal = function (html) {
  modalContentDiv.innerHTML = '';

  if (html) modalContentDiv.insertAdjacentHTML('afterbegin', html);

  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

closeModalBtn?.addEventListener('click', toggleModal);

overlay?.addEventListener('click', toggleModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden'))
    toggleModal();
});

btnToggleAdd?.addEventListener('click', () =>
  createNewMineralDiv.classList.toggle('hidden')
);

let categoryOptionsHTML = '';
ingredientCategories.forEach(function (cat) {
  categoryOptionsHTML += `
  <option>${cat}</option>
  `;
});
btnAddIngredient?.addEventListener('click', function () {
  const addIngredientHTML = `
  <h1>Add Ingredient</h1>
  <form action="">
  <input type="text" name="inpNewIngredientName" id="inpNewIngredientName" placeholder="Name" />
  <select
              id="ingredientCategorySelect"
              name="ingredientCategorySelect">
              ${categoryOptionsHTML}
            </select>
  <input
      type="submit"
      value="Save"
      name=""
      class="btn-save-new-ingredient"
    />
    </form>
    `;

  toggleModal(addIngredientHTML);

  const btnSaveNewIngredient = document.querySelector(
    '.btn-save-new-ingredient'
  );
  const inputNewIngredientName = document.getElementById(
    'inpNewIngredientName'
  );
  const inputNewIngredientCategory = document.getElementById(
    'ingredientCategorySelect'
  );
  btnSaveNewIngredient.addEventListener('click', function (e) {
    e.preventDefault();
    const ingredient = new Ingredient(
      inputNewIngredientName.value,
      inputNewIngredientCategory.value
    );
    ingredients.push(ingredient);
    toggleModal();
    displayIngredients();
  });
});

ingredientsDiv?.addEventListener('click', function (e) {
  const clicked = e.target.closest('.btn');

  // Guard clause
  if (!clicked) return;

  let index;
  ingredients.forEach((ing, i) => {
    if (ing.ID === clicked.value) {
      index = i;
    }
  });

  // Edit ingredient
  if (clicked.classList.contains('btn-edit-ingredient')) {
    const html = `
    <h1>Edit Ingredient</h1>
      <form action="">
      <input type="text" name="inpEditName" id="inpEditName" placeholder="Name" />
      <select
      id="selectEditCategory"
      name="selectEditCategory">
      ${categoryOptionsHTML}
      </select>
      
      <input
      type="submit"
      value="Save Changes"
      name=""
      class="btn-save-changes"
      />
      </form>
      `;

    toggleModal(html);

    const inputEditName = document.querySelector('#inpEditName');
    inputEditName.value = ingredients[index].name;
    const inputEditUnit = document.querySelector('#selectEditCategory');
    inputEditUnit.value = ingredients[index].category;

    const btnSaveChanges = document.querySelector('.btn-save-changes');
    btnSaveChanges.addEventListener('click', function (event) {
      event.preventDefault();
      ingredients[index].name = inputEditName.value;
      ingredients[index].category = inputEditUnit.value;

      displayIngredients();
      toggleModal();
    });
  }

  // Delete ingredient
  if (clicked.classList.contains('btn-delete-ingredient')) {
    if (confirm('Are you sure about this?')) {
      ingredients.splice(index, 1);
    }
    displayIngredients();
  }
});

// SHOPPING LIST

// DISPLAY SHOPPING LIST
const displayShoppingList = function () {
  shoppingListDiv.innerHTML = '';

  ingredientCategories.forEach(function (cat) {
    let categoryHTML = `
    <div class="shopping-list-${cat}">
      <div class="shopping-list-category-header">  
        <h2>${cat}</h2>
        <button class="btn btn-add-${cat}" value="${cat}"><i class="fa-solid fa-circle-plus"></i></button>
      </div>
    
    `;

    const shoppingListCurrentCategory = shoppingList.filter(
      item => item.ingredient.category === cat
    );

    shoppingListCurrentCategory.forEach(function (item) {
      categoryHTML += `
      <div class="shopping-list-item">
      <div class="shopping-list-item-main">
      <div class="checkbox">
      <input
              type="checkbox"
              class="btn btn-check-shopping-list-item"
              name="Check"
              value="${item.ingredient.ID}" />
      </div>
        <p class="shopping-list-item-title">${
          item.ingredient.name
        }<span class="text-muted"> ${
        item.amount > 0 ? '(' + item.amount + item.amountUnit + ')' : ''
      }</span></p>
        
      </div>
    <div class="shopping-list-item-side-right">
      <button value="${
        item.ingredient.ID
      }" class="btn btn-edit-shopping-list-item"><i class="fa-solid fa-pencil"></i></button>
      <button value="${
        item.ingredient.ID
      }" class="btn btn-delete-shopping-list-item"><i class="fa-regular fa-trash-can"></i></button>
    </div>
      </div>`;
    });

    categoryHTML += `</div>`;

    shoppingListDiv.insertAdjacentHTML('beforeend', categoryHTML);
  });
};

displayShoppingList();

// SHOPPING LIST EVENTLISTENER DELEGATION
shoppingListDiv.addEventListener('click', function (e) {
  const clicked = e.target.closest('.btn');

  let index;
  shoppingList.forEach((ing, i) => {
    if (ing.ingredient.ID === clicked.value) {
      index = i;
    }
  });

  // Guard clause
  if (!clicked) return;

  console.log(clicked.value);

  // ADD (Modal) ingredient to shopping list
  if (clicked.classList.contains(`btn-add-${clicked.value}`)) {
    // Extract clicked category from class list
    let category = clicked.classList.value.split('-');
    category = category[category.length - 1];
    let html = '';
    // Modal heading
    html += `
    <h2>Top ${category}</h2>
    `;

    html += `
    
    <div class="add-ingredients-list top-ingredients">
    `;

    // Create a new array of ingredients for clicked category
    let ingredientsByCategory = ingredients.filter(function (ing) {
      return ing.category === category;
    });

    // Copy the array above, sort by most dates, filter out top X, sort again by name
    let topIngredients = ingredientsByCategory
      .slice()
      .sort((a, b) => b.addedToListDates.length - a.addedToListDates.length)
      .filter((ing, i) => {
        if (i < 5) {
          return ing;
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    // Generate HTML for top ingredients
    topIngredients.forEach(function (ing) {
      html += `
      <div class="ingredient-to-list" id="${ing.ID}" >${ing.name} (${ing.addedToListDates.length})</div>
      `;
    });

    // Generate new heading and div for all ingredients in category
    html += `
    <h2>All ${category}</h2>
    <div class="add-ingredients-list all-ingredients">
    `;

    // Sort all ingredients in category by name
    ingredientsByCategory = ingredientsByCategory.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Generate HTML for all ingredients
    ingredientsByCategory.forEach(function (ing) {
      html += `
      <div class="ingredient-to-list" id="${ing.ID}" >${ing.name} (${ing.addedToListDates.length})</div>
      `;
    });

    // Add closing div to entire modal HTML
    html += '</div>';

    // Render the modal with all HTML
    toggleModal(html);

    const addIngredientsList = document.querySelector('.add-ingredients-list');
    addIngredientsList.addEventListener('click', function (e) {
      const clicked = e.target.closest('.ingredient-to-list');

      let clickedIngredient = ingredients.filter(ing => ing.ID === clicked.id);

      const newShoppingListItem = new ShoppingListItem(...clickedIngredient);
      shoppingList.push(newShoppingListItem);

      clicked.classList.add('text-muted');

      displayShoppingList();
    });
  }

  // CHECK (and clear) ingredient in shopping list
  if (clicked.classList.contains(`btn-check-shopping-list-item`)) {
    console.log('check');
    setTimeout(function () {
      shoppingList.splice(index, 1);
      displayShoppingList();
    }, 1000);
  }

  // DELETE ingredient from shopping list
  if (clicked.classList.contains(`btn-delete-shopping-list-item`)) {
    console.log('delete');
    shoppingList.splice(index, 1);
    displayShoppingList();
  }
});

///// GLOBAL FUNCTIONS

// Remove all dates older than X days (setting variable) from a dates array on an object
const removeOldDates = function (arr) {
  // Must be array of objects

  // Loop over the array of objects
  arr.forEach(function (obj) {
    // Filter out dates older than global setting
    obj.addedToListDates = obj.addedToListDates.filter(function (date) {
      const currentDate = new Date().getTime();
      const daysSinceDate = Math.round(
        (currentDate - new Date(date).getTime()) / (24 * 60 * 60 * 1000)
      );
      if (daysSinceDate < oldDateThreshhold) {
        return date;
      }
    });
  });
  return arr;
};

// TEMPORARY FUNCTIONS ////////////////////////////////////////

// Ingredient ID:s
const generateIngredientID = function () {
  ingredients.map(function (ing, i) {
    ing.ID = String(
      Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000)
    ).padStart(6, '0');
  });
};

generateIngredientID();

// Ingredient added to list dates
function getRandomDateWithinLastSixMonths() {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 12);

  const randomTime =
    Math.random() * (currentDate.getTime() - sixMonthsAgo.getTime()) +
    sixMonthsAgo.getTime();
  const randomDate = new Date(randomTime);

  return randomDate;
}

const generateNumberOfRandomDates = function () {
  ingredients.forEach(function (ing) {
    const dateArray = [];
    for (let index = 0; index < Math.floor(Math.random() * 20 + 5); index++) {
      const date = getRandomDateWithinLastSixMonths();
      dateArray.push(date.toISOString());
    }
    ing.addedToListDates = dateArray;
  });
};

generateNumberOfRandomDates();

//////////////////////////

// displayMinerals();
// displayIngredients();

// ingredients = ingredients.sort(
//   (a, b) => b.addedToListDates.length - a.addedToListDates.length
// );

console.log(ingredients);
// removeOldDates(ingredients);
