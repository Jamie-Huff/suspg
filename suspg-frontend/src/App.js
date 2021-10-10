import React, { useState, Component } from "react";
import logo from './logo.svg';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { getConsumption, makeDataChartable} from "./helpers/filterBill";

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
    },
    xAxis: {
      categories: ['Jan 2010', 'Feb 2010', 'Mar 2010', 'Apr 2010', 'May 2010', 'Jun 2010', 'Jul 2010', 'Aug 2010', 'Sep 2010', 'Oct 2010', 'Nov 2010', 'Dec 2010', 'Jan 2011', 'Feb 2011', 'Mar 2011', 'Apr 2011', 'May 2011', 'Jun 2011', 'Jul 2011', 'Aug 2011', 'Sep 2011', 'Oct 2011', 'Nov 2011', 'Dec 2011', 'Jan 2012', 'Feb 2012', 'Mar 2012', 'Apr 2012', 'May 2012', 'Jun 2012', 'Jul 2012', 'Aug 2012', 'Sep 2012', 'Oct 2012', 'Nov 2012', 'Dec 2012', 'Jan 2013', 'Feb 2013', 'Mar 2013', 'Apr 2013', 'May 2013', 'Jun 2013', 'Jul 2013', 'Aug 2013', 'Sep 2013', 'Oct 2013', 'Nov 2013', 'Dec 2013', 'Jan 2014', 'Feb 2014', 'Mar 2014', 'Apr 2014', 'May 2014', 'Jun 2014', 'Jul 2014', 'Aug 2014', 'Sep 2014', 'Oct 2014', 'Nov 2014', 'Dec 2014', 'Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015', 'Jul 2015', 'Aug 2015', 'Sep 2015', 'Oct 2015', 'Nov 2015', 'Dec 2015', 'Jan 2016', 'Feb 2016', 'Mar 2016', 'Apr 2016', 'May 2016', 'Jun 2016', 'Jul 2016', 'Aug 2016', 'Sep 2016', 'Oct 2016', 'Nov 2016', 'Dec 2016', 'Jan 2017', 'Feb 2017', 'Mar 2017', 'Apr 2017', 'May 2017', 'Jun 2017', 'Jul 2017', 'Aug 2017', 'Sep 2017', 'Oct 2017', 'Nov 2017', 'Dec 2017', 'Jan 2018', 'Feb 2018', 'Mar 2018', 'Apr 2018', 'May 2018', 'Jun 2018', 'Jul 2018', 'Aug 2018', 'Sep 2018', 'Oct 2018', 'Nov 2018', 'Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019', 'May 2019', 'Jun 2019', 'Jul 2019', 'Aug 2019', 'Sep 2019', 'Oct 2019', 'Nov 2019', 'Dec 2019', 'Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020', 'Jul 2020', 'Aug 2020', 'Sep 2020', 'Oct 2020', 'Nov 2020', 'Dec 2020']
    }
  }

  const handleChangeWater = (event) => {
    // current error: on third click program errors out, probably because of the thirteen number
    const checked = event.target.checked;
    setWaterChecked(checked);
    if (checked) {
      // point names go off of their index, or the first value of  sub array
      setWaterData([['Apr', 1], ['test2', 2], 3, 4])
      let test = getConsumption(waterBill, 'water')
      let mappingdata = makeDataChartable(test)
      setWaterData(mappingdata)
      // getWaterConsumption(waterBill) gets us all of the data we could need sorted into years and month.
      // next we need to worry aobut mapping it
    } else {
      setWaterData([])
    }
  };

  const handleChangeGas = (event) => {
    const checked = event.target.checked;
    setGasChecked(checked);
    if (checked) {
      // point names go off of their index, or the first value of  sub array
      setGasData([['Apr', 1], ['test2', 2], 3, 4])
      let test = getConsumption(gasBill, 'gas')
      let mappingdata = makeDataChartable(test)
      setGasData(mappingdata)
      // getWaterConsumption(waterBill) gets us all of the data we could need sorted into years and month.
      // next we need to worry aobut mapping it
    } else {
      setGasData([])
    }
  };

  const handleChangeElectricity = (event) => {
    const checked = event.target.checked;
    setElectricityChecked(checked);
    if (checked) {
      // point names go off of their index, or the first value of  sub array
      setElectricityData([['Apr', 1], ['test2', 2], 3, 4])
      let test = getConsumption(electricityBill, 'electricity')
      let mappingdata = makeDataChartable(test)
      setElectricityData(mappingdata)
      // getWaterConsumption(waterBill) gets us all of the data we could need sorted into years and month.
      // next we need to worry aobut mapping it
    } else {
      setElectricityData([])
    }
  };
  // https://www.npmjs.com/package/react-datepicker need to figure this part out
  const handleChange = date => {
    const valueOfInput = date;
    console.log(valueOfInput)
  };

  return (
    <div>
      <h1>Filters</h1>
      <div>
          From
          <DatePicker selected={startDate} onChange={handleChange} dateFormat="yyyy-MM" showMonthYearPicker showFullMonthYearPicker showTwoColumnMonthYearPicker todayButton="Today" maxDate={new Date()} placeholderText='Results from:' defaultDate={''}/>
          To
          <DatePicker selected={startDate} onChange={handleChange} dateFormat="yyyy-MM" showMonthYearPicker showFullMonthYearPicker showTwoColumnMonthYearPicker todayButton="Today" maxDate={new Date()} placeholderText='Results to:' defaultDate={''}/>
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
              defaultChecked={false}
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
