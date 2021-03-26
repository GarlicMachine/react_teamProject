import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
  CPagination,
  CForm
} from '@coreui/react'


async function getFundList() {
  console.log('getFundList()1')
  const response = await axios.get(
    `/Fund/FundList/`
  );
  console.log('getFundList()2')
  return response.data;
}

const FundList = ({match}) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const pageChange = newPage => {
  currentPage !== newPage && history.push(`/Fund/FundList?page=${newPage}`)
  }

  useEffect(() => {
      currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  const fields = [
    {key: '펀드번호', _style: { width: '5%'}}, 
    {key: '펀드명', _style: { width: '50%'}, _classes: 'font-weight-bold'},
    {key: '펀딩기간', _style: { width: '15%'}},
    {key: '목표금액', _style: { width: '8%'}},
    {key: '펀드종목', _style: { width: '8%'}},
    {key: '내용보기', _style: { width: '5%'}},
    {key: '승인여부', _style: { width: '7%'}}
  ]

  const { data: board, error, isLoading, reload } = useAsync({
    promiseFn: getFundList
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
              <strong>펀드 등록 리스트</strong>
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
                //onRowClick={(item) => {history.push(`/Fund/FundListDetail/${item.펀드번호}`)}}
                scopedSlots = {{
                  '내용보기':
                    (item)=>(
                        <td>
                          <CButton size="sm" color="primary" style={{float:"left", margin:"0px"}} onClick={() => history.push(`/Fund/FundListDetail/${item.펀드번호}`)}>바로보기</CButton>
                        </td>
                    ),

                  '승인여부':
                    (item)=>(
                      <>
                      <div>
                        <td>
                          <CForm action='/Fund/FundSuccessAction' method="POST" style={{float:"left"}}>
                            <input type="hidden" id ="F_NUM" name="F_NUM" value={item.펀드번호}></input>
                            <CButton size="sm" color="success" type="submit">승인</CButton>
                          </CForm>
                          &nbsp;
                          <CForm action='/Fund/FundFailAction' method="POST" style={{float:"left"}}>
                            <input type="hidden" id ="F_NUM" name="F_NUM" value={item.펀드번호}></input>
                            <CButton size="sm" color="danger" type="submit">거절</CButton>
                          </CForm>
                        </td>
                      </div>
                      </>
                    )

                }}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={board.length/5 + 1}
                doubleArrows={false} 
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default FundList
