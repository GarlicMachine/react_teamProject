import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CCol,
    CRow,
    CButton,
    CImg
  } from '@coreui/react'
import { useAsync } from 'react-async';
import axios from 'axios';

async function getFundListDetail({F_NUM}) {
    console.log('getFundListDetail()1')
    const response = await axios.get(
        `/Fund/FundListDetail/${F_NUM}`
    );
    console.log('getFundListDetail()2')
    return response.data;
}
  

const FundListDetail = ({match}) => {
    const { data: board, error, isLoading, reload } = useAsync({
        promiseFn: getFundListDetail, F_NUM:match.params.F_NUM
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
                        <p align="center"><h1><strong>{board[0].펀드명}</strong></h1></p>
                        <p align="left">펀드종목: <font color="gray">[{board[0].펀드종목}]</font></p>
                        <p align="left">작성자: <strong>{board[0].작성자}</strong></p>
                        <p align="left">펀딩기간: <strong>{board[0].펀딩기간}</strong></p>
                        <p align="left">목표금액: <strong>{board[0].목표금액}원</strong></p>
                    </CCardHeader>
                    <CCardBody>
                        <p>&nbsp;</p>
                        <p>{board[0].펀드내용}</p>
                        <p>
                          <CImg
                            src={'images/' + board[0].첨부파일}
                            fluid
                            className="mb-2"
                          />
                        </p>
                        <p>&nbsp;</p>
                    </CCardBody>
                    <CCardFooter>
                      <p>&nbsp;</p>
                      <p align="left">이름: {board[0].등록자이름}</p>
                      <p align="left">연락처: {board[0].등록자연락처}</p>
                      <p align="left">이메일: {board[0].등록자이메일}</p>
                      <p align="left">계좌번호: {board[0].모금계좌}</p>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
        <Link to="../FundList">
                <CButton className="btn-youtube btn-brand mr-1 mb-1">뒤로가기</CButton>
            </Link>
        
      </>
    )
}
export default FundListDetail