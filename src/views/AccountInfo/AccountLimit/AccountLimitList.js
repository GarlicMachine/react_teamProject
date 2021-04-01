import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CToggler,
  CNavLink,
  CDropdown,
  CForm,
  CInput,
  CButton,
  CDataTable,

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

async function getUsers() {
  const response = await axios.get(
      '/AccountLimitList/info'
  );
  return response.data;
}


const fields = ['이름','계좌번호', '잔액', '신청금액', '신청날짜' ,'버튼']

const AccountLimitList = () => {

 
  const history = useHistory()
  const { data: accData2, error, isLoading, reload } = useAsync({
    promiseFn: getUsers
  });
  const [isOpen, setIsOpen] = useState(false)


    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!accData2) return <button onClick={reload}>불러오기</button>;
    

  const a = 123;
  return (
    <>

      <CCard>
        <CCardHeader>
          회원 한도 신청리스트
          <DocsLink name="CNavbar"/>
        </CCardHeader>
        <CCardBody>

          <CNavbar expandable="sm" color="info" >
            <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
            <CNavbarBrand>
              한도 신청리스트
            </CNavbarBrand>
          </CNavbar>

          <CDataTable
              style={{textAlign:'center'}}
              items={accData2}
              fields={fields}
              itemsPerPage={5}
              pagination
              items-per-page-select
              scopedSlots = {{
                 '버튼' :
                 (item)=>(
                  <td >
                    <CForm action="/AccountLimitList/update/" method="post" style={{float:'left'}}>
                      <CButton type="submit" size="sm" color="warning">승인</CButton>
                      <CInput type="hidden" name="l_state" value="승인"></CInput>
                      <CInput type="hidden" name="l_key" value={item.키}></CInput>
                    </CForm>
                    <span style={{float:'left'}}>　</span>
                    <CForm action="/AccountLimitList/update/" method="post" style={{float:'left'}}>
                      <CButton type="submit" size="sm" color="warning">거절</CButton>
                      <CInput type="hidden" name="l_state" value="거절"></CInput>
                      <CInput type="hidden" name="l_key" value={item.키}></CInput>
                    </CForm>
                    
                  </td>
                )
               }}
            />
        </CCardBody>
      </CCard>

    </>
  )
}
export default AccountLimitList
