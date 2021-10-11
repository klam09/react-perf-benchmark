export const max = (numbers) => Math.max(...numbers);

export const min = (numbers) => Math.min(...numbers);

export const sum = (numbers) => numbers.reduce((accm, number) => accm + number, 0);

export const avg = (numbers) => sum(numbers) / numbers.length;

export const removeMax = (numbers, count = 1) => {
  for (let i = 0; i < count; i++) {
    numbers.splice(numbers.indexOf(max(numbers)), 1);
  }
};

export const removeMin = (numbers, count = 1) => {
  for (let i = 0; i < count; i++) {
    numbers.splice(numbers.indexOf(min(numbers)), 1);
  }
};

export const round = (number, dp = 0) => Math.round(number * 10 ** dp) / 10 ** dp;

export const percentDiff = (baseNumber, diffNumber) => (diffNumber - baseNumber) / baseNumber / 100;
