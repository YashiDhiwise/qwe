module.exports = {

  /*
   * convertObjectToEnum : convert object to enum
   * @param obj          : {}
   */
  convertObjectToEnum: (obj) => {
    const enumArr = [];
    Object.values(obj).map((val) => enumArr.push(val));
    return enumArr;
  },

  /*
   * randomNumber : generate random numbers.
   * @param length          : number *default 4
   */
  randomNumber: (length = 4) => {
    const numbers = '12345678901234567890';
    let result = '';
    for (let i = length; i > 0; i -= 1) {
      result += numbers[Math.round(Math.random() * (numbers.length - 1))];
    }
    return result;
  },
};
