# Split
**Team Week Project for Epicodus**  
**By Peter Grimm, James Henager, Micheal Hansen, Taylor Phillips, 07.09.2020**

## Description

First team week project for Epicodus. Site designed to allow splitting of household expenses between roommates. The user is able to add multiple "roommates" to a Household. Expenses can then be added and attributed to which roommates contributed to the expense, which roommates the expense applies to and whether the expense will be split evenly or by custom values. The program will issue credits and debits to the appropriate roommates, calculate a house total and display who owes what to the user.

## Specifications

| Spec | Input | Output |
| :-------------     | :------------- | :------------- |
| Program allows the user to add a "roommate" | Name: | Name: James |
| Program allows the user to add an "expense" | Expense: | Expense: Rent - $1500 |
| Program adds the ability to credit and debit users | Peter Paid $1500 | Peter is credited $1500, Taylor is debited $500, Micheal is debited $500 |
| When adding an item, create a dialog box that allows user to list who contributed to the expense | James, Peter, Taylor | James: $1000, Peter $500, Taylor $0 |
| When adding an item, create a dialog box that allows assigning which users the expense applies to | James, Peter, Taylor | James: check, Peter: check, Taylor: uncheck |
| Program calculates a users individual debit or credit based on the items they're included on | Expense: $1500; Micheal paid $1500, James paid $0, Peter paid $0 | Micheal is owed $1000, James owes $500, Peter owes $500 |
| Program displays total house expenses |  | House Total: $1500 |
| Each user has option to view their "history" | User: Taylor | User: Taylor: Paid for Pizza - $40 |
| Option for assigning debits via an automatic split | Rent: $1800 | James owes $600, Taylor owes $600, Peter owes $600 |
| Debits and credits can be set via a custom split | Rent: $1800 | James will pay $1000, Micheal will pay $600, Peter will pay $200 |
| Automatic split to include checkboxes for whether to include a user in that automatic split | Even: Custom: | Even: Custom: checked |

## Setup/Installation Requirements

* _Clone file to desktop from repo on github `https://github.com/pagrimm/split.git` by pressing the green "Code" button_
* _Using a command Line terminal, enter `git clone https://github.com/pagrimm/split.git`_
* _Navigate to project folder using command line type: `cd Desktop` followed by `cd split`_
* _In Command Line, type, `npm install` and wait for the application to complete it's action_
* _Within a command line terminal, user must type `npm run start` to initiate the localhost webpage_

## Bugs

- There is occasionally a rounding issue with displaying values less than a penny.

## Technologies Used

- HTML  
- CSS  
- Webpack  
- Jest  
- VSCode  
- Bootstrap 4.5.0  
- jQuery 3.5.1  
- Font Awesome Glyphicons

## Legal

Copyright (c) 2020  *Peter Grimm, James Henager, Micheal Hansen, Taylor Phillips*  
This software is licensed under the MIT license. [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)