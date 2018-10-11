// script that gets loaded: 
(function(w,d,sb,$,models,cards,pub){

  var mainLoadable;

  var randomPhone = function() { 
    var x = [ 3, 0, 3, 4 ]; 
    while(x.length < 10) { 
      x.push(Math.floor(Math.random()*10));
    }
    return x.join('');
  }; 
  
  function fillCityState(zipInput) {
    var zipInfo = getCityState(zipInput);
    settings.consumer.postalCode = zipInput;
    settings.consumer.city = zipInfo.placeName;
    settings.consumer.state = zipInfo.adminCode1;
  }
  
  function getCityState(zipCode) { 
    var xhttp;
    xhttp=new XMLHttpRequest();
    var url = "https://www.geonames.org/postalCodeLookupJSON?&country=US&callback=?&postalcode=" + zipCode
    xhttp.open("GET", url, false);
    xhttp.send();
    
    var parseFront = xhttp.response.substring(2);
    var parseBack = parseFront.slice(0, -2);
    var formatJSON = JSON.parse(parseBack).postalcodes[0];
    return formatJSON;
  }

  var settings = { 
    consumer: { 
      firstName: "Wade",
      lastName: "Wilson",
      addressLine1: "1882 E 104th Ave",
      postalCode: "99547",
      city: "Atka",
      state: "AK",
      phone: randomPhone(),
      email: "wwilson4a2g." + Math.round(Math.random()*100000) + ".ememnemei2@edify.com",
    }
  };

  // re-purpose the loading spinners for cards: 
  var _ogShow = cards.showCardSpinner// script that gets loaded: 
    , _ogHide = cards.hideCardSpinner;
  cards.showCardSpinner = function(){
    pub.emit('loading');
    _ogShow.apply(this,arguments);
  }; 
  cards.hideCardSpinner = function() { 
    pub.emit('notloading');
    _ogHide.apply(this,arguments);
  }

  // pub.on('notloading',doSomeSubmitting);

  var start = function(){   
    mainLoadable = HA.ui.loadable('scrollingInterview');
    if(mainLoadable.getState() != 'initial') return mainLoadable.on('initial',start);
    var zipInput = document.getElementById('conZip').value;
    if(zipInput != null && zipInput != ""){
      fillCityState(zipInput);
    } else {
      var zip = prompt("Please enter a zip", "99547");
      if(zip != null && zip != ""){
        fillCityState(zip);
      }
    }
    $.extend(models.consumer,settings.consumer,models.consumer);
    sb.bind('consumer',models.consumer);
    doSomeSubmitting();
  };

  var lastCard = null, interstitialDone = false, doneSubmitting = false;
  var doSomeSubmitting = function(){
    if(cards.state.lastCard && cards.state.lastCard != lastCard) {
      lastCard = cards.state.lastCard;
      console.log(cards.state.lastCard.getAttribute('name'));
      var name = cards.state.lastCard.getAttribute('name');  
      if(name == 'combinedSubmit' && !interstitialDone) { 
        $(cards.state.lastCard).find('form').find('input[type="submit"]').first().click();
        lastCard = null;
        w.setTimeout(doSomeSubmitting,1300);
      } if(name == 'price'){
          $(cards.state.lastCard).find('#price-footer').find('input[type="submit"]').first().click();      
      } else { 
        //if(name == 'combinedSubmit') doneSubmitting = true;
        $(cards.state.lastCard).find('form').find('input[type="submit"]').first().click();
      }
    } 
    if(!doneSubmitting && !interstitialDone) { 
      w.setTimeout(doSomeSubmitting,80);
    }
  };

  start();

})(window,document,simpleBind,HA.dom,HA.models,HA.interviewCards,EmitterFactory({}));
