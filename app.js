// create .md explaining each step involved
const result = document.querySelector('#result');
const primeController = {
  arr: [],
  mappedObj: {},

  initPrime(n) {
    // check if input is integer
    this.errorCheck(n);
    // convert param from str to int
    const ConvertedInt = this.isInteger(n);
    // check special case single digit primes otherwise run normally
    if ([2, 3, 5, 7].includes(ConvertedInt)) {
      this.isPrimeArray(this.arr, ConvertedInt).charMap().formattedToHTML();
    } else {
      this.getPrimeFactors(ConvertedInt).charMap().formattedToHTML();
    }
  },

  errorCheck(n) {
    if (n <= 1 || isNaN(n)) {
      throw new Error('Enter an integer > 1');
    }
  },

  isInteger(n) {
    return parseInt(n, 10);
  },

  isPrime(arr) {
    return (arr.length === 1);
  },

  isPrimeArray(arr, n) {
    // check final state
    if (n !== 1) {
      arr.push(n);
    }
    // check if prime
    if (this.isPrime(arr)) {
      this.arr = [1, n];
    }
    return this;
  },

  getPrimeFactors(n) {
    // check 2 prime
    if (n % 2 === 0) {
      this.arr.push(2);
      return this.getPrimeFactors((n / 2));
    }
    // check 3 prime
    if (n % 3 === 0) {
      this.arr.push(3);
      return this.getPrimeFactors((n / 3));
    }
    // check 5 prime
    if (n % 5 === 0) {
      this.arr.push(5);
      return this.getPrimeFactors((n / 5));
    }
    // check 7 prime
    if (n % 7 === 0) {
      this.arr.push(7);
      return this.getPrimeFactors((n / 7));
    }

    this.isPrimeArray(this.arr, n);
    return this;
  },

  charMap() {
    this.mappedObj = this.arr.reduce((obj, item) => {
      obj[item] ? obj[item]++ : obj[item] = 1;
      return obj;
    }, {});
    return this;
  },

  formattedToHTML() {
    const mappedArr = Object.entries(this.mappedObj);
    mappedArr.forEach((item) => {
      let pow = item[1];
      let multiply = '*';
      let open = '';
      let close = '';
      // add () around integer if exponent > 1
      item[1] > 1 ? (open = '(', close = ')') : pow = '';
      // add * for all integers but the last
      mappedArr.indexOf(item) < (mappedArr.length - 1) ? multiply : multiply = '';
      result.innerHTML += `<span>${open}${item[0]}${close} <sup>${pow}</sup> ${multiply} </span>`;
    });
    this.arr = [];
  },
};

function runPrimes() {
  result.textContent = '';
  const int = document.querySelector('input[type="number"]').value;
  try {
    primeController.initPrime(int);
  } catch (err) {
    result.textContent = err.message;
  }
}

document.querySelector('#get-primes').addEventListener('click', (e) => {
  runPrimes();
  e.preventDefault();
});
