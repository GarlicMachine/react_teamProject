import {
  CButton,
  CCard,
  CSelect,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel
} from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'; // 날짜 타입



const DepositProductAdd = () => {
  console.log("글쓰기화면")
  const nowTime = moment().format('YYYY-MM-DD');
  console.log(nowTime);
  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader><br/>
              <h2>예금상품등록</h2>
            </CCardHeader>
            <CCardBody>
              <CForm action="/AdminDepositProduct/DepositProductAdd" method="post">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">예금상품이름</CLabel>
                  </CCol>
                  <CCol xs="10" md="3">
                    <CInput id="text-input" name="Y_NAME"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="10" md="3">
                    <CLabel htmlFor="text-input" >예금상품한줄요약</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput id="text-input" name="Y_SUMMARY"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">예금종류</CLabel>
                  </CCol>
                  <CCol sm="2">
                  <CSelect name="Y_TYPE">
                      <option value="0">선택</option>
                      <option value="단리">단리</option>
                      <option value="복리">복리</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">금리(%)</CLabel>
                  </CCol>
                  <CCol sm="2">
                    <CInput type="number" step="0.1" min="0.1" name="Y_INTEREST_RATE"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">최대예금기간(~36개월)</CLabel>
                  </CCol>
                  <CCol sm="2">
                    <CInput type="number" max="36" min="1" name="Y_MAX_DATE"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">최소예금기간(1개월~)</CLabel>
                  </CCol>
                  <CCol xs="2">
                    <CInput type="number" max="36" min="1" name="Y_MIN_DATE"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">최소예치금액</CLabel>
                  </CCol>
                  <CCol xs="10" md="3">
                    <CInput id="text-input" name="Y_MIN_PRICE"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">예금설명</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="Y_EXPLANATION" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..." 
                     
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">유의사항</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="Y_NOTICE" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..."
                      
                    />
                  </CCol>
                </CFormGroup>
                
                <CButton className="btn-facebook btn-brand mr-1 mb-1" type="submit" >글작성</CButton>
                            
                  <Link to="./DepositProductList">    
                      <CButton className="btn-youtube btn-brand mr-1 mb-1">취소</CButton>
                  </Link>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DepositProductAdd