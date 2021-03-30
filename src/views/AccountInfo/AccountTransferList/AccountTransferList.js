import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,

} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { useAsync } from "react-async";
import axios from 'axios';


async function getUsers() {
  const response = await axios.get(
      '/userAccList'
  );
  return response.data;
}



const fields = ['이름','주민번호', '계좌', '계좌상태', '계좌종류' , '잔액' ,]

const AccountTransferList = () => {

 
  const { data: accData2, error, isLoading, reload } = useAsync({
    promiseFn: getUsers
  });
  const history = useHistory()


    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!accData2) return <button onClick={reload}>불러오기</button>;
    

  const a = 123;
  return (
    <>

      <CCard>
        <CCardHeader>
          회원 계좌리스트
          <DocsLink name="CNavbar"/>
        </CCardHeader>
        <CCardBody>

         

          <CDataTable
              items={accData2}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={15}
              pagination
              clickableRows
              columnFilter
              tableFilter
              /*onRowClick={(item) => history.push(`/users/${item.이름}`)}*/
               onRowClick={(item) => history.push(`/AccountInfo/AccountTransferListDetail/${item.계좌}`)}
            />

          

        </CCardBody>
      </CCard>

    </>
  )
}
export default AccountTransferList
