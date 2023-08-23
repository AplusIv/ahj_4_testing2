/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/defineCardSystem.js
// import luhnValidate from "./luhnValidate";

function defineCardSystem(value, handler) {
  if (handler(value)) {
    const str = String(value).replace(/\D/g, '');
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(str)) return 'Visa';
    if (/^2200[0-9]{12}$/.test(str)) return 'Mir';
    if (/^[52][1-5][0-9]{14}$/.test(str)) return 'Mastercard'; // могут начинаться с 2
    if (/^3[47][0-9]{13}$/.test(str)) return 'American Express';
    if (/^6(?:011|5[0-9]{2})[0-9]{12}[0-9]{3}?$/.test(str)) return 'Discover'; // 16 или 19
    if (/^35[0-9]{14}[0-9]?$/.test(str)) return 'JCB'; // 15-16
    if (/^3[06][0-9]{12}$/.test(str)) return 'Diners Club'; // 14
  }

  return false;
}
;// CONCATENATED MODULE: ./src/js/luhnValidate.js
function luhnValidate(value) {
  const cleanValue = String(value).replace(/\D/g, '');
  if (!cleanValue || cleanValue === 0) return false;
  let nCheck = 0;
  let bEven = false;
  for (let n = cleanValue.length - 1; n >= 0; n -= 1) {
    let nDigit = parseInt(cleanValue.charAt(n), 10);
    // eslint-disable-next-line no-cond-assign
    if (bEven && (nDigit *= 2) > 9) {
      nDigit -= 9;
    }
    nCheck += nDigit;
    bEven = !bEven;
  }
  return nCheck % 10 === 0;
}
;// CONCATENATED MODULE: ./src/img/visa.png
var visa_namespaceObject = __webpack_require__.p + "images/visa.c99343ffbf0413e56bcb.png";
;// CONCATENATED MODULE: ./src/img/mir.png
var mir_namespaceObject = __webpack_require__.p + "images/mir.98d37125e09c2cf2eaf2.png";
;// CONCATENATED MODULE: ./src/img/amex.png
var amex_namespaceObject = __webpack_require__.p + "images/amex.b979c7e08b4f1d2f9b7f.png";
;// CONCATENATED MODULE: ./src/img/diners_club.png
var diners_club_namespaceObject = __webpack_require__.p + "images/diners_club.d9e0b227850c0c02e238.png";
;// CONCATENATED MODULE: ./src/img/discover.png
var discover_namespaceObject = __webpack_require__.p + "images/discover.34807c4714e42eec5e19.png";
;// CONCATENATED MODULE: ./src/img/jcb.png
var jcb_namespaceObject = __webpack_require__.p + "images/jcb.34c97d4e0148f3e62b64.png";
;// CONCATENATED MODULE: ./src/img/mastercard.png
var mastercard_namespaceObject = __webpack_require__.p + "images/mastercard.1f6ecc13b6ed03eed369.png";
;// CONCATENATED MODULE: ./src/js/creditCardWidget.js









class CreditCardWidget {
  constructor(element) {
    this.element = element;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  static get html() {
    return `      
      <h2>Check your credit card number</h2>
      <div class="form-container">
        <ul class="cards">
          <li class="card visa" title="Visa"><img class="visa-logo" src=${visa_namespaceObject}></li>
          <li class="card master" title="Mastercard"><img class="mastercard-logo" src=${mastercard_namespaceObject}></li>
          <li class="card amex" title="American Express"><img class="amex-logo" src=${amex_namespaceObject}></li>
          <li class="card discover" title="Discover"><img class="discover-logo" src=${discover_namespaceObject}></li>
          <li class="card jcb" title="JCB"><img class="jcb-logo" src=${jcb_namespaceObject}></li>
          <li class="card diners_club" title="Diners Club"><img class="diners-club-logo" src=${diners_club_namespaceObject}></li>
          <li class="card mir" title="Mir"><img class="mir-logo" src=${mir_namespaceObject}></li>
        </ul>
        <form class="form-widget">
          <div class="form-group">
            <input class="input" type="text"
              placeholder="Credit card number">
            <button class="submit">Click to Validate</button>
          </div>
        </form>
      </div>`;
  }
  bindToDom() {
    this.element.innerHTML = CreditCardWidget.html;
    this.cards = this.element.querySelector('.cards');
    this.input = this.element.querySelector('.input');
    this.form = this.element.querySelector('.form-widget');
    this.form.addEventListener('submit', this.onSubmit);
    this.input.addEventListener('input', this.onInput);
  }
  onSubmit(e) {
    e.preventDefault();
    const {
      value
    } = this.input;
    this.hideChosen();
    const checkingCardStatus = defineCardSystem(value, luhnValidate);
    if (checkingCardStatus) {
      this.showValidationStatus(checkingCardStatus);
    } else {
      this.hideChosen();
      this.input.classList.add('invalid');
      this.input.value = 'Wrong Card Number';
      setTimeout(() => {
        this.input.value = '';
      }, 2000);
    }
  }
  showValidationStatus(card) {
    const cardItem = this.cards.querySelector(`[title="${card}"] img`);
    cardItem.classList.add('valid');
  }
  hideChosen() {
    /* eslint-disable-next-line */
    for (const cardItem of this.cards.querySelectorAll('img')) {
      if (cardItem.classList.contains('valid')) {
        cardItem.classList.remove('valid');
      }
    }
  }
  onInput() {
    if (this.input.classList.contains('invalid')) {
      this.input.classList.remove('invalid');
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector('.container');
const creditCardWidget = new CreditCardWidget(container);
creditCardWidget.bindToDom();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;