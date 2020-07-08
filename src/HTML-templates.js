export function createCard(roommateName) {
  return `<div class='card'>
    <div class='card-header'>
      <h2 class="mb-0">
        <button class='btn btn-link' type="button" data-toggle="collapse" data-target="#${roommateName}Expenses">
          ${roommateName} Total: <span id='${roommateName}-running-total'></span>
        </button>
      </h2>
    </div>

    <div id='${roommateName}Expenses' class='collapse' data-parent="#roommate-expense-cards">
      <div class="card-body" id='${roommateName}-Expenses-Output'>
        
      </div>
    </div>
  </div>`;
}

export function createSplitInput(roommateName) {
  return`<div class="input-group mb-1">
    <div class="input-group-prepend">
      <span class="input-group-text">${roommateName} Split</span>
    </div>
    <input type="number" step="0.01" class="form-control custom-split-input" id='custom-debit-${roommateName}'>
  </div>`;
}

export function createParticipationButton (roommateName) {
  return `<label class="btn btn-primary active">
    <input type="checkbox" name="participation" autocomplete="off" value="${roommateName}" checked> ${roommateName}
  </label>`;
}