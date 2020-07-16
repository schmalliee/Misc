const waitForEl = function(selector, callback) {
  const el = document.querySelector(selector);
  if (el !== null && typeof el !== 'undefined') {
    callback();
  } else {
    setTimeout(() => {
      waitForEl(selector, callback);
    }, 1000);
  }
};

const clickThrough = function() {
  const splitPath = window.location.pathname.split('/');
  const page = splitPath[splitPath.length - 1];
  if (page !== 'contact') {
    document.getElementsByClassName('nextPage')[0].click();
    setTimeout(() => {
      getURL();
    }, 500);
  } else {
    document.getElementsByClassName('nextPage')[0].click();
  }
};

const fillAddress = function() {
  const header = '[data-test="street-input"]';
  waitForEl(header, () => {
    const address = document.querySelector('[data-test="street-input"]');
    const city = document.querySelector('[data-test="city-input"]');
    const zip = document.querySelector('[data-test="zip-input"]');
    const email = document.querySelector('[data-test="email-input"]');


    address.value = '1234 Main St';
    address.dispatchEvent(new Event('input'));
    city.value = 'Denver';
    city.dispatchEvent(new Event('input'));
    if (zip.value === "") {
        const zipCode = prompt('Please enter a zip', '80202');
        zip.value = zipCode;
        zip.dispatchEvent(new Event('input'));
    }
    if (email) {
        email.value = 'wwilson.' + Date.now() + '.fppatzip@edify.com';
        email.dispatchEvent(new Event('input'));
    }
    clickThrough();
  });
};

const fillContact = function() {
  const header = '[data-test="first-name-input"]';
  waitForEl(header, () => {
    const firstName = document.querySelector('[data-test="first-name-input"]');
    const lastName = document.querySelector('[data-test="last-name-input"]');
    const phone = document.querySelector('[data-test="phone-input"]');
    const email = document.querySelector('[data-test="email-input"]');

    firstName.value = 'Wade';
    firstName.dispatchEvent(new Event('input'));
    lastName.value = 'Wilson';
    lastName.dispatchEvent(new Event('input'));
    phone.value = randomPhone();
    phone.dispatchEvent(new Event('input'));
    if (email) {
        email.value = 'wwilson.' + Date.now() + '.fppatzip@edify.com';
        email.dispatchEvent(new Event('input'));
    }
    setTimeout(() => {
      clickThrough();
    }, 500);
  });
};

const randomPhone = function() {
  const x = [3, 0, 3, '-', 4];
  while (x.length < 12) {
    x.push(Math.floor(Math.random() * 10));
    if (x.length == 7) x.push('-');
  }
  return x.join('');
};

const getURL = function() {
  const splitPath = window.location.pathname.split('/');
  const page = splitPath[splitPath.length - 1];

  switch (page) {
    case 'contact':
      fillContact();
      break;
    case 'project-info':
      clickThrough();
      break;
    case 'address':
      fillAddress();
      break;
  }
};

getURL();
