import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Household } from './household';

function gatherUserInput(automatic) {

}

$(document).ready(function() {
  let household = new Household();

  $('button#show-roommate-panel').click(function(event) {
    event.prevenDefault();
    $('#add-roommate-interface').show();
  })

  $('button#add-roommate').click(function(event) {
    event.preventDefault();
    const roommateName = $('#roommate-name').val();
    household.addRoommate(roommateName);
    $('#add-roommate-interface').hide();
  })

  $('button#show-expense-panel').click(function(event) {
    event.preventDefault();
    if (household.roommates.length < 1) {
      alert('Add at least one roomate first');
      return;
    }
    const expenseInterface = $('#add-expense-interface');
    let formHTML = `<form><div class='form-group'><label for='expense-name'>Name of the Expense</label><input name='expense-name' class='form-control'>`;
    formHTML += `<div class='form-group'><label for='totalPrice'>Total Price of the Expense: </label><input type='number' name='totalPrice' class='form-control'></div>`;
    formHTML += `<p>Amount To Credit For Each Roommate: </p>`;
    for (const roommate of household.roommates) {
      formHTML += `<div class='form-control><label for='${roommate.name}-credit'>${roommate.name} Credit</label><input type='number' name='${roommate.name}-debit' class='form-control'></div>`
    }
    formHTML += `<button class='btn' id='automatic-divide'>Automatic Divide</button><button class='btn' id='custom-divide'>Custom Divide</button><div id='split-interface'></div></form>`;
    expenseInterface.html(formHTML);
  })

  $('#add-expense-interface').on('click', '#automatic-divide', function(event) {
    event.preventDefault();
    const splitInterface = $('#split-interface');
    splitInterface.empty();
    let splitHTML = '';
    for (const roommate of household.roommates) {
      splitHTML += `<label><input type='checkbox' name='roommate-split-checkbox' value='${roommate.name}' checked>Include ${roommate.name}?</label>`
    }
    splitHTML += `<button class='btn' id='confirm-automatic-split'>Confirm This Split</button>`
    splitInterface.html(splitHTML);
  });

  $('#add-expense-interface').on('click', '#custom-divide', function(event) {
    event.preventDefault();
    const splitInterface = $('#split-interface');
    splitInterface.empty();
    let splitHTML = '';
    for (const roommate of household.roommates) {
      splitHTML += `<div class='form-group'><label for='${roommate.name}-debit'>Debit to ${roommate.name}</label><input type='number' name='${roommate.name}-debit'></div>`
    }
    splitHTML += `<button class='btn' id='confirm-custom-split'>Confirm This Split</button>`;
  });

  $('#add-expense-interface').on('click', '#confirm-automatic-split', function(event) {
    event.preventDefault();
    gatherUserInput(true);
  })

  $('#add-expense-interface').on('click', '#confirm-custom-split', function(event) {
    event.preventDefault();
    gatherUserInput(false);
  });
})