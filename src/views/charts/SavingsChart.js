import React from 'react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useAsync } from 'react-async';
import axios from 'axios';

const brandSuccess = getStyle('success') || '#5858FA'
const brandInfo = getStyle('info') || '#FE2E64'
const brandDanger = getStyle('danger') || '#f86c6b'


async function getUsers() {
  const response = await axios.get(
      '/savingsChart'
  );
  return response.data;
}

//props
const SavingsChart = attributes => {
  
  const { data: fundChart, error, isLoading, reload } = useAsync({
    promiseFn: getUsers
  });


  const random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!fundChart) return <button onClick={reload}>불러오기</button>;
  
  const defaultDatasets = (()=>{
    let elements = 11
    /* 날짜"+
", NVL(SUM(l.d_balance),0) as 원금 "+
", NVL(SUM(h1.d_his_amount),0) as 원금상환 "+
", NVL(SUM(h2.d_his_amount),0) as 이자상환 "+
", NVL(SUM(h3.d_his_amount),0) as 중도상환수수료 "+
", NVL(SUM(h4.d_his_amount),0) as 연체료 */

    const data2 = [fundChart[0].예금,
                   fundChart[1].예금,
                   fundChart[2].예금,
                   fundChart[3].예금,
                   fundChart[4].예금,
                   fundChart[5].예금,
                   fundChart[6].예금,
                   fundChart[7].예금,
                   fundChart[8].예금,
                   fundChart[9].예금,
                   fundChart[10].예금,
                   fundChart[11].예금]
                   
    const data3 = [fundChart[0].적금,
                  fundChart[1].적금,
                  fundChart[2].적금,
                  fundChart[3].적금,
                  fundChart[4].적금,
                  fundChart[5].적금,
                  fundChart[6].적금,
                  fundChart[7].적금,
                  fundChart[8].적금,
                  fundChart[9].적금,
                  fundChart[10].적금,
                  fundChart[11].적금]

    return [
      {
        label: '예금이자',
        backgroundColor: 'transparent',
        backgroundColor: brandSuccess,
        borderColor: brandSuccess,
        hoverBackgroundColor: brandSuccess,
        hoverBorderColor: brandSuccess,
        borderWidth: 2,
        data: data2
      },
      {
        label: '적금이자',
        backgroundColor: 'transparent',
        backgroundColor: brandInfo,
        borderColor: brandInfo,
        hoverBackgroundColor: brandInfo,
        hoverBorderColor: brandInfo,
        borderWidth: 1,
        data: data3
      } 
    ]
  })()
  
  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()
{/* <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={[fundChart[0].날짜,
                fundChart[1].날짜,
                fundChart[2].날짜,
                fundChart[3].날짜,
                fundChart[4].날짜,
                fundChart[5].날짜,
                fundChart[6].날짜,
                fundChart[7].날짜,
                fundChart[8].날짜,
                fundChart[9].날짜,
                fundChart[10].날짜,
                fundChart[11].날짜]}
    /> */}
  // render
  return (
    <CChartBar 
    style={{width:'100%',float:'left' ,height:"300px"}}
    datasets={defaultDatasets}
    options={defaultOptions}
    labels={[fundChart[0].날짜,
              fundChart[1].날짜,
              fundChart[2].날짜,
              fundChart[3].날짜,
              fundChart[4].날짜,
              fundChart[5].날짜,
              fundChart[6].날짜,
              fundChart[7].날짜,
              fundChart[8].날짜,
              fundChart[9].날짜,
              fundChart[10].날짜,
              fundChart[11].날짜]}/>
  )
}

export default SavingsChart
