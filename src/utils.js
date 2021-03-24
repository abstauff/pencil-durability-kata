function isUpperCase(str) {
  return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

function isASpace(str) {
  return /\s/.test(str);
}

module.exports = { isUpperCase, isASpace };
