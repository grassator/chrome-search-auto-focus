/* global document */
(function(window){
  var inputTagRegex = /^(?:input|select|textarea|button)$/i;

  function findAppropriateField() {
    return document.querySelector(
      // these are sane versions of what search field is named
      'input[id=search], input[name=search],' + 
      'input[id*=search], input[name*=search],' +
      'input[class*=search],' +
      // and these are purely empirical
      'input[name=q], [id*=search] input[type=text], [id*=search] input[type=search]'
    );
  }

  function eventHasPrintableCharacter(e) {
    return !/[\x00-\x1F]/.test(String.fromCharCode(e.charCode));
  }

  function checkTarget(e) {
    return inputTagRegex.test(e.target.tagName) || e.target.contentEditable;
  }

  window.addEventListener('keypress', function(e){
    // if something else took care of this event or if the target of
    // the event is an input field then just ignore it
    if(e.defaultPrevented || checkTarget(e)) {
      return;
    }

    var input = findAppropriateField();

    // only focus input if there is one and user
    // pressed a non-whitespace printable
    if(input && eventHasPrintableCharacter(e)) {
      e.target = input;
      input.focus();
    }

  }, false);

})(this);
