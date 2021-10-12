
const monthStringToNumber = (datesArray) => {
  for (const date of datesArray) {
    switch (date[0]) {
      case "Jan":
        date[0] = 1
        break;
      case "Feb":
        date[0] = 2
        break;
      case "Mar":
        date[0] = 3
        break;
      case "Apr":
        date[0] = 4
        break;
      case "May":
        date[0] = 5
        break;
      case "Jun":
        date[0] = 6
        break;
      case "Jul":
        date[0] = 7
        break;
      case "Aug":
        date[0] = 8
        break;
      case "Sep":
        date[0] = 9
        break;
      case "Oct":
        date[0] = 10
        break;
      case "Nov":
        date[0] = 11
        break;
      case "Dec":
        date[0] = 12
        break;
    }
  }
  return datesArray
}

export function datesToArray(to, from) {
  // take in our big long strings of date data, and turn them into 2 manageable arrays with [month , year]
  let datesArray = []
  let startDateValueArray = to.toString().split(" ")
  startDateValueArray.shift()
  startDateValueArray.splice(3)
  startDateValueArray.splice(1, 1)
  let endDateValueArray = from.toString().split(" ")
  endDateValueArray.shift()
  endDateValueArray.splice(3)
  endDateValueArray.splice(1, 1)
  datesArray.push(startDateValueArray, endDateValueArray)
  datesArray = monthStringToNumber(datesArray)
  return datesArray
}
