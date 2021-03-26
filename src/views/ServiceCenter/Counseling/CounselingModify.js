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
    CLabel,
    CSelect
  } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'; // 날짜 타입
import { useAsync } from 'react-async';
import axios from 'axios';

async function getCounselingModify({B_NUM}) {
    console.log('getCounselingModify()1')
    const response = await axios.get(
        `/ServiceCenter/CounselingModify/${B_NUM}`
    );
    console.log('getCounselingModify()2')
    return response.data;
}

const CounselingModify = ({match}) => {
    const { data: board, error, isLoading, reload } = useAsync({
        promiseFn: getCounselingModify, B_NUM:match.params.B_NUM
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
                        
                        <CForm action='/ServiceCenter/CounselingModifyAction' method="POST">
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="B_DATE">작성일</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <p id="B_DATE" name="B_DATE">{nowTime}</p>
                                <input type="hidden" id ="B_DATE" name="B_DATE" value={nowTime}></input>
                                <input type="hidden" id ="B_NUM" name="B_NUM" value={board[0].글번호}></input>
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="B_CATEGORY">분류</CLabel>
                            </CCol>
                            <CCol xs="12" md="2">
                            <CSelect custom name="B_CATEGORY" id="B_CATEGORY">
                                <option value={board[0].분류}>{board[0].분류}</option>
                                <option value="예금">예금</option>
                                <option value="적금">적금</option>
                                <option value="대출">대출</option>
                                <option value="펀드">펀드</option>
                                <option value="기타">기타</option>
                            </CSelect>
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row></CFormGroup>
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="B_TITLE">제목</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <CInput id="B_TITLE" name="B_TITLE" placeholder="제목" defaultValue={board[0].제목}></CInput>
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            <CCol md="1">
                                <CLabel htmlFor="B_CONTENT">내용</CLabel>
                            </CCol>
                            <CCol xs="12" md="10">
                                <CTextarea 
                                name="B_CONTENT" 
                                id="B_CONTENT" 
                                rows="20"
                                placeholder="내용" 
                                defaultValue={board[0].내용}
                                >
                                    
                                </CTextarea>
                            </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                            
                            <CButton className="btn-facebook btn-brand mr-1 mb-1" type="submit">글수정</CButton>
                            
                            <Link to="../Counseling">    
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

export default CounselingModify