import React from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CDataTable, CButton} from '@coreui/react';
import LoansData from '../../users/LoansData'

const LoanList = () => {
    const fields = ['d_Key', 'ID', 'd_name', 'account', 'd_start_date', 'd_end_date', 'd_amount', 'd_state', 'loans_approve']

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            대출승인 요청 리스트
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={LoansData}
                                fields={fields}
                                itemsPerPage={10}
                                pagination
								scopedSlots = {{
									'loans_approve' : 
									(item)=>(
									<td>
										<CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1">승인</CButton>
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

export default LoanList