import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useAsync } from 'react-async';
import axios from 'axios';

async function getUsers({account}) {
  const response = await axios.get(
      `/useAcc${account}`
  );
  return response.data;
}

const AccInfo = ({match}) => {

  const ddd=match.params.id
  const { data: accData2, error, isLoading, reload } = useAsync({
    promiseFn: getUsers,account:{ddd}
  });
    

    const Number = 1000000000;
    const Number2 = 10000000;

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!accData2) return <button onClick={reload}>불러오기</button>;
  return (
    <>
      <CRow>
        <CCol md="6">
          <CCard>
            <CCardHeader>
              회원정보  {match.params.id}
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form">

                <CFormGroup row>
                    <CCol md="2">
                        <CLabel htmlFor="hf-name">회원 ID </CLabel>
                    </CCol>

                    <CCol md="4">
                        jhn153228 
                    </CCol>

                    <CCol md="2">
                        <CLabel htmlFor="hf-name">회원 PW </CLabel>
                    </CCol>
                    
                    
                    <CCol md="2">
                        <CButton block color="dark">비밀번호 변경</CButton>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="hf-name">이름</CLabel>
                  </CCol>
                  <CCol md="2">
                  <p className="form-control-static">정하늘</p>
                  </CCol>
<CCol md="2">
        
</CCol>
                  <CCol md="2">
                  <CLabel htmlFor="hf-email">주민번호</CLabel>
                  </CCol>
                  <CCol md="3">
                    <p> 970820-1231231 </p>
                  </CCol>
                </CFormGroup>
                <br/>

                <CFormGroup row>
                    <CCol md="1">
                        <CLabel htmlFor="hf-name">HP</CLabel>
                    </CCol>
                    <CCol md="3">
                        <CInput id="name" placeholder="010-2111-1112" required />
                    </CCol>
<CCol md="1"></CCol>
                
                </CFormGroup>

                <br/>
                <CFormGroup row>
                
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>



        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              계좌정보
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">

                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="hf-password">계좌번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
                    <p>110-451-550731</p>
                  </CCol>
                  
                  <CCol md="2">
                    <CLabel htmlFor="hf-password">계좌<br/>비밀번호</CLabel>
                  </CCol>
                  <CCol md="2">
                    <CButton block color="dark">비밀번호 변경</CButton>
                  </CCol>
                  
                </CFormGroup>

                <br/>
                <CFormGroup row>
                <CCol md="1">
                    <CLabel htmlFor="hf-password">잔액</CLabel>
                  </CCol>
                  <CCol md="2">
                  {Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp; ₩
                  </CCol>

                    <CCol md ="2"></CCol>

                  <CCol md="2">
                    <CLabel htmlFor="hf-password">계좌 한도</CLabel>
                  </CCol>
                  <CCol md="3">
                  <CInput id="name" placeholder={Number2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+ " ₩"} required />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AccInfo
