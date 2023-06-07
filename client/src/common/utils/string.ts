export const limitCharacters = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return `${str.slice(0, maxLength - 3)}...`;
  }
};

// export const capitalize = (str: string): string => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

export const capitalize = (str: string, lower = false): string =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );
