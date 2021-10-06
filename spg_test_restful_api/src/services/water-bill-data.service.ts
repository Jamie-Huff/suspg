import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {WaterConsumption} from '../models';
import csv from 'csv-parser';
import fs = require('fs');

@injectable({scope: BindingScope.TRANSIENT})
export class WaterBillDataService {
  constructor(/* Add @inject to inject parameters */) { }

  async getAll(
    filter?: Filter<WaterConsumption>,
  ): Promise<Array<WaterConsumption>> {
    return new Promise<Array<WaterConsumption>> ((resolve,reject)=>{
      let records: Array<WaterConsumption> = [];

      fs.createReadStream('./data/electricity_bill_data.csv')
      .pipe(csv())
      .on('data', (row) => {
        records.push(new WaterConsumption(row));
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(records);
      });
    });
  }
}
