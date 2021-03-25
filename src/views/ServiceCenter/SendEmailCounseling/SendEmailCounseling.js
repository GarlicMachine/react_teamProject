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
import EmailData from '../../users/EmailData'

const SendEmailCounseling = () => {
    const fields = ['title','content', 'date', 'id', 'submit']
   
    return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              이메일 상담 리스트
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={EmailData}
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

export default SendEmailCounseling
