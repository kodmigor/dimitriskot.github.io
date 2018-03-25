'use strict'

var cardBoxes = document.querySelectorAll(".card__box");
var cardInputes = document.querySelectorAll(".card__input");
var cardLabels = document.querySelectorAll(".card__label");

for (var i = 0; i < cardBoxes.length; i++) {
  cardBoxes[i].onclick = function () {
    for (var j = 0; j < cardBoxes.length; j++) {
      if (cardInputes[j].checked) {
        cardBoxes[j].classList.remove("card__box--test");
      };
    };
  };
}

for (var a = 0; a < cardBoxes.length; a++) {
  cardBoxes[a].onmouseout = function () {
    for (var b = 0; b < cardBoxes.length; b++) {
      if (cardInputes[b].checked) {
        cardBoxes[b].classList.add("card__box--test");
      };
    };
  };
}

for (var x = 0; x < cardBoxes.length; x++) {
  cardLabels[x].onmouseout = function () {
    for (var y = 0; y < cardBoxes.length; y++) {
      if (cardInputes[y].checked) {
        cardBoxes[y].classList.add("card__box--test");
      };
    };
  };
}
