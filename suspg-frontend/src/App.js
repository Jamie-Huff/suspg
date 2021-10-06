import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  // const { waterBill, gasBill, electricityBill, setWaterBill, setGasBill, setElectrictyBill } = useApplicationData()

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
    </div>
  );
}

export default App;
