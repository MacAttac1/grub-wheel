'use strict';

// MODAL
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');
const modalContentDiv = document.querySelector('.modal-content');

////////////////////////////////////////////////

const inputName = document.getElementById('inpName');
const inputUnit = document.getElementById('inpUnit');
const btnCreateNew = document.getElementById('btnCreateNew');
const mineralsDiv = document.querySelector('.minerals');
const ingredientsDiv = document.querySelector('.ingredients');
const btnToggleAdd = document.querySelector('.btn-toggle-add-mineral');
const btnAddIngredient = document.querySelector('.btn-add-ingredient');
const createNewMineralDiv = document.querySelector('.create-new-mineral');
let btnInfoMineral;
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
  },
  {
    name: 'Banan',
    category: 'fruitAndVeg',
  },
  {
    name: 'Paprika, röd',
    category: 'fruitAndVeg',
  },
  {
    name: 'Mjölk',
    category: 'dairy',
  },
  {
    name: 'Yoghurt',
    category: 'dairy',
  },
  {
    name: 'Creme Fraiche',
    category: 'dairy',
  },
  {
    name: 'Bröd',
    category: 'skafferi',
  },
];

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

  constructor(name, category) {
    this.name = name;
    this.category = category;
  }
}

// Create new mineral
btnCreateNew.addEventListener('click', function (event) {
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

closeModalBtn.addEventListener('click', toggleModal);

overlay.addEventListener('click', toggleModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden'))
    toggleModal();
});

btnToggleAdd.addEventListener('click', () =>
  createNewMineralDiv.classList.toggle('hidden')
);

let categoryOptionsHTML = '';
ingredientCategories.forEach(function (cat) {
  categoryOptionsHTML += `
  <option>${cat}</option>
  `;
});
btnAddIngredient.addEventListener('click', function () {
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

ingredientsDiv.addEventListener('click', function (e) {
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

// TEMPORARY ID GENERATOR

const generateIngredientID = function () {
  ingredients.map(function (ing, i) {
    ing.ID = String(
      Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000)
    ).padStart(6, '0');
  });
};

generateIngredientID();

//////////////////////////

displayMinerals();
displayIngredients();
