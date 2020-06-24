let wallet = 0;
let creditValue = 0;
let debitValue = 0;
let credit = document.getElementById('credititems');
let balance = document.getElementById('balance');
let debit = document.getElementById('debititems');
let add = document.getElementById('add');
let empty = document.getElementById('empty');
showCreditItems();
showDebitItems();

// Listening Add event
function emptycall() {
  if (creditValue == 0 && debitValue == 0) {
    empty.innerHTML = `<h4>Nothing to show</h4>`;
  }
  else {
    empty.innerHTML = ''
  }
}
add.addEventListener('click', function () {
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  let creditpurpose = document.getElementById('creditpurpose');
  let creditamount = document.getElementById('creditamount');
  creditpurpose.value = creditpurpose.value.replace(creditpurpose.value[0], creditpurpose.value.toUpperCase()[0]);
  if (creditpurpose.value != "" && creditamount.value != "") {
    let creditObj = {
      purpose: creditpurpose.value,
      amount: creditamount.value,
      date: date,
      time: time,
    };
    creditsObj.push(creditObj);
    creditamount.value = "";
    creditpurpose.value = "";
    localStorage.setItem("creditList", JSON.stringify(creditsObj));
    showCreditItems();
  }
  else {
    let alert = document.getElementById('alert');
    alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show my-2" role="alert">
        <strong>Invalid/Insufficient Input </strong> You should check in on some of those fields below in Credit.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
  }
})

// Listening deduct event

let deduct = document.getElementById('deduct');
deduct.addEventListener('click', function () {
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  let debitpurpose = document.getElementById('debitpurpose');
  let debitamount = document.getElementById('debitamount');
  debitpurpose.value = debitpurpose.value.replace(debitpurpose.value[0], debitpurpose.value.toUpperCase()[0]);
  if (debitpurpose.value != "" && debitamount.value != "") {
    let debitObj = {
      purpose: debitpurpose.value,
      amount: debitamount.value,
      date: date,
      time: time,
    };
    debitsObj.push(debitObj);
    debitamount.value = "";
    debitpurpose.value = "";
    localStorage.setItem("debitList", JSON.stringify(debitsObj));
    showDebitItems();
  }
  else {
    let alert = document.getElementById('alert');
    alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show my-2" role="alert">
        <strong>Invalid/Insufficient Input </strong> You should check in on some of those fields below in Debit.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
  }
})

// show credititems
function showCreditItems() {
  let creditList = localStorage.getItem('creditList');
  if (creditList == null)
    creditsObj = [];
  else {
    creditsObj = JSON.parse(creditList);
  }
  creditValue = 0;
  let html = "";
  if (creditsObj.length != 0) {
    creditsObj.forEach(function (element, index) {
      html += `<div id="toast${index}" class="toast show my-2 green" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header ">
      <strong class="mr-auto">&#8377  ${element.amount}</strong>
      <small class="text-muted">${element.time} | ${element.date}</small>
      <button id="${index}" type="button" onclick = "deleteCreditItem(this.id)" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
    ${element.purpose}
    </div>
  </div>`;
      let money = parseFloat(element.amount).toFixed(2);
      creditValue += parseFloat(money);
    });
  }
  wallet = creditValue + debitValue;
  wallet = parseFloat(wallet.toFixed(2));
  credit.innerHTML = html;
  balance.innerHTML = `Balance : &#8377 ${wallet}`;
  emptycall();
}

// show debititems

function showDebitItems() {
  let debitList = localStorage.getItem('debitList');
  if (debitList == null)
    debitsObj = [];
  else
    debitsObj = JSON.parse(debitList);
  debitValue = 0;
  let html = ""
  if (debitsObj.length != 0) {
    debitsObj.forEach(function (element, index) {
      html += `<div id="toast${index}" class="toast show my-2 red">
    <div class="toast-header ">
      <strong class="mr-auto">&#8377  ${element.amount}</strong>
      <small class="text-muted">${element.time} | ${element.date}</small>
      <button id="${index}" type="button" onclick = "deleteDebitItem(this.id)"  class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
    ${element.purpose}
    </div>
  </div>`;
      let money = parseFloat(element.amount).toFixed(2);
      debitValue -= parseFloat(money);
    });
  }
  wallet = creditValue + debitValue;
  wallet = parseFloat(wallet.toFixed(2));
  debit.innerHTML = html;
  balance.innerHTML = `Balance : &#8377 ${wallet}`;
  emptycall();
}

// delete CreditItem
function deleteCreditItem(index) {
  let creditList = localStorage.getItem("creditList");

  let creditsObj = JSON.parse(creditList);
  creditsObj.splice(index, 1);
  localStorage.setItem("creditList", JSON.stringify(creditsObj));
  showCreditItems();
}

// delete DebitItem
function deleteDebitItem(index) {
  let debitList = localStorage.getItem("debitList");

  let debitsObj = JSON.parse(debitList);
  debitsObj.splice(index, 1);
  localStorage.setItem("debitList", JSON.stringify(debitsObj));
  showDebitItems();
}

// credit sum 
let cb = document.getElementById("cb")
cb.addEventListener('mouseover', function () {
  cb.innerHTML = `&#8377 ${creditValue}`;
})
cb.addEventListener('mouseout', function () {
  cb.innerHTML = "Credit";
})

// debit sum 
let db = document.getElementById("db")
db.addEventListener('mouseover', function () {
  db.innerHTML = `&#8377 ${Math.abs(debitValue)}`;
})
db.addEventListener('mouseout', function () {
  db.innerHTML = "Debit";
})
