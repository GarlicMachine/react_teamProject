import {
    CButton,
    CCard,
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



const NoticeWrite = () => {
    console.log("글쓰기화면")
    const nowTime = moment().format('YYYY-MM-DD');
    console.log(nowTime);
    return (
        <>
        <CRow>
            <CCol xs="12" md="12">
                <CCard accentColor="success">
                    <CCardHeader>
                        <strong>글쓰기</strong>
                    </CCardHeader>
                    
                    <CCardBody>
                        
                        <CForm action='/ServiceCenter/NoticeWriteAction' method="POST">
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="N_DATE">날짜</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <p id="N_DATE" name="N_DATE">{nowTime}</p>
                                <input type="hidden" id ="N_DATE" name="N_DATE" value={nowTime}></input>
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="N_TITLE">제목</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <CInput id="N_TITLE" name="N_TITLE" placeholder="제목" />
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="N_CONTENT">내용</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <CTextarea 
                                name="N_CONTENT" 
                                id="N_CONTENT" 
                                rows="20"
                                placeholder="내용" 
                                />
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            
                            <CButton className="btn-facebook btn-brand mr-1 mb-1" type="submit" >글작성</CButton>
                            
                            <Link to="./Notice">    
                                <CButton className="btn-youtube btn-brand mr-1 mb-1">취소</CButton>
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

export default NoticeWrite