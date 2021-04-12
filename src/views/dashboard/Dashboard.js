import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'
import LoanChart from '../charts/LoanChart.js'
import SavingsChart from '../charts/SavingsChart.js'
import Subscription from '../charts/Subscription.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  return (
    <>
      <CCard> 
        <CCardBody style={{width:"100%",height:"300px",float:"left"}}>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">상품가입자 비율</h4>
            </CCol>
            
            <CCol>
              <h4 id="traffic" className="card-title mb-0">예/적금</h4>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
                <Subscription style={{ width:"30%",height: '200px', marginTop: '40px'}}/>
            </CCol>
            
            <CCol>
                <SavingsChart style={{ width:"70%",height: '200px', marginTop: '40px'}}/>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">대출</h4>
            </CCol>
          </CRow>
          <LoanChart  style={{height: '200px', marginTop: '60px'}}/>
        </CCardBody>
        
       
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">펀드</h4>
            </CCol>
          </CRow>
          <MainChartExample style={{height: '200px', marginTop: '40px',outerWidth:'400px'}}/>
        </CCardBody>

        
      </CCard>
    </>
  )
}

export default Dashboard
