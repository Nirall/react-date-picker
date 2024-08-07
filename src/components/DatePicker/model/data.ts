export const getYearsArr = ({ startYear = 1990, yearsCount = 60 }) =>
  new Array(yearsCount).fill(startYear).map((v, i) => v + i)

export const getCalendarPosition = (item: HTMLDivElement) => {
  const { bottom, right, height } = item.getBoundingClientRect();
  const vertical = bottom > (document.documentElement.clientHeight + (height / 8)) ? 'top' : 'bottom';
  const horizontal = right > document.documentElement.clientWidth ? 'right' : 'left';
  return `${vertical}-${horizontal}`;
}
