import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CDataTable, CButton, CForm, CPagination} from '@coreui/react';
import { useHistory, useLocation } from 'react-router';
import { useAsync } from 'react-async';
import axios from 'axios';

async function getLoanList() {
    console.log('getLoanList_1')
    const response = await axios.get(
        `/Loans/LoanList/`
    );
    console.log('getLoanList_2')
    return response.data;
}

const LoanList = () => {
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
        {key : '대출번호'},
        {key : '아이디'},
        {key : '대출명'},
        {key : '계좌번호'},
        {key : '대출실행일'},
        {key : '대출만기일'},
        {key : '대출금액'}, 
        {key : '대출상태'}, 
        {key : '조회'}, 
        {key : '승인'}
    ]

    const {data : board, error, isLoading, reload} = useAsync ({
        promiseFn : getLoanList
    });

    if(isLoading) return <div>로딩중..</div>;
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
                                itemsPerPage={5}
                                activePage={page}
                                clickableRows
                                scopedSlots = {{
                                    '조회' :
                                    (item) => (
                                        <td>
                                            <CButton size="sm" color="primary" onClick={() => history.push(`/Loans/LoanList/LoanDetail/${item.대출번호}`)}>조회</CButton>
                                        </td>
                                    ),
									'승인' : 
									(item)=>(
										<td>
                                            {/* <CForm action='/Loans/LoanList/LoanAproval' method="POST">
                                                <input type="hidden" id ="D_KEY" name="D_KEY" value={item.대출번호}></input>
                                                <CButton size="sm" type="submit" className="btn-facebook btn-brand mr-1 mb-1" >승인</CButton>
                                            </CForm> */}
                                            
                                            {/*  <CButton size="sm" color="primary" onClick={() =>getLoanUpdate(item.대출번호)}>승인2</CButton> */}
                                            <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1" onClick={() => history.push(`/Loans/LoanList/LoanAproval/${item.대출번호}`)}>승인</CButton>
                                    	</td>
									)
								}}
                            />
                            <CPagination 
                                activePage={page}
                                onActivePageChange={pageChange}
                                pages={board.length/5 + 1}
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