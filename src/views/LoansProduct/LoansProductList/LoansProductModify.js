import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CInput, CLabel, CRow } from '@coreui/react';
import axios from 'axios'
import { useAsync } from 'react-async'
import { Link } from 'react-router-dom';

async function getLoansProductModify({D_NAME}) {
    console.log('getLoansProductModify_1')
    const response = await axios.get(
        `/LoansProduct/LoansProductList/LoansProductModify/${D_NAME}`
    );
    console.log('getLoansProductModify_2')
    return response.data;
}

const LoansProductModify = ({match}) => {
    const { data: board, error, isLoading, reload } = useAsync({
        promiseFn: getLoansProductModify, D_NAME:match.params.D_NAME
    });

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!board) return <button onClick={reload}>불러오기</button>;
    console.log(board)

    return (
        <>
        <CRow>
            <CCol xs="12" md="12">
                <CCard accentColor="success">
                    <CCardHeader>
                        <strong>대출상품 수정</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm action='/LoansProduct/LoansProductList/LoansProductModifyAction' method="POST">
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_NAME">대출명</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <p id="D_NAME">{board[0].대출명}</p>
                                    <input type="hidden" id="D_NAME" name="D_NAME" value={board[0].대출명}></input>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_INTEREST_RATE">대출금리</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_INTEREST_RATE" name="D_INTEREST_RATE" placeholder="대출금리" defaultValue={board[0].대출금리}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_SUMMARY">대출요약</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_SUMMARY" name="D_SUMMARY" placeholder="대출요약" defaultValue={board[0].대출요약}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MIN_PRICE">최소대출금액(억원)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MIN_PRICE" name="D_MIN_PRICE" placeholder="최소대출금액" defaultValue={board[0].최소대출금액}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MAX_PRICE">최대대출금액(억원)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MAX_PRICE" name="D_MAX_PRICE" placeholder="최대대출금액" defaultValue={board[0].최대대출금액}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MIN_DATE">최소대출기간(년)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MIN_DATE" name="D_MIN_DATE" placeholder="최소대출기간" defaultValue={board[0].최소대출기간}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MAX_DATE">최대대출기간(년)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MAX_DATE" name="D_MAX_DATE" placeholder="최대대출기간" defaultValue={board[0].최대대출기간}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_EXPLANATION1">설명1</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_EXPLANATION1" name="D_EXPLANATION1" placeholder="설명1" defaultValue={board[0].설명1}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_EXPLANATION2">설명2</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_EXPLANATION2" name="D_EXPLANATION2" placeholder="설명2" defaultValue={board[0].설명2}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_EXPLANATION3">설명3</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_EXPLANATION3" name="D_EXPLANATION3" placeholder="설명3" defaultValue={board[0].설명3}></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CButton type="submit" className="btn-facebook btn-brand mr-1 mb-1">수정</CButton>
                                <Link to="/LoansProduct/LoansProductList/">
                                    <CButton className="btn-facebook btn-brand mr-1 mb-1">취소</CButton>
                                </Link>
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default LoansProductModify