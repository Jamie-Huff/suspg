
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
const [gasBill, setGasBill] = useState(null);
const [waterBill, setWaterBill] = useState(null);
const [electricityBill, setElectricityBill] = useState(null);

  const getGas = async () => {
    try{
      const { data } = await axios.get('http://localhost:3000/gas-bill-data')
      if(data) {
        const newGasBill = data
        setGasBill(newGasBill);
      }
    } catch(err) {
      console.log(err);
    }
  }
  const getWater = async () => {
    try{
      const { data } = await axios.get('http://localhost:3000/water-bill-data')
      if(data) {
        const newWaterBill = data
        setWaterBill(newWaterBill);
      }
    }catch(err) {
      console.log(err);
    }
  }

  const getElectricity = async () => {
    try{
      const { data } = await axios.get('http://localhost:3000/electricity-bill-data')
      if(data) {
        const newElectricityBill = data
        setElectricityBill(newElectricityBill);
      }
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getElectricity();
    getGas();
    getWater();
  }, []);

  return {
    gasBill,
    waterBill,
    electricityBill,
    setGasBill,
    setWaterBill,
    setElectricityBill
  }
}