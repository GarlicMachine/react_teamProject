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
import { DocsLink } from 'src/reusable'
import { useAsync } from "react-async";
import axios from 'axios';

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const fields = [
  {key : '계좌번호'},
  {key : '상품이름'}, 
  {key : '적금가입날짜'}, 
  {key : '계좌상태'},
  {key : 'button', label: ''}
]

async function getUsers() {
  const response = await axios.get(
      '/savings/SavingsApproveList'
  );
  
  return response.data;
}

const SavingsApproveList = ({match}) => {
    const { data: accData2, error, isLoading, reload } = useAsync({
      promiseFn: getUsers
    });
    
    if(match.params.update){
      alert("승인되었습니다.");
      match.params.update=0;
    }
   
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!accData2) return <button onClick={reload}>불러오기</button>;

    const timestamp = Date.now();
    
  return (
    <>
      <CRow>
        <CCol xs="12" lg="10">
          <CCard>
            <CCardHeader>
              적금신청리스트
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={accData2}
              fields={fields}
              itemsPerPage={5}
              pagination
              items-per-page-select
              scopedSlots = {{
                '적금가입날짜':
                (item)=>(
                  <td>{new Intl.DateTimeFormat('kor', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp)}</td>
                ),
                'button':
                  (item)=>(
                    <td style={{textAlign:'center'}}>
                      <CForm action="/savings/SavingsApproveList/1" method="post">
                        <input type="hidden" name="ACCOUNT" value={item.계좌번호}></input>
                        <input type="hidden" name="ACCOUNTSTATE" value="승인"></input>
                        <CButton type="submit" size="sm" color="info">승인</CButton>
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

export default SavingsApproveList