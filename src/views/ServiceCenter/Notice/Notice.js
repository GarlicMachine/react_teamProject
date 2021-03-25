import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useAsync } from 'react-async';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
  CPagination
} from '@coreui/react'


async function getNotice() {
  console.log('getNotice()1')
  const response = await axios.get(
    `/ServiceCenter/Notice/`
  );
  console.log('getNotice()2')
  return response.data;
}

const Notice = ({match}) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const pageChange = newPage => {
  currentPage !== newPage && history.push(`/ServiceCenter/Notice?page=${newPage}`)
  }

  useEffect(() => {
      currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const fields = [
    {key: '글번호', _style: { width: '7%'}}, 
    {key: '제목', _style: { width: '60%'}, _classes: 'font-weight-bold'},
    {key: '작성자', _style: { width: '7%'}},
    {key: '작성일', _style: { width: '10%'}},
    {key: '조회', _style: { width: '7%'}}
  ]

  const { data: board, error, isLoading, reload } = useAsync({
    promiseFn: getNotice
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!board) return <button onClick={reload}>불러오기</button>;
  console.log(board.length)
  
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <strong>공지사항</strong>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={board}
                fields={fields}
                tableFilter
                itemsPerPageSelect
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={5}
                activePage={page}
                clickableRows
                onRowClick={(item) => {history.push(`/ServiceCenter/NoticeDetail/${item.글번호}`)}}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={board.length/5 + 1}
                doubleArrows={false} 
                align="center"
              />
              <Link to="./NoticeWrite">
                <CButton className="btn-facebook btn-brand mr-1 mb-1">글쓰기</CButton>
              </Link>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

        
    </>
  )
}

export default Notice
