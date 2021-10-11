export function getConsumption(data, utility, dates) {
  let consumptionParameter = ''
  if (utility === 'water') {
    consumptionParameter = 'm_3_consumption'
  } else if (utility === 'gas') {
    consumptionParameter = 'g_j_consumption'
  } else if (utility === 'electricity') {
    consumptionParameter = 'k_wh_consumption'
  }

  let years = []
  let yearsAndMonths = []
  for (const bill of data) {
    let billMonth = bill['month']
    // bills during or before 2016 start at zero index instead of 1, this takes care of that issue
      // not the best practice but will check later if theres any other way to identify this issue
    if (bill['year'] <= '2016' && utility === 'water') {
      billMonth = ((Number(bill['month']) + 1).toString())
    } else if (utility === 'gas') {
      billMonth = ((Number(bill['month']) + 1).toString())
    } else if (utility === 'electricity') {
      billMonth = ((Number(bill['month']) + 1).toString())
    }
    if (billMonth === '13') {
      continue
    }
  
    // if the years array doesn't contain the current year of the bill, add it, otherwise skip this step
    if (!years.includes(bill['year'])) {
      years.push(bill['year'])
      let obj = {}
      let yearObj = bill['year']
      obj['months'] = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []}
      obj['year'] = yearObj
      yearsAndMonths.push(obj)
    }
    let month = Number(billMonth)
    let year = bill['year']
    
    // if the year is a match, add that bills data to the specific month for that specific year
    for (const yearObj of yearsAndMonths) { 
      if (yearObj['year'] === year && (!yearObj['months'][month].includes(bill[consumptionParameter]))) {
        yearObj['months'][month].push(Number(bill[consumptionParameter]))
      }
    }
  }
  // this function filters down our dates for years
  removeNonSelectedDates(yearsAndMonths, dates)
  return yearsAndMonths
}

export function makeDataChartable(data) {
  // alldata keeps track of all the data in the array
  let alldata = []
  // sort our data by year and put it into a new variable sortedData
  let sortedData = data.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  for (const year of sortedData) {
    //console.log(year['months'])
    for (const month in year['months']) {
      alldata.push(year['months'][month][0])
    }
  }
  return alldata
}

export function filterDate(to, from) {
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



export function removeNonSelectedDates(billData, dates) {
  let startDate = dates[0]
  let endDate = dates[1]
  let lowerRemovedYear = []
  let higherRemovedYear = []
  // sort the years in order
  billData.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  let billDataYearsRemoved = []
  // if a year is higher than the min, add it to the array, otherwise continue
  for (let year of billData) {
    console.log(year['year'])
    if (Number(year['year']) < Number(startDate[1])) {
      lowerRemovedYear.push(year['year'])
      continue
    }
    if (Number(year['year']) > Number(endDate[1])) {
      higherRemovedYear.push(year['year'])
      continue
    }

    // all the years above and below are removed. We need to tackle months
    if (Number(year['year']) === Number(startDate[1])) {
      // using this we can get the array that holds the values for that month
                  console.log(year['months']['1'])
      // with that value, we make a new empty variable called 'fixedYear' which will contain our year with our parsed months
      let fixedYear = {months: {}, year: year['year']}
      let i = 1
      // filter out months that are lower than the starting month
      // add them to a new array values fixedYear
      for (const months in year['months']) {
        if (Number(months) < startDate[0]) {
          i++
          continue
        } else {
          let array = {}
          fixedYear['months'][i] = year['months'][months]
          i++
        }
        // if the month number is less than this, we need to remove it or maybe in our case
        // we need to add the acceptable months to an array
        //console.log(Number(months), startDate[0])
      }
      billDataYearsRemoved.push(fixedYear)
      continue
    }
    billDataYearsRemoved.push(year)
  }
  // console.log(startDate, endDate)
  // console.log(lowerRemovedYear, higherRemovedYear)
  // console.log(billDataYearsRemoved)
  console.log(billDataYearsRemoved)
  return billDataYearsRemoved
}

