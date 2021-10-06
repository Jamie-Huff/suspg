import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {ElectricityConsumption} from '../models';
import csv from 'csv-parser';
import fs = require('fs');

@injectable({scope: BindingScope.TRANSIENT})
export class ElectricityBillDataService {
  constructor(/* Add @inject to inject parameters */) { }

  async getAll(
    filter?: Filter<ElectricityConsumption>,
  ): Promise<Array<ElectricityConsumption>> {
    return new Promise<Array<ElectricityConsumption>> ((resolve,reject)=>{
      let records: Array<ElectricityConsumption> = [];

      fs.createReadStream('./data/electricity_bill_data.csv')
      .pipe(csv())
      .on('data', (row) => {
        records.push(new ElectricityConsumption(row));
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(records)
        resolve(records);
      });
    });
  }
}
