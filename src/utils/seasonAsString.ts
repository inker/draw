export default (startYear: number) =>
  `${startYear}/${((startYear + 1) % 100).toString().padStart(2, '0')}`
