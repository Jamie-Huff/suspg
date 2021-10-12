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
    // handle the issues of there being 13 months
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
  return removeNonSelectedDates(yearsAndMonths, dates)
}


export function makeDataChartable(data) {
  // alldata keeps track of all the data in the array
  let alldata = []
  // sort our data by year and put it into a new variable sortedData
  let sortedData = data.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  for (const year of sortedData) {
    for (const month in year['months']) {
      alldata.push(year['months'][month][0])
    }
  }
  return alldata
}


export function removeNonSelectedDates(billData, dates) {
  let startDate = dates[0]
  let endDate = dates[1]
  // sort the years in order
  billData.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  let billDataYearsRemoved = []
  // if a year is higher than the min, add it to the array, otherwise continue
  for (let year of billData) {
    // if year too low, skip
    if (Number(year['year']) < Number(startDate[1])) {
      continue
    }
    // if year too high skip
    if (Number(year['year']) > Number(endDate[1])) {
      continue
    }
    // if same year for both start date and end date
    if (Number(year['year']) === Number(startDate[1]) && Number(year['year']) === Number(endDate[1])) {
      let fixedYear = {months: {}, year: year['year']}
      let i = 1
      console.log(startDate[0], endDate[0])
      for (const months in year['months']) {
        if (Number(months) < startDate[0] || Number(months) > endDate[0]) {
          i++
          continue
        } else {
          fixedYear['months'][i] = year['months'][months]
          i++
        }
      }
      console.log(fixedYear)
      billDataYearsRemoved.push(fixedYear)
      continue
    }

    // if year same, remove months before than the starting month selected
    if (Number(year['year']) === Number(startDate[1])) {
      let fixedYear = {months: {}, year: year['year']}
      let i = 1
      for (const months in year['months']) {
        if (Number(months) < startDate[0]) {
          i++
          continue
        } else {
          fixedYear['months'][i] = year['months'][months]
          i++
        }
      }
      billDataYearsRemoved.push(fixedYear)
      continue
    }
    // if year same, remove months after the ending month selected
    if (Number(year['year']) === Number(endDate[1])) {
      let fixedYear = {months: {}, year: year['year']}
      let i = 1
      // filter out months that are lower than the starting month
      // add them to a new array values fixedYear
      for (const months in year['months']) {
        if (Number(months) > endDate[0]) {
          i++
          continue
        } else {
          fixedYear['months'][i] = year['months'][months]
          i++
        }
      }
      billDataYearsRemoved.push(fixedYear)
      continue
    }
    billDataYearsRemoved.push(year)
  }
  return billDataYearsRemoved
}

