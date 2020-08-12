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
  const next = document.getElementsByClassName('nextPage')[0] || document.getElementsByClassName('qardi-next')[0];
  const page = splitPath[splitPath.length - 1];
  if (page !== 'contact') {
    next.click();
    setTimeout(() => {
      getURL();
    }, 500);
  } else {
    next.click();
  }
};

const fillData = function() {
  const next = '.panel-content';
  waitForEl(next, () => {
    const address = document.querySelector('[data-test="street-input"]');
    const city = document.querySelector('[data-test="city-input"]');
    const zip = document.querySelector('[data-test="zip-input"]');
    const email = document.querySelector('[data-test="email-input"]');
    const firstName = document.querySelector('[data-test="first-name-input"]');
    const lastName = document.querySelector('[data-test="last-name-input"]');
    const phone = document.querySelector('[data-test="phone-input"]');

    if (firstName) {
    firstName.value = 'Wade';
    firstName.dispatchEvent(new Event('input'));
    }
    if (lastName) {
    lastName.value = 'Wilson';
    lastName.dispatchEvent(new Event('input'));
    }
    if (phone) {
    phone.value = randomPhone();
    phone.dispatchEvent(new Event('input'));
    }
    if (address) {
        address.value = '1234 Main St';
        address.dispatchEvent(new Event('input'));
    }
    if (city) {
        city.value = 'Denver';
        city.dispatchEvent(new Event('input'));
    }
    if (zip && zip.value === "") {
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
    case 'project-info':
      clickThrough();
      break;
    default:
      fillData();
      break;
  }
};

getURL();
