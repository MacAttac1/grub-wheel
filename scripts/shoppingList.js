'use strict';

// SHOPPING LIST

// DISPLAY SHOPPING LIST
const displayShoppingList = function () {
  shoppingListDiv.innerHTML = '';

  ingredientCategories.forEach(function (cat) {
    let categoryHTML = `
    <div class="shopping-list-${cat.name}">
      <div class="shopping-list-category-header">  
        <h2>${cat.displayName}</h2>
        <button class="btn btn-add-${cat.name}" value="${cat.name}"><i class="fa-solid fa-circle-plus"></i></button>
      </div>
    
    `;

    // <img src="${item.ingredient.image}" />

    const shoppingListCurrentCategory = shoppingList.filter(
      item => item.ingredient.category === cat.name
    );

    shoppingListCurrentCategory.forEach(function (item) {
      categoryHTML += `
      <div class="list-item">
      <div class="list-item-main">
      <div class="checkbox">
        <input
        type="checkbox"
        class="btn btn-check-shopping-list-item"
        name="Check"
        value="${item.ingredient.ID}"
        style ="background:url(${item.ingredient.image})" />
      </div>
        <p class="list-item-title">${
          item.ingredient.name
        }<span class="text-muted"> ${
        item.amount > 0 ? '(' + item.amount + item.amountUnit + ')' : ''
      }</span></p>
        
      </div>
    <div class="list-item-side-right">
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

  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  let indexShoppingList;
  shoppingList.forEach((ing, i) => {
    if (ing.ingredient.ID === clicked.value) {
      indexShoppingList = i;
    }
  });

  let indexIngredientsList;
  ingredients.forEach(function (ing, i) {
    if (ing.ID === clicked.value) {
      indexIngredientsList = i;
    }
  });

  // console.log('Shopping List Index:', indexShoppingList);
  // console.log('Ingredient List Index:', indexIngredientsList);

  ///// ADD TO SHOPPING LIST (Modal) -------------------

  if (clicked.classList.contains(`btn-add-${clicked.value}`)) {
    // Extract clicked category from class list
    let category = clicked.classList.value.split('-');
    category = category[category.length - 1];
    let html = '';

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
      .sort((a, b) => a.name.localeCompare(b.name, 'sv'));

    // Sort all ingredients in category by name
    ingredientsByCategory = ingredientsByCategory.sort((a, b) =>
      a.name.localeCompare(b.name, 'sv')
    );

    // Heading and div for top ingredients
    html = `
    <h2>Mest köpta</h2>
    <div class="add-ingredients-list">
      <div class="top-ingredients">
      </div>
      <h2>Alla</h2>
      <form action="">
    <div class="add-ingredient-filter">
        <input type="text" id="filter-add-to-shopping-list" placeholder="Sök..." />
        <button id="btnClearFilter"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </form>
      <div class="all-ingredients">
      </div>
    </div>
    `;

    toggleModal(html);

    // Grab modal elements and add ingredients to lists
    const topIngredientsDiv = document.querySelector('.top-ingredients');
    const allIngredientsDiv = document.querySelector('.all-ingredients');

    displayIngredientsToAdd(topIngredients, topIngredientsDiv);
    displayIngredientsToAdd(ingredientsByCategory, allIngredientsDiv);

    // Common eventlistener for add to shopping list modal
    const addIngredientsList = document.querySelector('.add-ingredients-list');
    addIngredientsList.addEventListener('click', function (e) {
      const clicked = e.target.closest('.ingredient-to-list');

      // Guard clause
      if (!clicked) return;

      // ADD ingredient to shopping list
      let clickedIngredient = ingredients.filter(ing => ing.ID === clicked.id);

      const newShoppingListItem = new ShoppingListItem(...clickedIngredient);
      shoppingList.push(newShoppingListItem);

      clicked.classList.add('text-added');

      displayShoppingList();
    });

    // FILTER
    const inpFilterAllIngredients = document.getElementById(
      'filter-add-to-shopping-list'
    );
    inpFilterAllIngredients.addEventListener('keyup', function (e) {
      e.preventDefault();
      console.log(e.target.value.length);
      filteredIngredientsByCategory = ingredientsByCategory.filter(function (
        el,
        i
      ) {
        if (
          el.name.slice(0, e.target.value.length).toLocaleLowerCase() ===
          e.target.value.toLocaleLowerCase()
        )
          return el;
      });
      if (e.target.value === '') {
        displayIngredientsToAdd(
          ingredientsByCategory,
          document.querySelector('.all-ingredients')
        );
      } else {
        displayIngredientsToAdd(
          filteredIngredientsByCategory,
          document.querySelector('.all-ingredients')
        );
      }
    });

    const btnClearFilter = document.getElementById('btnClearFilter');
    btnClearFilter.addEventListener('click', function (e) {
      e.preventDefault();
      inpFilterAllIngredients.value = '';
      displayIngredientsToAdd(
        ingredientsByCategory,
        document.querySelector('.all-ingredients')
      );
    });
  }

  // CHECK (and clear) ingredient in shopping list
  if (clicked.classList.contains(`btn-check-shopping-list-item`)) {
    setTimeout(function () {
      // Add date to checked ingredient object in ingredients list
      ingredients[indexIngredientsList].addedToListDates.push(
        new Date().toISOString()
      );

      // Removed checked ingredient from shopping list
      shoppingList.splice(indexShoppingList, 1);

      displayShoppingList();
    }, 1000);
  }

  // EDIT shopping list item
  if (clicked.classList.contains(`btn-edit-shopping-list-item`)) {
    // Create HTML for changing the selected unit
    let itemUnitOptionsHTML = '';

    //
    itemUnitOptionsHTML += `
    <option>${shoppingList[indexShoppingList].amountUnit}</option>
    <option>--------</option>
    `;

    shoppingList[indexShoppingList].ingredient.units.forEach(function (unit) {
      itemUnitOptionsHTML += `
      <option>${unit}</option>
      `;
    });
    console.log(itemUnitOptionsHTML);

    console.log('Edit');
    console.log(shoppingList[indexShoppingList]);
    const editShoppingListItemHTML = `
    <h2>Editera</h2>
    <div class="edit-shopping-list-item-modal">
      <form action="">
      <div>
      <input type="text" name="inpEditAmount" id="inpEditAmount" placeholder="Amount" value="${shoppingList[indexShoppingList].amount}"/>
      <select
      id="selectEditAmountUnit"
      name="selectEditAmountUnit">
      ${itemUnitOptionsHTML}
      </select>
      </div>

      <input
      type="submit"
      value="Save Changes"
      name=""
      class="btn-save-changes"
      />
      </form>
      </div>
    `;

    toggleModal(editShoppingListItemHTML);

    const inpEditAmount = document.querySelector('#inpEditAmount');
    inpEditAmount.value = shoppingList[indexShoppingList].amount;
    const selectEditAmountUnit = document.querySelector(
      '#selectEditAmountUnit'
    );
    selectEditAmountUnit.value = shoppingList[indexShoppingList].amountUnit;

    const btnSaveChanges = document.querySelector('.btn-save-changes');
    btnSaveChanges.addEventListener('click', function (event) {
      event.preventDefault();
      shoppingList[indexShoppingList].amount = inpEditAmount.value;
      shoppingList[indexShoppingList].amountUnit = selectEditAmountUnit.value;

      displayShoppingList();
      toggleModal();
    });
  }

  // DELETE ingredient from shopping list
  if (clicked.classList.contains(`btn-delete-shopping-list-item`)) {
    console.log('delete');
    shoppingList.splice(indexShoppingList, 1);
    displayShoppingList();
  }
});

const displayIngredientsToAdd = function (arr, targetElement) {
  targetElement.innerHTML = '';
  arr.forEach(function (ing) {
    const html = `
    <div class="ingredient-to-list" id="${ing.ID}" >
    <img src="${ing.image}" />
    <p>${ing.name}</p>
    </div>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
  });
};
