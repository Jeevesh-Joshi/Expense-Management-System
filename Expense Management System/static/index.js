let wallet = 0;
let creditValue = 0;
let debitValue = 0;
let credit = document.getElementById('credititems');
let balance = document.getElementById('balance');
let debit = document.getElementById('debititems');
let add = document.getElementById('add');
showCreditItems();
showDebitItems();

// Listening Add event

add.addEventListener('click', function () {
  let utc = new Date().toDateString();
  let creditpurpose = document.getElementById('creditpurpose');
  let creditamount = document.getElementById('creditamount');
  creditpurpose.value = creditpurpose.value.replace(creditpurpose.value[0], creditpurpose.value.toUpperCase()[0]);
  if (creditpurpose.value != "" && creditamount.value != "") {
    let creditObj = {
      purpose: creditpurpose.value,
      amount: creditamount.value,
      time: utc,
    };
    creditsObj.push(creditObj);
    creditamount.value = "";
    creditpurpose.value = "";
    localStorage.setItem("creditList", JSON.stringify(creditsObj));
    showCreditItems();
  }
  else {
    let alert = document.getElementById('alert');
    alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show my-2" role="alert">
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
  let utc = new Date().toDateString();
  let debitpurpose = document.getElementById('debitpurpose');
  let debitamount = document.getElementById('debitamount');
  debitpurpose.value = debitpurpose.value.replace(debitpurpose.value[0], debitpurpose.value.toUpperCase()[0]);
  if (debitpurpose.value != "" && debitamount.value != "") {
    let debitObj = {
      purpose: debitpurpose.value,
      amount: debitamount.value,
      time: utc,
    };
    debitsObj.push(debitObj);
    debitamount.value = "";
    debitpurpose.value = "";
    localStorage.setItem("debitList", JSON.stringify(debitsObj));
    showDebitItems();
  }
  else {
    let alert = document.getElementById('alert');
    alert.innerHTML = `<div class="alert alert-primary alert-dismissible fade show my-2" role="alert">
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
      <small class="text-muted">${element.time}</small>
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
      <small class="text-muted">${element.time}</small>
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