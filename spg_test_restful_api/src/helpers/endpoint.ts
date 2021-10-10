import {ElectricityConsumption, WaterConsumption, GasConsumption} from '../models';
import csv from 'csv-parser';
import fs = require('fs');

export default function generateRoute() {
  let records: Array<ElectricityConsumption> = [];
  fs.createReadStream('./data/electricity_bill_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    records.push(new ElectricityConsumption(row));
  })
.on('end', () => {
  console.log('CSV file successfully processed');
  return records
  })
}