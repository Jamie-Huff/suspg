


export function getElectricConsumption(data) {
  console.log(data)
}

export function getWaterConsumption(data) {
  let years = []
  let yearsAndMonths = []
  for (const bill of data) {
    if (!years.includes(bill['year'])) {
      years.push(bill['year'])
      let obj = {}
      let yearObj = bill['year']
      obj['months'] = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []}
      obj['year'] = yearObj
      yearsAndMonths.push(obj)
    }
    let month = Number(bill['month'])
    let year = bill['year']
    

    for (const yearObj of yearsAndMonths) { 
      if (yearObj['year'] === year) {
        //yearObj['months'][month].push(bill['m_3_consumption'])
        yearObj['months'][month].push({ consumption: bill['m_3_consumption'], date: `${bill['year']}-${bill['month']}`, id: bill['id'] })
      }
    }
  }
  console.log(yearsAndMonths)
  // 2016 and earlier The months start at zero index instead of 1
  // Need to account for specific dates
}

export function getGasConsumption(data) {

}