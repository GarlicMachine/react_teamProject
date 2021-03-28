import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CDataTable, CButton, CForm, CPagination} from '@coreui/react';
import LoansData from '../../users/LoansData'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { useAsync } from 'react-async';

async function getLoanList() {
    console.log('getLoanList_1')
    const response = await axios.get(
        '/Loan/LoanList/'
    );
    console.log('getLoanList_2')
    return response.data;
}

const LoanList = ({match}) => {
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)
    const pageChange = newPage => {
        currentPage !== newPage && history.push('/Loans/LoanList?page=${newPage}')
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    const fields = [
        {key : 'd_Key'},
        {key : 'ID'},
        {key : 'd_name'},
        {key : 'account'},
        {key : 'd_start_date'},
        {key : 'd_end_date'},
        {key : 'd_amount'}, 
        {key : 'd_state'}, 
        {key : 'loans_approve'}
    ]

    const {data : board, error, isLoding, reload} = useAsync ({
        promiseFn : getLoanList
    });

    if(isLoding) return <div>로딩중..</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!board) return <button onClick={reload}>불러오기</button>;
    console.log(board.length)

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            <strong>대출 리스트</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={board}
                                fields={fields}
                                tableFilter
                                itemsPerPageSelect
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={10}
                                clickableRows
                                // pagination
                                scopedSlots = {{
                                    '조회':
                                    (item) => (
                                        <td>
                                            <CButton size="sm" color="primary" style={{float:"left", margin:"0px"}} onClick={() => history.push('/Loans/LoanDetail/${item.d_KEY}')}>조회</CButton>
                                        </td>
                                    ),
									'승인' : 
									(item)=>(
									<td>
										<CForm action='/Loans/LoanApproval' method="POST" style={{float:"left"}}>
                                            <input type="hidden" id="d_Key" name="d_Key" value="{item.d_Key}"></input>
                                            <CButton type="submit" size="sm" className="btn-facebook btn-brand mr-1 mb-1">승인</CButton>
                                        </CForm>
                                    </td>
									)
								}}
                            />
                            <CPagination 
                                activePage={page}
                                onActivePageChange={pageChange}
                                pages={board.length/5+1}
                                doubleArrows={false}
                                align="center"
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default LoanList