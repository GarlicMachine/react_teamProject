import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

async function getLoanDetail({d_Key}) {
    console.log('getLoanDetail_1')
    const response = await axios.get(
        '/Loans/LoanDetail/${d_Key}'
    );
    console.log('getLoanDetail_2')
    return response.LoansData;
}

const LoanDetail = ({match}) => {
   /*  const {data : board, error, isLoading, reload} = useAsync ({
        promiseFn : getLoanDetail, d_Key:match.params.d_Key
    }); */
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    /* useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!board) return <button onClick={reload}>불러오기</button>;
    console.log(board) */

    return (
        <>
        <CRow>
            <CCol lg={12}>
                <CCard accentColor="success">
                    <CCardHeader>
                        <p align="center"><h1><string>213</string></h1></p>
                    </CCardHeader>]
                    <CCardBody>
                        <p align="left">대출종류 : <font color="gray">12323</font></p>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <Link to="../LoanList">
            <CButton className="btn-facebook btn-brand mr-1 mb-1">뒤로가기</CButton>
        </Link>
        </>
    )
}


export default LoanDetail