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
import FundUsersData from '../../users/FundUsersData'

const AdminChatbot = () => {
    const fields = ['fund_title','fund_content', 'fund_date', 'fund_target_amount', 'fund_list', 'fund_approve']
   
    return (
    <>
      <CRow>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              챗봇
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={FundUsersData}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'fund_approve':
                  (item)=>(
                    <td>
                      <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1">승인</CButton>
                      <CButton size="sm" className="btn-youtube btn-brand mr-1 mb-1">거절</CButton>
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
