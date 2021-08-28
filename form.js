

function form(option){
  var formElement = document.querySelector(option.form)
//ham check
  function check(input,rule){
    var errorMessage = rule.test(input.value);
    var error = input.parentElement.querySelector('span');
    if(errorMessage){
      error.innerText = errorMessage;
      input.parentElement.classList.add('error');
    }else{
      error.innerText = '';
      input.parentElement.classList.remove('error');
      input.parentElement.classList.add('succes');
    }
  }

    option.rule.forEach(function(rule) {
      var input = formElement.querySelector(rule.selector);
      
      if(input){
        input.onblur = function(){
          check(input,rule);
        }

        input.oninput = function(){
          var error = input.parentElement.querySelector('span');
          error.innerText = '';
          input.parentElement.classList.remove('error');
          input.parentElement.classList.add('succes');
        }

       }
    });
}

form.isRequired = function (selector) {
  return {
    selector: selector,
    test :  function(value) {
      return value.trim() ? undefined : 'username is invalid !';
    }
  };
}

form.isEmail = function (selector) {
  return {
    selector: selector,
    test :  function(value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined :'email is invalid !'
    }
  };
}

form.minlength = function (selector,min) {
  return {
    selector: selector,
    test :  function(value) {
      return value.length >= min ? undefined : 'minimum password 8 characters !';
    }
  };
}

form.isconfirm = function (selector,checkpassword) {
  return {
    selector: selector,
    test :  function(value) {
      return value.trim() === checkpassword() ? undefined : 'password not match !';
    }
  };
}