import React from 'react'
import { CChartBar, CChartLine, CChartPie, CChartRadar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useAsync } from 'react-async';
import axios from 'axios';

const brandSuccess = getStyle('success') || '#5858FA'
const brandInfo = getStyle('info') || '#FE2E64'
const brandDanger = getStyle('danger') || '#f86c6b'


async function getUsers() {
  const response = await axios.get(
      '/SubscriptionChart'
  );
  return response.data;
}

//props
const Subscription = attributes => {
  
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
    
    const data2 = [fundChart[0].예금,fundChart[0].적금,fundChart[0].대출]

    return [
      {
        labels: [
          "예금","적금","대출"
        ],
        backgroundColor: 'transparent',
        backgroundColor: brandSuccess,
        borderColor: brandSuccess,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        
        borderWidth: 2,
        data: data2
      }
    ]
  })()
  
  const defaultOptions = (()=>{
    return {
      
        maintainAspectRatio: false,
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
    <CChartPie
    labels= {[
      "예금","적금","대출"
    ]}
    style={{width:'100%',float:'left' ,height:"300px"}}
    radius={1}
    datasets={defaultDatasets}
    options={defaultOptions}/>
  )
}

export default Subscription
