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

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody></CCardBody>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">펀드 수익율</h4>
            </CCol>
          </CRow>
          <MainChartExample style={{height: '200px', marginTop: '40px',outerWidth:'400px'}}/>
        </CCardBody>
        
        <MainChartExample style={{height: '200px', marginTop: '40px'}}/>
        
        <MainChartExample style={{height: '200px', marginTop: '40px'}}/>
        
        <MainChartExample style={{height: '200px', marginTop: '40px'}}/>
      </CCard>
    </>
  )
}

export default Dashboard
