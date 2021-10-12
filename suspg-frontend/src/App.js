import React, { useState, Component } from "react";
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { getConsumption, makeDataChartable } from "./helpers/filterBill";
import { generateHighchartDates } from "./helpers/generateHighchartDates"
import { datesToArray } from "./helpers/datesToArray"
//import "./styles/datepicker.scss"
// need to do: make the handlechange functions just 1 function
// render dates at every instance of rerendering bill components
// show only dates within that specific timeline

// update variable names in bill renderers
// make the text for the y axis re render with all the correct parameters

function App() {
  const [waterChecked, setWaterChecked] = React.useState(true);
  const [gasChecked, setGasChecked] = React.useState(true);
  const [electricityChecked, setElectricityChecked] = React.useState(true);
  const [startDate, setStartDate] = useState(new Date("2010-01-02")); // year // mm // day
  const [endDate, setEndDate] = useState(new Date());
  const [waterData, setWaterData] = useState([false]);
  const [gasData, setGasData] = useState([false]);
  const [electricityData, setElectricityData] = useState([false]);
  const { waterBill, gasBill, electricityBill } = useApplicationData()
  const [highchartDates, setHighchartDates] = useState(generateHighchartDates(['months']))
  

  //setHighchartDates = generateDates(mappingData)

  const options = {
    title: {
      text: 'Utility Consumption'
    },
    series: [{
        name: 'Water Consumption ( Cubic Meters )',
        data: waterData
      },
        {
        name: 'Gas Consumption ( Gigajoules )',
        data: gasData
      },
        {
        name: 'Electricity Consumption ( kilowatt Hours )',
        data: electricityData
        }
    ],
    yAxis: {
      title: {
        text: 'Consumption'
      }
    },
    xAxis: {
      categories: highchartDates
    }
  }


  const handleChangeWater = (event) => {
    const checked = event.target.checked;
    setWaterChecked(checked);
    if (checked) {
      // point names go off of their index, or the first value of  sub array
      let dates = datesToArray(startDate, endDate)
      let test = getConsumption(waterBill, 'water', dates)
      let mappingdata = makeDataChartable(test)
      setWaterData(mappingdata)
      setHighchartDates(generateHighchartDates(test))
      // ------------- need to run the date also when ever we update our data -------------------
    } else {
      setWaterData([false])
      if (electricityData[0] === false && gasData[0] === false) {
      setHighchartDates(generateHighchartDates(['months']))
      }
    }
  };

  const handleChangeGas = (event) => {
    const checked = event.target.checked;
    setGasChecked(checked);
    if (checked) {
      // point names go off of their index, or the first value of  sub array
      let dates = datesToArray(startDate, endDate)
      let test = getConsumption(gasBill, 'gas', dates)
      let mappingdata = makeDataChartable(test)
      setGasData(mappingdata)
      setHighchartDates(generateHighchartDates(test))
    } else {
      setGasData([false])
      if (electricityData[0] === false && waterData[0] === false) {
        setHighchartDates(generateHighchartDates(['months']))
        }

    }
  };

  const handleChangeElectricity = (event) => {
    const checked = event.target.checked;
    setElectricityChecked(checked);
    if (checked) {
      // point names go off of their index, or the first value of  sub array
      let dates = datesToArray(startDate, endDate)
      let billData = getConsumption(electricityBill, 'electricity', dates)
      let mappingdata = makeDataChartable(billData)
      setElectricityData(mappingdata)
      setHighchartDates(generateHighchartDates(billData))
    } else {
      setElectricityData([false])
      if (waterData[0] === false && gasData[0] === false) {
        setHighchartDates(generateHighchartDates(['months']))
        }
    }
  };

  const datesToArrays = (startDate, endDate, waterData, gasData, electricityData) => {
    let startingValue = startDate
    let endingValue = endDate
    setStartDate(startingValue)
    setEndDate(endingValue)
    // this chunk of code should be in its own function thats located in helpers ------------------------------------------
    let dates = datesToArray(startingValue, endingValue)
    
    if (waterData[0] !== false) {
      // getConsumption gives us the consumption for our specificed times for the water data.
      let billData = getConsumption(waterBill, 'water', dates)
      // sets the labels on highcharts to include our billing range
      setHighchartDates(generateHighchartDates(billData))
      // makes the data manageable by highcharts
      let mappingData = makeDataChartable(billData)
      // updates our waterData state with the new mapped data 
      setWaterData(mappingData)
    }
    if (gasData[0] !== false) {
      let billData = getConsumption(gasBill, 'gas', dates)
      setHighchartDates(generateHighchartDates(billData))
      let mappingData = makeDataChartable(billData)
      setGasData(mappingData)
    }
    if (electricityData[0] !== false) {
      let billData = getConsumption(electricityBill, 'electricity', dates)
      setHighchartDates(generateHighchartDates(billData))
      let mappingData = makeDataChartable(billData)
      setElectricityData(mappingData)
    }
  }

  // https://www.npmjs.com/package/react-datepicker need to figure this part out

  return (
    <div>
      <div className={'top-head'}>
      <h1 className={'top-head-text'}>SPG Customer Consumption Metrics</h1>
      </div>
      <div className={'float-container'}>
      <div className={'float-child'}> 
      <div className={'filter-head-container'}>
      <h2 className={'date-head'}>Filter By Date</h2>
      </div>
      <div className={'float-container'}>
      <div className={'float-child', 'calender', 'left-calender'}>
          From
          <DatePicker selected={startDate} 
            onChange={(v => datesToArrays(v, endDate, waterData, gasData, electricityData))} 
            dateFormat="yyyy-MM" 
            showMonthYearPicker 
            showFullMonthYearPicker 
            showTwoColumnMonthYearPicker 
            todayButton="Today" 
            maxDate={new Date()} 
            placeholderText='Results from' 
            defaultDate={''}
          />
          </div>
          <div className={'float-child', 'calender', 'right-calender'}>
          To
          <DatePicker selected={endDate} 
            onChange={(v => datesToArrays(startDate, v, waterData, gasData, electricityData))} 
            dateFormat="yyyy-MM" 
            showMonthYearPicker 
            showFullMonthYearPicker
            showTwoColumnMonthYearPicker 
            todayButton="Today" 
            maxDate={new Date()} 
            placeholderText='Results to' 
            defaultDate={''}
          />
          </div>
      </div>
      </div>
      <div className={'float-child'}>
      <div className={'filter-head-container'}>
      <h2 className={'date-head'}>Filter By Utility</h2>
      </div>
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
      </div>
      </div>

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
