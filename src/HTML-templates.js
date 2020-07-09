export function createCard(roommateName) {
  return `
  <div class='card roommate-card'>
    <div class='card-header'>
      <div class="roommate-name-icon mr-3"><i class="fas fa-user"></i></div>
      <div class="roommate-name-header">${roommateName}</div>
      <div class="roommate-name-header-button"><button class='btn btn-primary expand-button' type="button" data-toggle="collapse" data-target="#${roommateName}Expenses"><i class="fas fa-angle-down down-button"></i><i class="fas fa-angle-up up-button"></i></button></div>
    </div>
        
    <div id='${roommateName}Expenses' class='collapse' data-parent="#roommate-expense-cards">
      <div class="card-body">
        <div id='${roommateName}-Expenses-Output'></div>
        <div class="roommate-total-icon ml-2 mr-3 mb-3"><i class="fas fa-file-invoice-dollar"></i></div>
        <div class="roommate-total mb-3"><span id='${roommateName}-running-total'>${roommateName} owes $0.00 total</span></div>
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
    <input type="checkbox" name="participation" class='participation-button' autocomplete="off" value="${roommateName}" checked> ${roommateName}
  </label>`;
}

export function createExpenseCard (expense) {
  return `
  <div class="card mb-3">
    <div class="card-header">
      <div class="expense-icon mr-3"><i class="fas fa-money-check-alt"></i></i></div>
      <div class="expense-header">${expense.name}</div>
      <div class="expense-total">$${expense.total.toFixed(2)}</div>
    </div>
    <div class="card-body expense-output">
    </div>
  </div>`;
}