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

  var settings = { 
    consumer: { 
      firstName: "Allie",
      lastName: "Craig",
      addressLine1: "1882 E 104th Ave",
      postalCode: document.getElementById('conZip').value,
      city: "Atka",
      state: "AK",
      phone: randomPhone(),
      email: "acraig4a2g." + Math.round(Math.random()*100000) + ".ememnemei2@edify.com",
    }
  }; 

  // re-purpose the loading spinners for cards: 
  var _ogShow = cards.showCardSpinner
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
