import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CForm,
    CCollapse,
    CFormGroup,
    CTextarea,
    CInput,
    CLabel
  } from '@coreui/react'
import { useAsync } from 'react-async';
import axios from 'axios';
import moment from 'moment'; // 날짜 타입

async function getCounselingDetail({B_NUM}) {
    console.log('getCounselingDetail()1')
    const response = await axios.get(
        `/ServiceCenter/CounselingDetail/${B_NUM}`
    );
    console.log('getCounselingDetail()2')
    return response.data;
}

const NoticeDetail = ({match}) => {
    const [collapse, setCollapse] = useState(false)
    const toggle = (e) => {
        setCollapse(!collapse)
        e.preventDefault()
    }

    const { data: board, error, isLoading, reload } = useAsync({
        promiseFn: getCounselingDetail, B_NUM:match.params.B_NUM
    });
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)
     
    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!board) return <button onClick={reload}>불러오기</button>;
    console.log(board)

    const nowTime = moment().format('YYYY-MM-DD');
    console.log(nowTime);    

    return(
        <>
        <CRow>
            <CCol lg={12}>
                <CCard accentColor="success">
                    <CCardHeader>
                        <p align="center"><strong>{board[0].제목}</strong></p>
                        
                        <p align="right">작성일: {board[0].작성일}</p>
                        <p align="right">작성자: {board[0].작성자}</p>
                        <p align="right">분류: <font color='gray' size='2'>[{board[0].분류}]</font></p>
                    </CCardHeader>
                    <CCardBody>
                        <p>&nbsp;</p>
                        {board[0].내용}
                        <p>&nbsp;</p>
                    </CCardBody> 
                </CCard>
            </CCol>
        </CRow>
        <CRow>
            <CCol lg={12}>
                <CCard accentColor="success">
                    <CCollapse show={collapse}>
                            {board[0].답변상태 === 1 ? 
                            <>
                                <CCardHeader>
                                    <p align="right">답변일: {board[0].답변날짜}</p>
                                    <p align="right">담당자: {board[0].답변자이름}</p>
                                </CCardHeader>
                                <CCardBody>
                                    <p>&nbsp;</p>
                                    {board[0].답변내용}
                                    <p>&nbsp;</p>
                                </CCardBody>
                            </>
                            : 
                            <>
                                <CForm action='/ServiceCenter/CounselingCommentAction' method="POST">
                                    <input type="hidden" id ="B_STATE" name="B_STATE" value="1"></input>
                                    <input type="hidden" id ="B_NUM" name="B_NUM" value={board[0].글번호}></input>
                                    <p>&nbsp;</p>
                                    <CFormGroup row>
                                        <CCol md="1">
                                            <CLabel htmlFor="B_ANSWER_DATE">
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일
                                            </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="10">
                                            <p id="B_ANSWER_DATE" name="B_ANSWER_DATE">{nowTime}</p>
                                            <input type="hidden" id ="B_ANSWER_DATE" name="B_ANSWER_DATE" value={nowTime}></input>
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="1">
                                            <CLabel htmlFor="B_NAME">
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;상담원
                                            </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="2">
                                            <CInput id="B_NAME" name="B_NAME" placeholder="상담원 이름을 입력하세요." />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="1">
                                            <CLabel htmlFor="B_ANSWER_CONTENT">
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;내용
                                            </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="10">
                                            <CTextarea 
                                            name="B_ANSWER_CONTENT" 
                                            id="B_ANSWER_CONTENT" 
                                            rows="7"
                                            placeholder="답변 내용을 입력하세요." 
                                            />
                                        </CCol>
                                    </CFormGroup>
                                    <p>&nbsp;</p>
                                    <CCol>
                                    <   CButton className="btn-facebook btn-brand mr-1 mb-1" type="submit" >답변등록</CButton>
                                        <Link to="../Counseling">    
                                            <CButton className="btn-youtube btn-brand mr-1 mb-1">뒤로가기</CButton>
                                        </Link>
                                    </CCol>
                                </CForm>
                            </>
                            }
                            
                    </CCollapse>
                    <CCol xl="20" align="center"> 
                        <CButton 
                            block variant="outline" 
                            color="success" 
                            onClick={toggle}>
                            답변창
                        </CButton>
                    </CCol>
                </CCard>
            </CCol>
        </CRow>
        
        <CForm action='/ServiceCenter/CounselingDeleteAction' method="POST">
            <input type="hidden" id ="B_NUM" name="B_NUM" value={board[0].글번호}></input>
            <Link to="../CounselingWrite">
                <CButton className="btn-facebook btn-brand mr-1 mb-1">글쓰기</CButton>
            </Link>
            <CButton className="btn-xing btn-brand mr-1 mb-1" onClick={() => history.push(`/ServiceCenter/CounselingModify/${board[0].글번호}`)}>수정</CButton>
            <CButton className="btn-youtube btn-brand mr-1 mb-1" type="submit">삭제</CButton> 
        </CForm>     
        
      </>
    )
}
export default NoticeDetail