import React, { useState, Component } from "react";
import logo from './logo.svg';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

function App() {
  // issues: 
    // 1: This variable where we import our data is causing the webpage to die? im geussing infinite loadding?
        //const { waterBill, gasBill, electricityBill, setWaterBill, setGasBill, setElectrictyBill } = useApplicationData()'
    // 2: Figure out how to use the pages state to display nothing a first, 
        //then display various data depending on what checkbox

  const [waterChecked, setWaterChecked] = React.useState(true);
  const [gasChecked, setGasChecked] = React.useState(true);
  const [electricityChecked, setElectricityChecked] = React.useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChangeWater = (event) => {
    setWaterChecked(event.target.checked);
  };

  const handleChangeGas = (event) => {
    setGasChecked(event.target.checked);
  };

  const handleChangeElectricity = (event) => {
    setElectricityChecked(event.target.checked);
  };
  // https://www.npmjs.com/package/react-datepicker need to figure this part out
  const handleDateChange = (event) => {
    console.log(endDate)
  }

  const options = {
    title: {
      text: 'Utility Consumption'
    },
    series: [{
        name: 'power',
        data: [100, 200, 30, 100, 30, 50, 100]
      }],
    yAxis: {
      title: {
        text: 'Consumption ( k/Wh )'
      }
    }
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
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Electricity
          </ul>
          <ul>
            <Checkbox
              gasChecked={gasChecked}
              onChange={handleChangeGas}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Water
          </ul>
          <ul>
            <Checkbox
              electricityChecked={electricityChecked}
              onChange={handleChangeElectricity}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            Gas
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
