import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CInput, CLabel, CRow } from '@coreui/react';
import moment from 'moment';

const LoansProductInsert = () => {
    const nowTime = moment().format('YYYY-MM-DD');
    console.log(nowTime);

    return (
        <>
        <CRow>
            <CCol xs="12" md="12">
                <CCard accentColor="success">
                    <CCardHeader>
                        <strong>대출상품 등록</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm action='/LoansProduct/LoansProductInsertAction' method="POST">
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_NAME">대출명</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_NAME" name="D_NAME" placeholder="대출금리" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_DATE">대출등록일</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <p id="D_DATE" name="D_DATE">{nowTime}</p>
                                    <input type="hidden" id="D_DATE" name="D_DATE" value={nowTime} />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_INTEREST_RATE">대출금리</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_INTEREST_RATE" name="D_INTEREST_RATE" placeholder="대출금리"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_SUMMARY">대출요약</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_SUMMARY" name="D_SUMMARY" placeholder="대출요약"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MIN_PRICE">최소대출금액(억원)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MIN_PRICE" name="D_MIN_PRICE" placeholder="최소대출금액">억원</CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MAX_PRICE">최대대출금액(억원)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MAX_PRICE" name="D_MAX_PRICE" placeholder="최대대출금액"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MIN_DATE">최소대출기간(년)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MIN_DATE" name="D_MIN_DATE" placeholder="최소대출기간"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_MAX_DATE">최대대출기간(년)</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_MAX_DATE" name="D_MAX_DATE" placeholder="최대대출기간"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_EXPLANATION1">설명1</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_EXPLANATION1" name="D_EXPLANATION1" placeholder="설명1"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_EXPLANATION2">설명2</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_EXPLANATION2" name="D_EXPLANATION2" placeholder="설명2"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="1">
                                    <CLabel htmlFor="D_EXPLANATION3">설명3</CLabel>
                                </CCol>
                                <CCol xs="12" md="10">
                                    <CInput id="D_EXPLANATION3" name="D_EXPLANATION3" placeholder="설명3"></CInput>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CButton type="submit" className="btn-facebook btn-brand mr-1 mb-1">등록</CButton>
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default LoansProductInsert