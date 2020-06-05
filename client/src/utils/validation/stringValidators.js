export const isStringContains = (str, pattern, flag) => {
  const regexp = new RegExp(pattern, flag);
  return regexp.test(str);
};

export const isStringLonger = (str, length) => {
  return str.length > length;
};

export const isStringShorterOrEqual = (str, length) => {
  return str.length <= length;
};
