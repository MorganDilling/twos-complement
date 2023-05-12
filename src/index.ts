import prompts from 'prompts';

const parseTwosComplement = (binary: Array<number>): number => {
  const parsed = binary.reverse().reduce((acc, bit, index) => {
    if (bit === 1) {
      acc += 2 ** index * (index == binary.length - 1 ? -1 : 1);
    }
    return acc;
  });

  return parsed;
};

(async () => {
  const { value } = await prompts({
    type: 'number',
    name: 'value',
    message: 'Enter a number',
  });

  const binary: Array<number> = value.toString(2).split('').map(Number);
  binary.unshift(0);
  let oneFound = false;
  const flipped: Array<number> = binary
    .map((bit) => bit)
    .reverse()
    .map((bit) => {
      console.log(bit, oneFound);

      if (!oneFound) {
        if (bit === 1) oneFound = true;
        return bit;
      }
      return bit === 0 ? 1 : 0;
    })
    .reverse();
  console.log(binary.join(''));
  console.log(flipped.join(''));

  const parsed = parseTwosComplement(flipped);
  console.log(parsed);
})();
