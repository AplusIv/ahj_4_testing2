export default function luhnValidate(value) {
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

  return (nCheck % 10) === 0;
}

/* export default function luhnValidate(value) {
  let ch = 0;
  const num = String(value).replace(/\D/g, '');
  const isOdd = num.length % 2 !== 0;

  if (num === '') return false;

  for (let i = 0; i < num.length; i += 1) {
    let n = parseInt(num[i], 10);
    let doubleN = n * 2;

    // ch += (isOdd | 0) === (i % 2) && (n *= 2) > 9 ? (n - 9) : n;
    ch += (isOdd | 0) === (i % 2) && (n *= 2) > 9 ? (n - 9) : n;
  }

  return (ch % 10) === 0;
} */
