'use strict';

btnToggleAdd?.addEventListener('click', () =>
  createNewMineralDiv.classList.toggle('hidden')
);

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

const displayMinerals = function () {
  // Sort the minerals array
  minerals = minerals.sort((a, b) => b.name.localeCompare(a.name, 'sv'));

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
        <div class="list-item-side-right">
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

displayMinerals();
