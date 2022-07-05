import Head from 'next/head'
import Image from 'next/image'
import querystring from 'querystring'
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

import { Doughnut, Line } from "react-chartjs-2";


 
function Dashboard(props) {
  const { responseData } = props;
  const initialDataSetMood = {
    labels: [
      'Depressed',
      'Sad',
      'Happy',
      'Elated'
    ],
    datasets: []
  };

  const initialDataSetEnergy = {
    labels: [
      'High Energy',
      'Chill'
    ],
    datasets: [{
      data: [20,30],
      backgroundColor: [
      '#FF6384',
      '#36A2EB'
      ],
      label: 'Song By Energy'
    }]
  };

  const initialDataSetDance = {
    labels: [
      'Party',
      'Relax'
    ],
    datasets: [{
      data: [0,0],
      backgroundColor: [
      '#FF6384',
      '#36A2EB'
      ],
      label: 'Song By Dancebility'
    }]
  };

  const initialDataSetAcousticness = {
    labels: [
      'Acoustic',
      'Non Acoustic'
    ],
    datasets: [{
      data: [0,0],
      backgroundColor: [
      '#FF6384',
      '#36A2EB'
      ],
      label: 'Song By Acousticness'
    }]
  };

  const initialDataSetYear = {
    labels: [
      '1940',
      '1950',
      '1960',
      '1970',
      '1980',
      '1990',
      '2000',
      '2010',
      '2020'
    ],
    datasets: [{
      data: [0,0,0,0,0,0,0,0,0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      label: 'Song By Year'
    }]
  };
  const [data, setData] = useState(null)
  const [dataUser, setDataUser] = useState({
    display_name: "",
    id: "",
    email: ""
  })
  const [dataSetMood, setDataSetMood] = useState(initialDataSetMood)
  const [dataSetEnergy, setDataSetEnergy] = useState(initialDataSetEnergy)
  const [dataSetDance, setDataSetDance] = useState(initialDataSetDance)
  const [dataSetAcousticness, setDataSetAcousticness] = useState(initialDataSetAcousticness)
  const [dataSetYear, setDataSetYear] = useState(initialDataSetYear)
  const [isLoading, setLoading] = useState(false)

  

  function handleDataSetMood(dataMood){
    var tempMood = initialDataSetMood;

    console.log(dataMood.depressed.count)
    tempMood.datasets[{
      data: [
        dataMood.depressed.count,
        dataMood.sad.count,
        dataMood.happy.count,
        dataMood.elated.count,
      ],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#69bebf'
      ]
    }]
    setDataSetMood(tempMood);
  }

  function handleDataSetEnergy(dataEnergy){
    var tempEnergy = initialDataSetEnergy;
    tempEnergy.datasets[0].data = [
      dataEnergy.high_energy.count,
      dataEnergy.chill.count
    ]
    setDataSetEnergy(tempEnergy);
  }

  function handleDataSetDance(dataDance){
    var tempDance = initialDataSetDance;
    tempDance.datasets[0].data = [
      dataDance.party.count,
      dataDance.relax.count
    ]
    setDataSetDance(tempDance);
  }


  function handleDataSetAcousticness(dataAcousticness){
    var tempAcousticness = initialDataSetAcousticness;
    tempAcousticness.datasets[0].data = [
      dataAcousticness.acoustic.count,
      dataAcousticness.non_acoustic.count
    ]
    setDataSetAcousticness(tempAcousticness);
  }

  function handleDataSetYear(dataYear){
    var tempYear = initialDataSetYear;
    tempYear.datasets[0].data = dataYear.item.map((itemYear) => {
      return itemYear.count
    })
    setDataSetYear(tempYear);
  }

  function handleShare(){
     navigator.clipboard.writeText(process.env.BASE_URI+"/share?id="+dataUser.id);
  }

  useEffect(() => {
    const dataUser = responseData.user;
    const dataMood = responseData.mood;
    const dataAcousticness = responseData.acousticness;
    const dataDance = responseData.dance;
    const dataEnergy = responseData.energy;
    const dataYear = responseData.year;
    handleDataSetMood(dataMood)
    handleDataSetEnergy(dataEnergy)
    // handleDataSetDance(dataDance)
    // handleDataSetAcousticness(dataAcousticness)
    // handleDataSetYear(dataYear)
    setDataUser(dataUser)
  }, []);

  console.log(dataSetMood)

  return (
    <>

      <div className="p-6">

        <div className="flex mb-6 justify-between">
          <h3>{dataUser.display_name}</h3>
          
          <button onClick={handleShare}>📮</button>
        </div>
        <div className="flex lg:flex-row flex-col">
          <div className="lg:w-1/4 w-full h-96">
            <Doughnut
             data={dataSetMood}
            />
          </div>
          <div className="lg:w-1/4 w-full h-96">
            <Doughnut
             data={dataSetEnergy}
            />
          </div>
          <div className="lg:w-1/4 w-full h-96">
            <Doughnut
             data={dataSetDance}
            />
          </div>
          <div className="lg:w-1/4 w-full h-96">
            <Doughnut
             data={dataSetAcousticness}
            />
          </div>
        </div>

        <div className="flex">
          <div className="w-full h-96">
            <Line
             data={dataSetYear}
            />
          </div>
        </div>
      </div>   
    </>
  )
}
export default Dashboard;
