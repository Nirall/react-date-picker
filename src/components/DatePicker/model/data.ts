const getYearsArr = ({ startYear = 1900, yearsCount = 200 }) =>
  new Array(yearsCount).fill(startYear).map((v, i) => v + i)

const getCalendarPosition = (item: HTMLDivElement) => {
  const { bottom, right, height } = item.getBoundingClientRect();
  const vertical = bottom > (document.documentElement.clientHeight + (height / 8)) ? 'top' : 'bottom';
  const horizontal = right > document.documentElement.clientWidth ? 'right' : 'left';
  return `${vertical}-${horizontal}`;
}

const style = {
  '--text': '#000',
  '--main-bg': '#FFF',
  '--selected-text': '#FFF',
  '--selected-bg':' #5164F9',
  '--icon':' #8C9EB7',
  '--border': '#CFDAE9',
  '--radius': '0.625rem',
}

export {
  getYearsArr,
  getCalendarPosition,
  style,
}
