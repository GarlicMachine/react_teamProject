import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CRow,
  CCollapse,
  CInput,
  CSelect,
} from '@coreui/react'
import { useAsync } from 'react-async';
import axios from 'axios';

async function getUsers({account}) {
  console.log(account)
  const response = await axios.get(`/useAcc/${account}`);
  return response.data;
}
 
const AccInfo = ({match}) => {

  const { data: accData2, error, isLoading, reload } = useAsync({
    promiseFn: getUsers,account:match.params.account
  });

  const [collapse, setCollapse] = useState(false)
  const [collapseMulti, setCollapseMulti] = useState([false, false])
  const [accordion, setAccordion] = useState(1)
  if(match.params.update==='1'){
    alert("변경되었습니다.");
    match.params.update=0;
  }else if(match.params.update==='0'){
    alert("실패.");
    match.params.update=-1;
  }
    const toggle = (e) => {
      setCollapse(!collapse)
      e.preventDefault()
    }

    const toggle2 = (e2) => {
      setCollapse(!collapse)
      e2.preventDefault()
    }

    const toggleMulti = (type) => {
      let newCollapse = collapseMulti.slice()
      switch (type) {
        case "left":
          newCollapse[0] = !collapseMulti[0];
          break;
        case "right":
          newCollapse[1] = !collapseMulti[1];
          break;
        case "both":
          newCollapse[0] = !collapseMulti[0];
          newCollapse[1] = !collapseMulti[1];
          break;
        default:
      }
      setCollapseMulti(newCollapse)
    }

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!accData2) return <button onClick={reload}>불러오기</button>;
  return (
    <>
      <CRow>
        <CCol md="5">
          <CCard>
            <CCardHeader>
              회원정보  
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form">

                <CFormGroup row>
                    <CCol md="2">
                        <CLabel htmlFor="hf-name">회원 ID </CLabel>
                    </CCol>

                    <CCol md="3">
                         {accData2[0].ID}
                    </CCol>
                    <CCol md="2">
                    <CLabel htmlFor="hf-name">이름</CLabel>
                  </CCol>
                  <CCol md="2">
                  {accData2[0].NAME}
                  </CCol>

                </CFormGroup>

                <CFormGroup row>


                  <CCol md="2">
                  <CLabel htmlFor="hf-email">주민</CLabel>
                  </CCol>
                  <CCol md="3">
                    <p> {accData2[0].JUMIN} </p>
                  </CCol>
                  <CCol md="2">
                        <CLabel htmlFor="hf-name">HP</CLabel>
                    </CCol>
                    <CCol md="3">
                    {accData2[0].ID}
                    </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>



        <CCol xs="12" md="7">
          <CCard>
            <CCardHeader>
              계좌정보
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="/AccountInfoAccPwUpdate" method="post" className="formPW">
              <CInput type="hidden" id="account" name="account" value={accData2[0].ACCOUNT} />
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="hf-password">계좌번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
                    <p>{accData2[0].ACCOUNT}</p>
                  </CCol>
                  
                  <CCol md="2">
                    비밀번호
                  </CCol>

                  <CCol md="2">
                    <CButton 
                    block color="dark"
                    onClick={toggle}
                    >비밀번호 변경</CButton>
                  </CCol>
                  <CCollapse show={collapse}>
             
                  <CInput id="pwChange" name="pwChange" placeholder="비밀번호" />
                    <CButton block color="primary" type="submit" >변경</CButton>
                    <CButton block color="danger" type="reset" onClick={toggle}>취소</CButton>
                   </CCollapse>
                </CFormGroup>
                </CForm>

                <CForm action="AccountInfoAccstateUpdate" method="post" className="form-b">
                <CInput type="hidden" id="account" name="account" value={accData2[0].ACCOUNT} />
                  <hr/>
                <CFormGroup row>
                <CCol md="2">
                    <CLabel htmlFor="hf-password">잔액</CLabel>
                  </CCol>
                  <CCol md="3">
                  {accData2[0].BALANCE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp; ₩
                  </CCol>


                  <CCol md="2">
                    <CLabel htmlFor="hf-password">계좌 한도</CLabel>
                  </CCol>
                  <CCol md="3">
                  {accData2[0].ACCOUNTLIMIT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+ " ₩"}
                  </CCol>
                </CFormGroup>
                <hr/>
                <CFormGroup row>
                <CCol md="2">
                    계좌종류
                  </CCol>
                  <CCol md="3">
                    {accData2[0].ACCOUNTTYPE}
                  </CCol>


                  <CCol md="2">
                    신규일
                  </CCol>
                  <CCol md="3">
                  {accData2[0].NEW_DATE}
                  </CCol>
                </CFormGroup>
                <hr/>
                <CFormGroup row>
                <CCol md="2">
                    계좌상태
                  </CCol>
                  <CCol md="3">
                  
                  <CButton 
                    block
                    color="dark"
                    onClick={() => setAccordion(accordion === 0 ? null : 0)}
                  >{accData2[0].ACCOUNTSTATE}</CButton>
                   <CCollapse show={accordion === 0}>
                   <CSelect custom name="state" id="state">
                      <option>정상</option>
                      <option>휴면</option>
                      <option>정지</option>
                      <option>해지</option>
                    </CSelect>
                    <CInput id="ACC_STATE_CONTENT" name="ACC_STATE_CONTENT" placeholder="변경사유를 입력해주세요" />
                    <CButton color="primary" type="submit" >변경</CButton>
                   </CCollapse>
                  </CCol>


                  <CCol md="2">
                    상태설명
                  </CCol>
                  <CCol md="3">
                  {accData2[0].ACC_STATE_CONTENT}
                  </CCol>
                </CFormGroup>
                <hr/>
                <CFormGroup row>
                <CCol md="2">
                    해지일
                  </CCol>
                  <CCol md="3">
                  {accData2[0].DELETE_DATE}
                  </CCol>
                  <CCol md="2">
                    휴면일
                  </CCol>
                  <CCol md="3">
                  {accData2[0].SLEEP_DATE}
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
{/*
            <CCardFooter>
              
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                
            </CCardFooter>
*/}
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AccInfo
