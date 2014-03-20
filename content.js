(function(window){
  var initialized = false,
      timerId;

  function checkFocus() {

    if(initialized) {
      clearInterval(timerId);
      return;
    }

    // checking that we don't steal focus from an important 
    var currentFocus = document.querySelector(':focus, [autofocus]');

    if(currentFocus && currentFocus.tagName.match(/input|select|textarea|button/i)) {
      return;
    }

    //trying to find a search field
    var searchField = document.querySelector(
      // these are sane versions of what search field is named
      'input[id=search], input[name=search],' + 
      'input[id*=search], input[name*=search],' +
      'input[class*=search],' +
      // and these are purely empirical
      'input[name=q], [id*=search] input[type=text], [id*=search] input[type=search]'
    );

    if(searchField) {
      initialized = true;
      searchField.focus();
    }
  }

  // start polling page until we find or the page is fully loaded
  checkFocus();
  timerId = setInterval(checkFocus, 500);

  // last resort
  window.addEventListener("load", function() {
    clearInterval(timerId);
    checkFocus();
  }, false);
})(this);
