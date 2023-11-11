'use strict';

const selectRecepieType = document.getElementById('recepieType');
const selectRecepieCategory = document.getElementById('recepieCategory');
const recepiesDiv = document.querySelector('.recepies');
const btnClearCategory = document.getElementById('btnClearRecepieCategory');
const btnClearType = document.getElementById('btnClearRecepieType');

let optionsRecepieTypeHTML = '';
const optionsRecepieType = recepieTypes.forEach(
  type => (optionsRecepieTypeHTML += `<option>${type}</option>`)
);

let optionsRecepieCategoryHTML = '';
const optionsRecepieCategory = recepieCategories.forEach(
  cat => (optionsRecepieCategoryHTML += `<option>${cat}</option>`)
);

selectRecepieType.insertAdjacentHTML('beforeend', optionsRecepieTypeHTML);
selectRecepieCategory.insertAdjacentHTML(
  'beforeend',
  optionsRecepieCategoryHTML
);

const displayRecepies = function (arr) {
  recepiesDiv.innerHTML = '';

  // Loop over each category
  arr.forEach(function (rec, i) {
    const html = `
      <div class="list-item">
      <div class="list-item-main">
      <p class="list-item-title">${rec.name}</p>
      <button value="${rec.ID}" class="btn btn-info"><i class="fa-solid fa-circle-info"></i></button>
      </div>
      <div class="list-item-side-right">
      <button value="${rec.ID}" class="btn btn-edit-recepie"><i class="fa-solid fa-pencil"></i></button>
      <button value="${rec.ID}" class="btn btn-delete-recepie"><i class="fa-regular fa-trash-can"></i></button>
      </div>
      </div>
      `;

    recepiesDiv.insertAdjacentHTML('beforeend', html);
  });
};

displayRecepies(recepies);

const filterRecepies = function (type, category) {
  let filteredRecepies = recepies;
  if (type === 'Alla' && category === 'Alla') {
    console.log('ALLA');
    return filteredRecepies;
  } else if (type === 'Alla' && category !== 'Alla') {
    filteredRecepies = filteredRecepies.filter(
      rec => rec.category === category
    );
    console.log('juj', filteredRecepies);
    return filteredRecepies;
  } else if (type !== 'Alla' && category === 'Alla') {
    filteredRecepies = filteredRecepies.filter(rec => rec.type === type);
    console.log(filteredRecepies);
    return filteredRecepies;
  } else {
    console.log('mamma');
    filteredRecepies = filteredRecepies.filter(rec => rec.type === type);
    filteredRecepies = filteredRecepies.filter(
      rec => rec.category === category
    );
    return filteredRecepies;
  }
};

selectRecepieType.addEventListener('change', function (e) {
  e.preventDefault();
  console.log(selectRecepieCategory.value, selectRecepieType.value);
  displayRecepies(
    filterRecepies(selectRecepieType.value, selectRecepieCategory.value)
  );
  console.log('hej');
});

selectRecepieCategory.addEventListener('change', function (e) {
  e.preventDefault();
  displayRecepies(
    filterRecepies(selectRecepieType.value, selectRecepieCategory.value)
  );
  console.log('hej1');
});

btnClearCategory.addEventListener('click', function () {
  selectRecepieCategory.value = 'Alla';
  displayRecepies(
    filterRecepies(selectRecepieType.value, selectRecepieCategory.value)
  );
});

btnClearType.addEventListener('click', function () {
  selectRecepieType.value = 'Alla';
  displayRecepies(
    filterRecepies(selectRecepieType.value, selectRecepieCategory.value)
  );
});
