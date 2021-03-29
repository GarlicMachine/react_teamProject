import React from 'react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CRow } from '@coreui/react';
import axios from 'axios'
import { useAsync } from 'react-async';
import { Link, useHistory } from 'react-router-dom';

async function getLoansProductDetail({D_NAME}) {
    console.log('getLoansProductDetail_1')
    const response = await axios.get(
        `/LoansProduct/LoansProductList/LoansProductDetail/${D_NAME}`
    );
    console.log('getLoansProductDetail_2')
    return response.data;
}

const LoansProductDetail = ({match}) => {
    const {data : board, error, isLoading, reload} = useAsync ({
        promiseFn : getLoansProductDetail, D_NAME:match.params.D_NAME
    });
    const history = useHistory()

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
                        <p align="center"><h1><strong>{board[0].대출명}</strong></h1></p>
                    </CCardHeader>
                    <CCardBody>
                        <p align="left">대출등록일 : <font color="gray">{board[0].대출등록일}</font></p>
                        <p align="left">대출금리 : <font color="gray">{board[0].대출금리}</font></p>
                        <p align="left">대출요약 : <font color="gray">{board[0].대출요약}</font></p>
                        <p align="left">최소대출금액 : <font color="gray">{board[0].최소대출금액}억원</font></p>
                        <p align="left">최대대출금액 : <font color="gray">{board[0].최대대출금액}억원</font></p>
                        <p align="left">최소대출기간 : <font color="gray">{board[0].최소대출기간}년</font></p>
                        <p align="left">최대대출기간 : <font color="gray">{board[0].최대대출기간}년</font></p>
                        <p align="left">설명1 : <font color="gray">{board[0].설명1}</font></p>
                        <p align="left">설명2 : <font color="gray">{board[0].설명2}</font></p>
                        <p align="left">설명3 : <font color="gray">{board[0].설명3}</font></p>
                    </CCardBody>
                    <CCardFooter>
                    
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
        <CForm action="/LoansProduct/LoansProductList/LoansProductDeleteAction" method="POST">
            <input type="hidden" id ="D_NAME" name="D_NAME" value={board[0].대출명}></input>
            <CButton className="btn-xing btn-brand mr-1 mb-1" onClick={() => history.push(`/LoansProduct/LoansProductList/LoansProductModify/${board[0].대출명}`)}>수정</CButton>
            <CButton type="submit" className="btn-xing btn-brand mr-1 mb-1">삭제</CButton>
            <Link to="/LoansProduct/LoansProductList/">
                <CButton className="btn-facebook btn-brand mr-1 mb-1">뒤로가기</CButton>
            </Link>
        </CForm>
        </>
    )
}

export default LoansProductDetail