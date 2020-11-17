"use strict";

/**
 * @author OKoth Samuel;
 * @description codes for javascript calculator 
 * @license MIT 
 * @tutorial from tutorial by CodesTack thank you;
 * @
 */
var $input = document.querySelector("input");
document.querySelectorAll(".numkey").forEach(function (el) {
  el.onclick = function () {
    return $input.value = $input.value !== "0" ? $input.value + el.innerText : el.innerText;
  };
});
var buffer = [];
/**
 * @function opCallback
 */

var opCallback = function opCallback(opName) {
  return function () {
    var currentVal = parseFloat($input.value);

    if (opName === "perc") {
      currentVal *= 0.01;
      $input.value = currentVal;
    } else {
      if (buffer && buffer.length) {
        buffer.push({
          value: currentVal
        });
        var result = evaluate(buffer);
        buffer.push({
          value: result
        });
        buffer.push({
          value: opName
        });
        $input.value = "";
      } else {
        buffer.push({
          value: currentVal
        });
        buffer.push({
          value: opName
        });
        $input.value = "";
      }
    }
  };
};
/**
 * @function evaluate
 */


var evaluate = function evaluate(buffer) {
  var op2 = buffer.pop().value;
  var op = buffer.pop().value;
  var op1 = buffer.pop().value;

  switch (op) {
    case "add":
      return op1 + op2;
      break;

    case "subtr":
      return op1 - op2;
      break;

    case "mult":
      return op1 * op2;
      break;

    case "div":
      return op1 / op2;
      break;

    default:
      return op2;
  }
}; //looping through the operations ('for ... of' loop)


for (var _i = 0, _arr = ["add", "subtr", "mult", "div", "perc"]; _i < _arr.length; _i++) {
  var opName = _arr[_i];
  document.querySelector(".opkey[op=".concat(opName, "]")).onclick = opCallback(opName);
}

; //Equal key;            

document.querySelector(".eqkey").onclick = function () {
  if (buffer && buffer.length) {
    buffer.push({
      value: parseFloat($input.value)
    });
    $input.value = evaluate(buffer);
  }
}; //clear key;


document.querySelector(".opkey[op=clr]").onclick = function () {
  $input.value = 0;
  buffer.length = 0;
}; //negate +/- key;


document.querySelector(".opkey[op=neg]").onclick = function () {
  $input.value = -parseFloat($input.value);
}; //footer date 


var footer = document.querySelector(".footer");
var time = new Date().getFullYear();
footer.innerText = time;
footer.style.color = "blue";