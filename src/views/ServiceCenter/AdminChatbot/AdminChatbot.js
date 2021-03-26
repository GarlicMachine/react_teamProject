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
const AdminChatbot = () => {
    const fields = ['title','content', 'date', 'id', 'submit']
    return (
    <>
  
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              챗봇 키워드 관리
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
                      <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1">등록</CButton>
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

export default AdminChatbot
