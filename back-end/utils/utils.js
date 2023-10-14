export function upperCaseFirstLetter(str) {
  if (str) {
    // reference: https://www.geeksforgeeks.org/how-to-make-first-letter-of-a-string-uppercase-in-javascript/
    return str[0].toUpperCase() + str.slice(1);
  }
  return str;
}

export function checkValidInput(input, target) {
  return input.toLowerCase() === target.toLowerCase();
}
