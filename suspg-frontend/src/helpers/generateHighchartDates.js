export function generateHighchartDates(billData) {
  console.log(billData)
  if (billData[0] === 'months') {
    return ['Months']
  }
  let filteredDates = []
  for (const year of billData) {
    //console.log(year['months'])
    for (const month in year['months']) {
      let monthLabel = ''
      let yearLabel = year['year']
      switch(month) {
        case "1":
          monthLabel = `Jan ${yearLabel}`
          break;
        case "2":
          monthLabel = `Feb ${yearLabel}`
          break;
        case "3":
          monthLabel = `Mar ${yearLabel}`
          break;
        case "4":
          monthLabel = `Apr ${yearLabel}`
          break;
        case "5":
          monthLabel = `May ${yearLabel}`
          break;
        case "6":
          monthLabel = `Jun ${yearLabel}`
          break;
        case "7":
          monthLabel = `Jul ${yearLabel}`
          break;
        case "8":
          monthLabel = `Aug ${yearLabel}`
          break;
        case "9":
          monthLabel = `Sep ${yearLabel}`
          break;
        case "10":
          monthLabel = `Oct ${yearLabel}`
          break;
        case "11":
          monthLabel = `Nov ${yearLabel}`
          break;
        case "12":
          monthLabel = `Dec ${yearLabel}`
          break;
      }
      filteredDates.push(monthLabel)
    }
  }
  //return ['test', 'test2', 'test3']
  return filteredDates
}