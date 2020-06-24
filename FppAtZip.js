const clickThrough = function() {
  $('.nextPage').click();
  getURL();
};

const fillAddress = function() {
  const address = $('.address-input[data-test="street-input"] > [data-qa="text-input"]');
  const city = $('.address-input[data-test="city-input"] > [data-qa="text-input"]');
  const zip = $('.address-input[data-test="zip-input"] > [data-qa="text-input"]');

  address.value = '1234 Main St';
  address.dispatchEvent(new Event('input'));
  city.value = 'Denver';
  city.dispatchEvent(new Event('input'));
  const zipCode = prompt('Please enter a zip", "80202');
  zip.value = zipCode;
  zip.dispatchEvent(new Event('input'));
  clickThrough();
};

const fillContact = function() {
  const firstName = $('.contact-input[data-test="first-name-input"] > [data-qa="text-input"]');
  const lastName = $('.contact-input[data-test="last-name-input"] > [data-qa="text-input"]');
  const phone = $('.contact-input[data-test="phone-input"] > [data-qa="text-input"]');
  const email = $('.contact-input[data-test="email-input"] > [data-qa="text-input"]');

  firstName.value = 'Wade';
  firstName.dispatchEvent(new Event('input'));
  lastName.value = 'Wilson';
  lastName.dispatchEvent(new Event('input'));
  phone.value = randomPhone();
  phone.dispatchEvent(new Event('input'));
  email.value = 'wwilson.' + Date.now() + '.fppatzip@edify.com';
  email.dispatchEvent(new Event('input'));
  clickThrough();
};

const randomPhone = function() {
  const x = [3, 0, 3, 4];
  while (x.length < 10) {
    x.push(Math.floor(Math.random() * 10));
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
