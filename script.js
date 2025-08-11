"use strict";

//main 
const app = document.querySelector(".app");
const movmentsContainer = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnClose = document.querySelector(".form__btn--close");
const btnLoan = document.querySelector(".form__btn--loan");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputTransferTo = document.querySelector(".form__input--to");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");

const labelWelcome = document.querySelector(".welcome");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");

const dateWithTime = document.querySelector(".date");

// const movements = document.querySelector(".movements");

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//////////////////////////////////////////////////////////////

// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
//   username: "js"
// };


//Add date and time
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);

dateWithTime.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// create usernames
const createUserNames = (accts) => {
    accts.forEach(acc => {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    });
}

createUserNames(accounts);
console.log(accounts);

//calculate balance
console.log(labelBalance);
const displayCalcBalance = (acc) =>{
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
    console.log(acc.balance);
    labelBalance.textContent = `${acc.balance} €`;
}

// displayCalcBalance(account1.movements);

//Display movements
const displayMovements = function (movements, sort = false) {
  movmentsContainer.innerHTML = "";
  console.log("Display movements");
  console.log(movements);

  const moves = sort ? movements.slice().sort((a, b) => a-b) : movements;
  console.log('moves', moves);

  moves.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="data__cell--1">
            <span class="movements__type movements__type--${type}">
              ${i + 1} ${type}
            </span>
          </div>
          <div class="data__cell--2">
            <div class="movements__date">
              <span>${i + 1} days Ago</span>
            </div>
          </div>
          <div class="data__cell--3">
            <div class="movements__value">
              <span>${mov}€</span>
            </div>
          </div>`;
    movmentsContainer.insertAdjacentHTML("beforeend", html)
  });

};
// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = "";

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";

//     const html = `
//         <div class="movements__row">
//           <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//           <div class="movements__value">${mov}€</div>
//         </div>
//       `;

//     containerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };

//calculate summary--IN, OUT & INTEREST
const calcDisplaySummary = (acc) => {
    const income = acc.movements.filter( mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    console.log(income);
    labelSumIn.textContent = `${income}€`;

    const out = acc.movements.filter( mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    console.log(out);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((deposite) => (deposite * acc.interestRate) / 100)
      .filter((intrst, i, arr) => {
        console.log(arr);
        return intrst >= 1;
      })
      .reduce((acc, intrst) => acc + intrst, 0);
    console.log(interest);
    labelSumInterest.textContent = `${interest}€`;
}

// calcDisplaySummary(account1.movements);

//Update UI
const updateUI = (currentAccount) => {
  //Display movements
  displayMovements(currentAccount.movements);

  //Display balance
  displayCalcBalance(currentAccount);

  //Display summary
  calcDisplaySummary(currentAccount);
};


//Fake login
let currentAcc;
currentAcc = account1;
updateUI(currentAcc);
app.style.display = "block";

let currentAccount;
//Event handler
btnLogin.addEventListener('click', (e) => {
    //Prevent form from submitting
    e.preventDefault();
    
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        console.log('Valid LOGIN');

        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginUsername.blur();
        inputLoginPin.blur();

        //Welcome MSg
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        
        //update UI
        updateUI(currentAccount);

        //Finally Display UI
        app.style.display = 'block';

    }else{
        console.log('Invalid LOGIN');
    }
})


// Transfer
btnTransfer.addEventListener('click', e => {
    // e.preventDefault();
    console.log('Transfer btn clicked');
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

    console.log(amount, receiverAcc);

    if (amount >0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username && receiverAcc) {
      console.log('Valid transfer');

      //Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      
      //Add transfer date
      currentAccount.movementDates.push(new Date());
      // receiverAcc.movementDates.push(new Date());

      //Update UI
      updateUI(currentAccount);

      //clear inputs
      inputTransferTo.value = inputTransferAmount.value = '';
      inputTransferTo.blur();
      inputTransferAmount.blur();
    }
});

//Loan
btnLoan.addEventListener('click', e => {
  // e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);

  }
  //clear inputs
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// Close
btnClose.addEventListener('click', e => {
  // e.preventDefault();
  console.log('Delete btn clicked');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log("account closed!");
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    //Delete account
    console.log(accounts.splice(index, 1));
    console.log(accounts);

    inputCloseUsername.value = inputClosePin.value = '';

    //Hide UI
    app.style.display = "none";
  }
});

let isSorted = false;
//Sort
btnSort.addEventListener('click', e => {
  // e.preventDefault();
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
  // if(isSorted){
  //   displayMovements(currentAccount.movements, isSorted);
  //   isSorted = false;
  // }else{
  //   displayMovements(currentAccount.movements);
  //   isSorted = true;
  // }
});

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

console.log(accountMovements.flat());

const overalBalance = accountMovements.flat().reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance);

//use method chaining
const overalBalance1 = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//use flat Map
const fltMap = accounts.flatMap(acc => acc.movements);
console.log(fltMap);

//Flat Map
const overalBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);






