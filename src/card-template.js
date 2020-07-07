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