import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import { useAsync } from 'react-async';
import axios from 'axios';

async function getLoanDetail({D_KEY}) {
    console.log('getLoanDetail_1')
    const response = await axios.get(
        `/Loans/LoanList/LoanDetail/${D_KEY}`
    );
    console.log('getLoanDetail_2')
    return response.data;
}

const LoanDetail = ({match}) => {
    const {data : board, error, isLoading, reload} = useAsync ({
        promiseFn : getLoanDetail, D_KEY:match.params.D_KEY
    });

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!board) return <button onClick={reload}>불러오기</button>;
    console.log(board)

    return (
        <>
        <CRow>
            <CCol lg={12}>
                <CCard accentColor="success">
                    <CCardHeader>
                        <p align="center"><h1><strong>[{board[0].대출번호}] {board[0].대출명}</strong></h1></p>
                    </CCardHeader>
                    <CCardBody>
                        <p align="left">아이디 : <font color="gray">{board[0].아이디}</font></p>
                        <p align="left">계좌번호 : <font color="gray">{board[0].계좌번호}</font></p>
                        <p align="left">대출실행일 : <font color="gray">{board[0].대출실행일}</font></p>
                        <p align="left">대출만기일 : <font color="gray">{board[0].대출만기일}</font></p>
                        <p align="left">대출금액 : <font color="gray">{board[0].대출금액}</font></p>
                        <p align="left">대출상태 : <font color="gray">{board[0].대출상태}</font></p>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <Link to="/Loans/LoanList/">
            <CButton className="btn-facebook btn-brand mr-1 mb-1">뒤로가기</CButton>
        </Link>
        </>
    )
}

export default LoanDetail