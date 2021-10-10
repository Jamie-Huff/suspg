export function getElectricConsumption(data) {
  console.log(data)
}

export function getConsumption(data, utility) {
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
      console.log(month)
      if (yearObj['year'] === year && (!yearObj['months'][month].includes(bill[consumptionParameter]))) {
        yearObj['months'][month].push(Number(bill[consumptionParameter]))
      }
    }
  }
  console.log(yearsAndMonths)
  return yearsAndMonths
}

export function getGasConsumption(data) {

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