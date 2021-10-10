import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {GasConsumption} from '../models';
import csv from 'csv-parser';
import fs = require('fs');

@injectable({scope: BindingScope.TRANSIENT})
export class GasBillDataService {
  constructor(/* Add @inject to inject parameters */) { }

  async getAll(
    filter?: Filter<GasConsumption>,
  ): Promise<Array<GasConsumption>> {
    return new Promise<Array<GasConsumption>> ((resolve,reject)=>{
      let records: Array<GasConsumption> = [];

      fs.createReadStream('./data/gas_bill_data.csv')
      .pipe(csv())
      .on('data', (row) => {
        records.push(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(records);
      });
    });
  }
}
