// import luhnValidate from "./luhnValidate";

export default function defineCardSystem(value, handler) {
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

/* export default function defineCardSystem(value, handler) {
  if (handler(value)) {
    const str = String(value).replace(/\D/g, '');
    const firstNumber = Number(str[0]);
    const twoNumbers = Number(str.slice(0, 2));
    const fourNumbers = Number(str.slice(0, 4));

    if (firstNumber === 2) {
      if (fourNumbers === 2200) return 'Mir';
      return 'Mastercard';
    }

    if (firstNumber === 3) {
      if (twoNumbers === 35) return 'JCB';
      if (twoNumbers === 30 || twoNumbers === 36) return 'Diners Club';
      return 'American Express';
    }

    if (firstNumber === 4) return 'Visa';

    if (firstNumber === 5) return 'Mastercard';

    if (firstNumber === 6) return 'Discover';

    return false;
  }
  return false;
} */
