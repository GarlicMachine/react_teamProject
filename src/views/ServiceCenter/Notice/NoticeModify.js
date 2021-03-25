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
import { useAsync } from 'react-async';
import axios from 'axios';

async function getNoticeModify({N_NUM}) {
    console.log('getNoticeModify()1')
    const response = await axios.get(
        `/ServiceCenter/NoticeModify/${N_NUM}`
    );
    console.log('getNoticeModify()2')
    return response.data;
}

const NoticeModify = ({match}) => {
    const { data: board, error, isLoading, reload } = useAsync({
        promiseFn: getNoticeModify, N_NUM:match.params.N_NUM
    });
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!board) return <button onClick={reload}>불러오기</button>;
    console.log(board)
    console.log("글수정화면")
    const nowTime = moment().format('YYYY-MM-DD');
    console.log(nowTime);

    return (
        <>
        <CRow>
            <CCol xs="12" md="12">
                <CCard accentColor="success">
                    <CCardHeader>
                        <strong>글수정</strong>
                    </CCardHeader>
                    
                    <CCardBody>
                        
                        <CForm action='/ServiceCenter/NoticeModifyAction' method="POST">
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="N_DATE">날짜</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <p id="N_DATE" name="N_DATE">{nowTime}</p>
                                <input type="hidden" id ="N_DATE" name="N_DATE" value={nowTime}></input>
                                <input type="hidden" id ="N_NUM" name="N_NUM" value={board[0].글번호}></input>
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="N_TITLE">제목</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <CInput id="N_TITLE" name="N_TITLE" placeholder="제목" defaultValue={board[0].제목}></CInput>
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
                                defaultValue={board[0].내용}
                                >
                                    
                                </CTextarea>
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            
                            <CButton className="btn-facebook btn-brand mr-1 mb-1" type="submit" >글수정</CButton>
                            
                            <Link to="../Notice">    
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

export default NoticeModify