import React, { useState, Component } from "react";
import logo from './logo.svg';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { getGasConsumption, getWaterConsumption, getElectricConsumption} from "./helpers/filterBill";

function App() {
  const [waterChecked, setWaterChecked] = React.useState(true);
  const [gasChecked, setGasChecked] = React.useState(true);
  const [electricityChecked, setElectricityChecked] = React.useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [waterData, setWaterData] = useState(null);
  const [gasData, setGasData] = useState(null);
  const [electricityData, setElectricityData] = useState(null);
  const { waterBill, gasBill, electricityBill } = useApplicationData()


  const options = {
    title: {
      text: 'Utility Consumption'
    },
    series: [{
        name: 'Water Consumption',
        data: waterData
      },
        {
        name: 'Gas Consumption',
        data: gasData
      },
        {
        name: 'Electricity Consumption',
        data: electricityData
        }
    ],
    yAxis: {
      title: {
        text: 'Consumption ( k/Wh )'
      }
    }
  }

  const handleChangeWater = (event) => {
    const checked = event.target.checked;
    setWaterChecked(checked);
    if (checked) {
      // point names go off of their index, or the first value of  sub array
      setWaterData([['test1', 1], ['test2', 2], 3, 4])
    } else {
      setWaterData([])
    }
    console.log(getWaterConsumption(waterBill))
  };

  const handleChangeGas = (event) => {
    const checked = event.target.checked;
    setGasChecked(checked);
    if (checked) {
      setGasData([15, 13, 11, 47])
    } else {
      setGasData([])
    }
  };

  const handleChangeElectricity = (event) => {
    const checked = event.target.checked;
    setElectricityChecked(checked);
    if (checked) {
      setElectricityData([10, 23, 35, 4])
    } else {
      setElectricityData([])
    }
  };
  // https://www.npmjs.com/package/react-datepicker need to figure this part out
  const handleDateChange = (event) => {
    console.log(endDate)
  }

  return (
    <div>
      <h1>Filters</h1>
      <div>
          From
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          To
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
       
      <h2>Utility Type</h2>
        <ul>           
          <ul>
            <Checkbox
              waterChecked={waterChecked}
              onChange={handleChangeWater}
              defaultChecked={false}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Water
          </ul>          
          <ul>
            <Checkbox
              gasChecked={gasChecked}
              onChange={handleChangeGas}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Gas
          </ul>         
          <ul>
            <Checkbox
              electricityChecked={electricityChecked}
              onChange={handleChangeElectricity}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Electricity
          </ul>
        </ul>

    <div>
      <HighchartsReact 
      highcharts={Highcharts} 
      options={options}
      />
    </div>

    </div>
  );
}

export default App;
