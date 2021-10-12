import React, { useState, Component } from "react";
import './styles/App.css';
import useApplicationData from './hooks/useApplicationData';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { getConsumption, makeDataChartable } from "./helpers/filterBill";
import { generateHighchartDates } from "./helpers/generateHighchartDates"
import { datesToArray } from "./helpers/datesToArray"
import { FaWater, FaGasPump } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  water: {
    color: "#6EC1E4",
    width: 36,
    height: 36,
    transform: "scale(2)",
  },
  gas: {
    color: "#54595F",
    width: 36,
    height: 36,
    transform: "scale(2)"
  },
  electricity: {
    color: "#61CE70",
    width: 36,
    height: 36,
    transform: "scale(2)"
  }

}))

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
  const classes = useStyles();
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
        name: 'Electricity Consumption ( Kilowatt Hours )',
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
      let waterBillConsumption = getConsumption(waterBill, 'water', dates)
      let mappingdata = makeDataChartable(waterBillConsumption)
      setWaterData(mappingdata)
      setHighchartDates(generateHighchartDates(waterBillConsumption))
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
      let dates = datesToArray(startDate, endDate)
      let gasBillConsumption = getConsumption(gasBill, 'gas', dates)
      let mappingdata = makeDataChartable(gasBillConsumption)
      setGasData(mappingdata)
      setHighchartDates(generateHighchartDates(gasBillConsumption))
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
      let dates = datesToArray(startDate, endDate)
      let electricityBillConsumption = getConsumption(electricityBill, 'electricity', dates)
      let mappingdata = makeDataChartable(electricityBillConsumption)
      setElectricityData(mappingdata)
      setHighchartDates(generateHighchartDates(electricityBillConsumption))
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

  return (
    <div>
      <div className={'top-head'}>
        <img src="/images/spg-head.png" className={'top-bar-logo'}></img>
        <div>
      <h1 className={'top-head-text'}>SPG Customer Consumption Metrics</h1>
      </div>
      </div>
      <div className={'float-container'}>
      <div className={'float-child'}> 
      <div className={'filter-head-container'}>
      <h2 className={'date-head'}>Filter By Date</h2>
      </div>
      <div className={'float-container'}>
      <div className={'float-child', 'calender', 'left-calender'}>
          <h3>From</h3>
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
          <h3>To</h3>
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
      <div className={'float-container-checkboxes'}>      
          <ul>
            <h3>Water</h3> 
            <div className={'float-child-checkbox'}>
            <Checkbox
              labelPlacement="top"
              icon={<FaWater/>}
              waterChecked={waterChecked}
              onChange={handleChangeWater}
              defaultChecked={false}
              inputProps={{ 'aria-label': 'controlled' }}
              className={classes.water}
            />
            
            </div>
          </ul>          
          <ul>
            <h3>Gasoline</h3>
            <div className={'float-child-checkbox'}>
            <Checkbox
              icon={<FaGasPump/>}
              gasChecked={gasChecked}
              onChange={handleChangeGas}
              defaultChecked={false}
              inputProps={{ 'aria-label': 'controlled' }}
              className={classes.gas}
            />
            </div>
          </ul>         
          <ul> 
            <h3>Electricity</h3>
            <div className={'float-child-checkbox'}>
            <Checkbox
              icon={<BsFillLightningFill/>}
              electricityChecked={electricityChecked}
              onChange={handleChangeElectricity}
              inputProps={{ 'aria-label': 'controlled' }}
              className={classes.electricity}
            />
           
            </div>
          </ul>
        </div>
      </div>
      </div>

    <div className={'chart-container'}>
      <HighchartsReact 
      highcharts={Highcharts} 
      options={options}
      />
    </div>

    </div>
  );
}

export default App;
