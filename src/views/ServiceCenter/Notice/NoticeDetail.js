import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CForm
  } from '@coreui/react'
import { useAsync } from 'react-async';
import axios from 'axios';

async function getNoticeDetail({N_NUM}) {
    console.log('getNoticeDetail()1')
    const response = await axios.get(
        `/ServiceCenter/NoticeDetail/${N_NUM}`
    );
    console.log('getNoticeDetail()2')
    return response.data;
}
  

const NoticeDetail = ({match}) => {
    const { data: board, error, isLoading, reload } = useAsync({
        promiseFn: getNoticeDetail, N_NUM:match.params.N_NUM
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

    return(
        <>
        <CRow>
            <CCol lg={12}>
                <CCard accentColor="success">
                    <CCardHeader>
                        <p align="center"><strong>{board[0].제목}</strong></p>
                        
                        <p align="right">작성일: {board[0].작성일}</p>
                        <p align="right">작성자: {board[0].작성자}</p>
                        <p align="right">조회: {board[0].조회}</p>
                    </CCardHeader>
                    <CCardBody>
                        {board[0].내용}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        
        <CForm action='/ServiceCenter/NoticeDeleteAction' method="POST">
            <input type="hidden" id ="N_NUM" name="N_NUM" value={board[0].글번호}></input>
            <Link to="../NoticeWrite">
                <CButton className="btn-facebook btn-brand mr-1 mb-1">글쓰기</CButton>
            </Link>
            <CButton className="btn-xing btn-brand mr-1 mb-1" onClick={() => history.push(`/ServiceCenter/NoticeModify/${board[0].글번호}`)}>수정</CButton>
            <CButton className="btn-youtube btn-brand mr-1 mb-1" type="submit">삭제</CButton> 
        </CForm>     
        
      </>
    )
}
export default NoticeDetail