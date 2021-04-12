import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useAsync } from 'react-async';
import axios from 'axios';

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'


async function getUsers() {
  const response = await axios.get(
      '/loanChart'
  );
  return response.data;
}

//props
const LoanChart = attributes => {
  
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

    const data2 = [fundChart[0].원금,
                   fundChart[1].원금,
                   fundChart[2].원금,
                   fundChart[3].원금,
                   fundChart[4].원금,
                   fundChart[5].원금,
                   fundChart[6].원금,
                   fundChart[7].원금,
                   fundChart[8].원금,
                   fundChart[9].원금,
                   fundChart[10].원금,
                   fundChart[11].원금]
                   
    const data3 = [fundChart[0].원금상환,
                  fundChart[1].원금상환,
                  fundChart[2].원금상환,
                  fundChart[3].원금상환,
                  fundChart[4].원금상환,
                  fundChart[5].원금상환,
                  fundChart[6].원금상환,
                  fundChart[7].원금상환,
                  fundChart[8].원금상환,
                  fundChart[9].원금상환,
                  fundChart[10].원금상환,
                  fundChart[11].원금상환]

    const data4 = [fundChart[0].이자상환,
                  fundChart[1].이자상환,
                  fundChart[2].이자상환,
                  fundChart[3].이자상환,
                  fundChart[4].이자상환,
                  fundChart[5].이자상환,
                  fundChart[6].이자상환,
                  fundChart[7].이자상환,
                  fundChart[8].이자상환,
                  fundChart[9].이자상환,
                  fundChart[10].이자상환,
                  fundChart[11].이자상환]

    const data5 = [fundChart[0].중도상환수수료,
                  fundChart[1].중도상환수수료,
                  fundChart[2].중도상환수수료,
                  fundChart[3].중도상환수수료,
                  fundChart[4].중도상환수수료,
                  fundChart[5].중도상환수수료,
                  fundChart[6].중도상환수수료,
                  fundChart[7].중도상환수수료,
                  fundChart[8].중도상환수수료,
                  fundChart[9].중도상환수수료,
                  fundChart[10].중도상환수수료,
                  fundChart[11].중도상환수수료]
                  
    const data6 = [fundChart[0].연체료,
                  fundChart[1].연체료,
                  fundChart[2].연체료,
                  fundChart[3].연체료,
                  fundChart[4].연체료,
                  fundChart[5].연체료,
                  fundChart[6].연체료,
                  fundChart[7].연체료,
                  fundChart[8].연체료,
                  fundChart[9].연체료,
                  fundChart[10].연체료,
                  fundChart[11].연체료]
    return [
      {
        label: '원금상환',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data3
      },
      {
        label: '이자상환',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: "rgba(125, 107, 25, 0.1)",
        borderWidth: 1,
        data: data4
      } ,
      {
        label: '중도상환수수료',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: "rgba(15, 107, 255, 0.1)",
        borderWidth: 1,
        data: data5
      }  ,
      {
        label: '연체료',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        data: data6
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

  // render
  return (
    <CChartLine
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
    />
  )
}


export default LoanChart
