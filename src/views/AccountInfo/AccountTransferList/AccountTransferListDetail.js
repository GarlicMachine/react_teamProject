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


async function getUsers({account}) {
  const response = await axios.get(`/AccountInfoAccountTransferListDetail/${account}`);
  return response.data;
}



const fields = ['날짜','시간', '입출금액', '내용', '잔액', '받는사람' , '보낸사람' , ]

const AccountTransferListDetail = ({match}) => {

 
  const { data: accData2, error, isLoading, reload } = useAsync({
    promiseFn: getUsers ,account : match.params.account
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
              columnFilter
              tableFilter
              itemsPerPage={15}
              pagination
            />

          

        </CCardBody>
      </CCard>

    </>
  )
}
export default AccountTransferListDetail
