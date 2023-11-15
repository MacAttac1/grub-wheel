'use strict';

const btnAddIngredient = document.querySelector('.btn-add-ingredient');

const ingredientsDiv = document.querySelector('.ingredients');

let categoryOptionsHTML = '';
ingredientCategories.forEach(function (cat) {
  categoryOptionsHTML += `
  <option>${cat.name}</option>
  `;
});

btnAddIngredient?.addEventListener('click', function () {
  const addIngredientHTML = `
  <h2>Lägg till ny ingrediens</h2>
  <div class="add-new-ingredient-modal">
  <form action="">
  <input type="text" name="inpNewIngredientName" id="inpNewIngredientName" placeholder="Namn" />
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
    </div>
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

    if (inputNewIngredientName.value !== '') {
      const ingredient = new Ingredient(
        inputNewIngredientName.value,
        inputNewIngredientCategory.value
      );
      ingredients.push(ingredient);
      createIngredient(client, ingredient);
      toggleModal();
      displayIngredients();
    } else {
      alert('Du måste fylla i ett namn');
    }
  });
});

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
    let html = `
    <div class="ingredients-${cat.name}">
      <div class="ingredients-list-category-header"> 
        <h2>${cat.displayName}</h2>
      </div>
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
      .filter(ing => ing.category === cat.name)
      .sort((a, b) => a.name.localeCompare(b.name, 'sv'));

    const activeCategory = document.querySelector(`.ingredients-${cat.name}`);

    console.log(ingredientsByCategory);

    ingredientsByCategory.forEach(function (ingredient, i) {
      const html = `
      <div class="list-item">
      <div class="list-item-main">
      <img src="${ingredient.image}" />
      <p class="list-item-title">${ingredient.name}</p>
      <button value="${ingredient.ID}" class="btn btn-info"><i class="fa-solid fa-circle-info"></i></button>
      </div>
      <div class="list-item-side-right">
      <button value="${ingredient.ID}" class="btn btn-edit-ingredient"><i class="fa-solid fa-pencil"></i></button>
      <button value="${ingredient.ID}" class="btn btn-delete-ingredient"><i class="fa-regular fa-trash-can"></i></button>
      </div>
      </div>
      `;
      activeCategory.insertAdjacentHTML('beforeend', html);
    });
  });
};

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
    <h2>Editera ingrediens</h2>
    <div class="edit-ingredient-modal">
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
      </div>
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
    if (confirm('Vill du verkligen ta bort?')) {
      ingredients.splice(index, 1);
    }
    displayIngredients();
  }
});

displayIngredients();
