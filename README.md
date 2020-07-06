# Split
**Team Week Project for Epicodus**
**By Peter Grimm, James Henager, Micheal Hansen, Taylor Phillips, 07.06.2020**

## Description

First team week project for Epicodus. Site designed to allow splitting of household expenses between roommates.

## Specifications

Backend:
* Program stores a session object ("Household")
* Ability to add users ("Roommates") to a session object
* Ability to add items ("Expenses") to the session
* Items can debit and credit users
* Debits and credits can be set via a custom split
* Program calculates a users individual debit or credit based on the items they're included on

Frontend:
* Program displays total house expenses, and each users share
* Each user has option to view their "history"
* When adding an item, create a dialog box that allows assigning of debts and credits
* Form contains entry fields for each person's contribution for assigning of credits
* Option for assigning debits via an automatic split or custom split
* Automatic split to include checkboxes for whether to include a user in that automatic split
* Custom split to allow for direct assigning of debits

Household = {this.roomates = []; Expenses = []; Total = num;}
Roomates = {roomates = [(name, index)]}
Expenses = {this.total = num; credits = [], debits = []}

## Setup/Installation Requirements

* 

## Technologies Used

HTML  
CSS  
Bootstrap 4.5.0
jQuery 3.5.1

## Legal

Copyright (c) 2020  *Peter Grimm, James Henager, Micheal Hansen, Taylor Phillips*
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) This software is licensed under the MIT license.