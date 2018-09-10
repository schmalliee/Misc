// script that gets loaded: 
(function(w,d,sb,$,models,cards,pub){

  var mainLoadable;
  
  //load jquery
  var script = document.createElement('script');
  script.src = '//code.jquery.com/jquery-1.11.0.min.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  var randomPhone = function() { 
    var x = [ 3, 0, 3, 4 ]; 
    while(x.length < 10) { 
      x.push(Math.floor(Math.random()*10));
    }
    return x.join('');
  }; 
  
  function fillCityState() {
    var zipInfo = getCityState();
    settings.consumer.postalCode = zipInput;
    settings.consumer.city = zipInfo.responseJSON.postalcodes[0].placeName;
    settings.consumer.state = zipInfo.responseJSON.postalcodes[0].adminCode1;
  }
  
  function getCityState() { 
    var searchResponse = $.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country=US&callback=?", {
      postalcode: document.getElementById('conZip').value
      }, function(response) {
        return response;
    });
    return searchResponse;
  }

  var settings = { 
    consumer: { 
      firstName: "Allie",
      lastName: "Craig",
      addressLine1: "1882 E 104th Ave",
      postalCode: "99547",
      city: "Atka",
      state: "AK",
      phone: randomPhone(),
      email: "acraig4a2g." + Math.round(Math.random()*100000) + ".ememnemei2@edify.com",
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
      fillCityState();
    } else {
      var zip = prompt("Please enter a zip", "99547");
      if(zip != null && zip != ""){
        fillCityState();
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
      var name = cards.state.lastCard.getAttribute('name');  
      if(name == 'combinedSubmit' && !interstitialDone) { 
        $(cards.state.lastCard).find('.interstitial-container a').first().click();
        lastCard = null;
        interstitialDone = true;
        w.setTimeout(doSomeSubmitting,1300);
      } else { 
        if(name == 'combinedSubmit') doneSubmitting = true;
        $(cards.state.lastCard).find('form').find('input[type="submit"]').first().click();
      }
    } 
    if(!doneSubmitting && !interstitialDone) { 
      w.setTimeout(doSomeSubmitting,80);
    }
  };

  start();

})(window,document,simpleBind,HA.dom,HA.models,HA.interviewCards,EmitterFactory({}));
