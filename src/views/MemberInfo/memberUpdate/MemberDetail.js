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
  CLink,
  CRow,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useAsync } from 'react-async';
import axios from 'axios';
import { render } from 'enzyme/build';


async function getUsers({id}) {
  console.log(id);
  const response = await axios.get(`/memberDetail/${id}`);
  return response.data;
}

const MemberDetail = ({match}) => {
 /*  document.location.href = "http://localhost/teamProject/main.cc" */

  const { data: accData2, error, isLoading, reload } = useAsync({
    promiseFn: getUsers, id:match.params.id
  });
    
  const nameChange=(e)=>{
    accData2[0].NAME=e.target.value;
  }
    const Number = 1000000000;
    const Number2 = 10000000;
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!accData2) return <button onClick={reload}>불러오기</button>;
  return (
    <>
      <CRow>
        <CCol md="4" style={{ margin: '0 auto'}}> 
          <CCard>
            <CCardHeader>회원정보</CCardHeader>
            <CCardBody>
              <CForm action="/memberUpdate" method="post" className="form">
                <input type="hidden" name="ID" value={accData2[0].ID}/>
                <CFormGroup row >
                    <CCol md="3">
                        <CLabel htmlFor="hf-name">회원 ID </CLabel>
                    </CCol>

                    <CCol md="6">
                        {accData2[0].ID}
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-name">이름</CLabel>
                  </CCol>
                  <CCol md="6">
                        <CInput type="text" name="NAME" id="NAME" defaultValue={accData2[0].NAME}  onChange={nameChange} placeholder={accData2[0].NAME} required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                  <CLabel htmlFor="hf-email">주민번호</CLabel>
                  </CCol>
                  <CCol md="6">
                     {accData2[0].JUMIN}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="hf-name">이메일</CLabel>
                    </CCol>
                    <CCol md="6">
                        <CInput type="text" id="JOB" name="EMAIL" defaultValue={accData2[0].EMAIL} placeholder={accData2[0].EMAIL}  />
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="hf-name">HP</CLabel>
                    </CCol>
                    <CCol md="6">
                        <CInput type="text" id="PHONE" name="PHONE" defaultValue={accData2[0].PHONE} placeholder={accData2[0].PHONE}  />
                    </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="hf-name">직업</CLabel>
                    </CCol>
                    <CCol md="6">
                        <CInput type="text" id="JOB" name="JOB" defaultValue={accData2[0].JOB}  placeholder={accData2[0].JOB}  />
                    </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                    <CCol md="3">
                        <CLabel htmlFor="hf-name">권한</CLabel>
                    </CCol>
                    <CCol md="6">
                            {accData2[0].AUTHORITY==='ROLE_USER'?
                                <CSelect name='AUTHORITY' id="AUTHORITY"><option value="ROLE_USER"  name="AUTHORITY">일반회원</option>
                                 <option value="ROLE_MANAGER" >펀드관리자</option>  </CSelect>:
                                 <CSelect name='AUTHORITY' id="AUTHORITY"><option value="ROLE_MANAGER" name="AUTHORITY">펀드관리자</option>
                                 <option value="ROLE_USER">일반회원</option></CSelect>}
                    </CCol>
                </CFormGroup>
                <br/>
                <CFormGroup row>

                <CCardFooter >
                  <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                  <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CCardFooter>
                
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MemberDetail
