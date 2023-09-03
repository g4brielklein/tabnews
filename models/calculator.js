function sum(number1, number2) {
  if (typeof number1 !== "number" || typeof number2 !== "number") {
    return "Error";
  }

  return number1 + number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

exports.sum = sum;
exports.divide = divide;
