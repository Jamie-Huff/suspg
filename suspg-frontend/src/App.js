import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import Checkbox from '@material-ui/core/Checkbox';

function App() {
  // const { waterBill, gasBill, electricityBill, setWaterBill, setGasBill, setElectrictyBill } = useApplicationData()

  const [waterChecked, setWaterChecked] = React.useState(true);
  const [gasChecked, setGasChecked] = React.useState(true);
  const [electricityChecked, setElectricityChecked] = React.useState(true);

  const handleChange = (event) => {
    setWaterChecked(event.target.checked);
    setGasChecked(event.target.checked);
    setElectricityChecked(event.target.checked);
  };

  return (
    <div>
      <h1>Filters</h1>
      <ul>
        <li>
        <div>
          From
          from: date
        </div>
        </li>
        <li>
        <div>
          To
          to: date
        </div>
        </li>
      </ul>
       
      <h2>Utility Type</h2>
    <Checkbox
      waterChecked={waterChecked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
        <Checkbox
      gasChecked={gasChecked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
        <Checkbox
      electricityChecked={electricityChecked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </div>
  );
}

export default App;
