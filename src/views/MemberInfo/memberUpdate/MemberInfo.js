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
      '/memberInfo'
  );
  return response.data;
}


const fields = ['이름','아이디','주민번호']

const MemberInfo = () => {

  
  const { data: accData2, error, isLoading, reload } = useAsync({
    promiseFn: getUsers
  });
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)


    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!accData2) return <button onClick={reload}>불러오기</button>;
    

  const a = 123;
  return (
    <>

      <CCard>
        <CCardHeader>
          회원 리스트
          <DocsLink name="CNavbar"/>
        </CCardHeader>
        <CCardBody>

          <CNavbar expandable="sm" color="info" >
            <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
            <CNavbarBrand>
              회원 리스트
            </CNavbarBrand>
            <CCollapse show={isOpen} navbar>
              <CNavbarNav>
                <CNavLink>Home</CNavLink>
              </CNavbarNav>
              <CNavbarNav className="ml-auto">
                <CForm inline>
                  <CInput
                    className="mr-sm-2"
                    placeholder="회원이름"
                    size="sm"
                  />
                  <CButton color="light" className="my-2 my-sm-0" type="submit">검색</CButton>
                </CForm>
                <CDropdown inNav>
                  
                  
                  
                </CDropdown>
                <CDropdown inNav>
                  
                  <CDropdownToggle color="primary">
                    임시
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>test</CDropdownItem>
                    <CDropdownItem>test2</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavbarNav>
            </CCollapse>
          </CNavbar>

          <CDataTable
              items={accData2}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={7}
              pagination
              clickableRows
               onRowClick={(item) => history.push(`/MemberDetail/${item.아이디}`)} 
            />

          

        </CCardBody>
      </CCard>

    </>
  )
}
export default MemberInfo
