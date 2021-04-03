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
      '/FundChart'
  );
  return response.data;
}

//props
const MainChartExample = attributes => {
  
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
    const data1 = [fundChart[0].합계,
                    fundChart[1].합계,
                    fundChart[2].합계,
                    fundChart[3].합계,
                    fundChart[4].합계,
                    fundChart[5].합계,
                    fundChart[6].합계,
                    fundChart[7].합계,
                    fundChart[8].합계,
                    fundChart[9].합계,
                    fundChart[10].합계,
                    fundChart[11].합계]
    const data2 = [fundChart[0].합계*0.92,
                   fundChart[1].합계*0.92,
                   fundChart[2].합계*0.92,
                   fundChart[3].합계*0.92,
                   fundChart[4].합계*0.92,
                   fundChart[5].합계*0.92,
                   fundChart[6].합계*0.92,
                   fundChart[7].합계*0.92,
                   fundChart[8].합계*0.92,
                   fundChart[9].합계*0.92,
                   fundChart[10].합계*0.92,
                   fundChart[11].합계*0.92]
    const data3 = [fundChart[0].합계*0.08,
                  fundChart[1].합계*0.08,
                  fundChart[2].합계*0.08,
                  fundChart[3].합계*0.08,
                  fundChart[4].합계*0.08,
                  fundChart[5].합계*0.08,
                  fundChart[6].합계*0.08,
                  fundChart[7].합계*0.08,
                  fundChart[8].합계*0.08,
                  fundChart[9].합계*0.08,
                  fundChart[10].합계*0.08,
                  fundChart[11].합계*0.08]

    return [
      {
        label: '펀드 수입',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      },
      {
        label: '펀드 등록자',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2
      },
      {
        label: '',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
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


export default MainChartExample
