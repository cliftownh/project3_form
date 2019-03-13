let theForm = document.querySelector('form');
let other = document.getElementById('other-title');
let title = document.getElementById('title');
let design = document.getElementById('design');
let color = document.getElementById('color');
let colorDiv = document.getElementById('colors-js-puns');
let theme = design.options[0];
other.style.display = 'none';

// Set default validation for all inputs
let valid = {
  name: {isValid: false},
  email: {isValid: false},
  other: {isValid: true},
  card: {isValid: false},
  zip: {isValid: false},
  cvv: {isValid: false},
  acts: {isValid: false}
}

// Show other job role textbox if "other" is selected
title.addEventListener('change', function (event) {
  if (event.target.value === 'other') {
    other.style.display = '';
    other.focus();
    other.addEventListener('focusout', createListener(validJob));
  } else {
    valid.other.isValid = true;
    other.style.display = 'none';
    errJob.style.display = 'none';
    other.value = '';
  }
});

// Hide color selection until a design is chosen
if (design.value === 'Select Theme') {
  colorDiv.style.display = 'none';
}
// Only show the relevant colors based on the chosen design
design.addEventListener('change', function (event) {
  theme.disabled = true;
  if (event.target.value === 'js puns') {
    colorDiv.style.display = '';
    for (let i = 3; i < 6; i++) {
      color.options[i].style.display = 'none';
    }
    for (let i = 0; i < 3; i++) {
      color.options[i].style.display = '';
    }
    color.selectedIndex = '0';
  }
  if (event.target.value === 'heart js') {
    colorDiv.style.display = '';
    for (let i = 0; i < 3; i++) {
      color.options[i].style.display = 'none';
    }
    for (let i = 3; i < 6; i++) {
      color.options[i].style.display = '';
    }
    color.selectedIndex = '3';
  }
});

let checks = document.querySelector('.activities');
let act = document.querySelectorAll('input[type="checkbox"]');
let total = 0;

// Disable activities if they overlap already selected activities
checks.addEventListener('change', function (event) {
  if (act[1].checked) {
    act[3].disabled = true;
  } else {
    act[3].disabled = false;
  }

  if (act[2].checked) {
    act[4].disabled = true;
  } else {
    act[4].disabled = false;
  }

  if (act[3].checked) {
    act[1].disabled = true;
  } else {
    act[1].disabled = false;
  }

  if (act[4].checked) {
    act[2].disabled = true;
  } else {
    act[2].disabled = false;
  }
});

// Add up total price for activities
let price = document.createElement('label');
price.style.display = 'none';
checks.appendChild(price);

// Main Conference - $200
act[0].addEventListener('change', function (event) {
  if (act[0].checked) {
    total += 200;
  } else {
    total -= 200;
  }

  price.innerHTML = `Total: $${total}`;

  if (total > 0) {
    valid.acts.isValid = true;
    price.style.display = '';
    errAct.style.display = 'none';
  } else {
    valid.acts.isValid = false;
    price.style.display = 'none';
  }
});

// All other activities - $100
for (let i = 1; i < act.length; i++) {
  act[i].addEventListener('change', function (event) {
    if (act[i].checked) {
      total += 100;
    } else {
      total -= 100;
    }

    price.innerHTML = `Total: $${total}`;

    if (total > 0) {
      valid.acts.isValid = true;
      price.style.display = '';
      errAct.style.display = 'none';
    } else {
      valid.acts.isValid = false;
      price.style.display = 'none';
    }
  });
}

let paypal = document.querySelector('.paypal');
let bitcoin = document.querySelector('.bitcoin');
let credit = document.querySelector('.credit-card');
let payment = document.querySelector('#payment');
let method = document.querySelector('option[value="select_method"]');

method.disabled = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';

