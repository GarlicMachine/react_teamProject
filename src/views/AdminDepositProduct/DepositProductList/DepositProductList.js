import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CForm,
  CCardFooter,
  CButton,
  CCardGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import { useAsync } from "react-async";
import axios from 'axios';
import moment from 'moment';

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
//변경
const fields = [
  {key : '상품명'},
  {key : '상품요약'},
  {key : '금리'}, 
  {key : '종류'}, 
  {key : '최소기간'},
  {key : '최대기간'},
  {key : '등록일'},
  {key : '수정', label: ''},
  {key : '삭제', label: ''}
]
//추가
async function getUsers() {
  const response = await axios.get(
      '/DepositProductList'
  );
  
  return response.data;
}

const DepositProductList = ({match}) => {
  //추가   
  const { data: deposit, error, isLoading, reload } = useAsync({
      promiseFn: getUsers
    });
    
    if(match.params.Y_NAME == 1){
      alert("삭제되었습니다.");
      match.params.Y_NAME=0;
    }else if(match.params.Y_NAME == 2) {
      alert("수정되었습니다.");
      match.params.Y_NAME=0;
    }
   
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!deposit) return <button onClick={reload}>불러오기</button>;

    const timestamp = Date.now();
    
  return (
    <>
      <CRow>
        <CCol xs="12" lg="10">
          <CCard>
            <CCardHeader>
              적금상품리스트
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
            <CDataTable

            /* 추가 */
              items={deposit}
              fields={fields}
              itemsPerPage={5}
              pagination
              items-per-page-select
              scopedSlots = {{
                '금리':
                  (item)=>(
                    <td>{item.금리.toFixed(1)}%</td>
                  ),
                '등록일':
                (item)=>(
                  <td>{new Intl.DateTimeFormat('kor', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp)}</td>
                ),
                '최소기간':
                (item)=>(
                  <td>{item.최소기간}개월</td>
                ),
                '최대기간':
                (item)=>(
                  <td>{item.최대기간}개월</td>
                ),
                '수정':
                  (item)=>(
                    <td style={{textAlign:'center'}}>
                      <CButton type="submit" size="sm" color="warning"  onClick={() => history.push(`/AdminDepositProduct/DepositProductModify/${item.상품명}`)}>수정</CButton>
                      <input type="hidden" name="Y_NAME" value={item.상품명}></input>
                    </td>
                  ),
                '삭제':
                (item)=>(
                  <td style={{textAlign:'center'}}>
                      <CForm action="/AdminDepositProduct/DepositProductList/1" method="post">
                         <input type="hidden" name="Y_NAME" value={item.상품명}></input>
                        <CButton type="submit" size="sm" color="danger">삭제</CButton>
                      </CForm>
                  </td>
                )
              }}
              >
            </CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>  
    </>
  )
}

export default DepositProductList
