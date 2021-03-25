import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton
} from '@coreui/react'
import ReminderData from '../../users/ReminderData'

const ReminderMail = () => {
    const fields = ['date','name', 'money', 'submit']
   
    return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              채무 불이행자 목록
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={ReminderData}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'submit':
                  (item)=>(
                    <td>
                      <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1">발송</CButton>
                    </td>
                  )

              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
     
    </>
  )
}

export default ReminderMail