payment.addEventListener('change', function (event) {
  if (payment.value == 'select_method' || payment.value == 'credit card') {
    credit.style.display = '';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if (payment.value == 'paypal') {
    credit.style.display = 'none';
    paypal.style.display = '';
    bitcoin.style.display = 'none';
  } else if (payment.value == 'bitcoin') {
    credit.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = '';
  }
});

// Alert constructor for error messages
class Alert {
  constructor(message) {
    let alert = document.createElement('div');
    alert.innerText = message;
    alert.className = 'alert';
    alert.style.display = 'none';
    return alert;
  }
}

let name = document.getElementById('name');
let email = document.getElementById('mail');
let ccNum = document.getElementById('cc-num');
let zip = document.getElementById('zip');
let cvv = document.getElementById('cvv');
let basic = document.getElementsByTagName('fieldset')[0];
let cardInfo = document.getElementsByClassName('col');
let errName = new Alert('Name is required.');
let errMail = new Alert('Must be a valid email address.');
let errJob = new Alert('Must specify a job role.');
let errAct = new Alert('Must select at least one activity.');
let errCC = new Alert('Must enter a valid credit card number (13-16 digits).');
let errZip = new Alert('Must enter a 5-digit zip code.');
let errCVV = new Alert('Must enter a 3-digit CVV.');

basic.insertBefore(errName, name.nextElementSibling);
basic.insertBefore(errMail, mail.nextElementSibling);
basic.insertBefore(errJob, other.nextElementSibling);
cardInfo[0].insertBefore(errCC, ccNum.nextElementSibling);
cardInfo[1].insertBefore(errZip, zip.nextElementSibling);
cardInfo[2].insertBefore(errCVV, cvv.nextElementSibling);
checks.appendChild(errAct);

// Functions for testing regular expressions on inputs
function validName(name) {
  if (/[A-Z]/i.test(name)) {
    valid.name.isValid = true;
    return true;
  } else {
    valid.name.isValid = false;
    return false;
  }
}

function validJob(other) {
  if (/[A-Z]/i.test(other)) {
    valid.other.isValid = true;
    return true;
  } else {
    valid.other.isValid = false;
    return false;
  }
}

function validEmail(email) {
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(email)) {
    valid.email.isValid = true;
    return true;
  } else {
    valid.email.isValid = false;
    return false;
  }
}

function validCard(cc) {
  if (/^\d{13,16}$/.test(cc)) {
    valid.card.isValid = true;
    return true;
  } else {
    if (cc.length < 13 && cc.length > 0) {
      errCC.innerText = 'Please enter a number that is between 13 and 16 digits long.';
    }
    if (cc == '') {
      errCC.innerText = 'Must enter a valid credit card number (13-16 digits).';
    }
    valid.card.isValid = false;
    return false;
  }
}

function validZip(zip) {
  if (/^\d{5}$/.test(zip)) {
    valid.zip.isValid = true;
    return true;
  } else {
    valid.zip.isValid = false;
    return false;
  }
}

function validCVV(cvv) {
  if (/^\d{3}$/.test(cvv)) {
    valid.cvv.isValid = true;
    return true;
  } else {
    valid.cvv.isValid = false;
    return false;
  }
}

function toggleAlert(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = '';
  } else {
    element.style.display = 'none';
  }
}

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text == "" || !valid;
    const tooltip = e.target.nextElementSibling;
    toggleAlert(showTip, tooltip);
  };
}

name.addEventListener('focusout', createListener(validName));
email.addEventListener('focusout', createListener(validEmail));
ccNum.addEventListener('focusout', createListener(validCard));
zip.addEventListener('focusout', createListener(validZip));
cvv.addEventListener('focusout', createListener(validCVV));
theForm.addEventListener('submit', function (event) {
  let validate = [];

  if (email.value === '') {
    errMail.style.display = '';
  }
  if (ccNum.value === '') {
    errCC.style.display = '';
  }
  if (zip.value === '') {
    errZip.style.display = '';
  }
  if (cvv.value === '') {
    errCVV.style.display = '';
  }
  // Keeps track of valid inputs
  for (var prop in valid) {
    if (valid[prop].isValid) {
      errAct.style.display = 'none';
      validate.push(true);
    } else {
      validate.push(false);
      errAct.style.display = '';
    }
  }
  // If there are any invalid inputs, the form will not submit
  if (validate.indexOf(false)!==-1) {
    event.preventDefault();
    console.log(validate)
  }
});
