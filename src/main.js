import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Household } from './household';

$(document).ready(function() {
  let household = new Household();
  
  //Roommates Interface
  //Add Roommates Button
  $('#add-roommate').click(function() {
    const roommateName = $("input[name=roommate-name]").val();
    if (roommateName === '') {
      alert('Please enter a name');
      return;
    }
    household.addRoommate(roommateName);
    $("input[name=roommate-name]").val('');

    //add new roommate to the expense interface
    $('#expense-interface').append(roommateName);
    
    //add new roommate to the display debits/credits interface
    $('#display-expenses').append(roommateName);
  });
});