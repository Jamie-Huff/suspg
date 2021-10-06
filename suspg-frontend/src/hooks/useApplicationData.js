
import { useState, useEffect } from "react";
import axios from "axios";


//declare state
export default function useApplicationData() {
const [gasBill, setGasBill] = useState(null);
const [waterBill, setWaterBill] = useState(null);
const [electricityBill, setElectricityBill] = useState(null);

//to fetch cart from the back end
  const getGas = async () => {
    try{
      const { data } = await axios.get('http://localhost:3000/gas-bill-data')
      if(data) {
        //make sure the cart is the way they are defined for the front end
        const newGasBill = data
        setGasBill(newGasBill);
      }
    }catch(err) {
      console.log(err);
    }
  }

//to fetch cart from the back end
  const getWater = async () => {
    try{
      const { data } = await axios.get('http://localhost:3000/water-bill-data')
      if(data) {
        //make sure the cart is the way they are defined for the front end
        const newWaterBill = data
        setWaterBill(newWaterBill);
      }
    }catch(err) {
      console.log(err);
    }
  }


//to fetch cart from the back end
  const getElectricity = async () => {
    try{
      const { data } = await axios.get('http://localhost:3000/electricity-bill-data')
      if(data) {
        //make sure the cart is the way they are defined for the front end
        const newElectricityBill = data
        setElectricityBill(newElectricityBill);
      }
    }catch(err) {
      console.log(err);
    }
  }

  //On mount and refresh do these
  useEffect(() => {
    getElectricity();
    getGas();
    getWater();
  }, [waterBill, gasBill, electricityBill]);

  return {
    gasBill,
    waterBill,
    electricityBill,
    setGasBill,
    setWaterBill,
    setElectricityBill
  }
}