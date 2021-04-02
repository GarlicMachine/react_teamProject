import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'


const fields = [
  {key : '상품명'}
]

const SavingsRegistration = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)


  const onFormSubmit = e => {
    const formData = new FormData(e.target)
    const formDataObj = Object.fromEntries(formData.entries())

    if(formDataObj.J_MIN_DATE > formDataObj.J_MAX_DATE) {
      alert("최대적금기간이 최소적금기간 이상이어야 합니다.");
      e.preventDefault()
    }
  };

  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader><br/>
              <h2>적금상품등록</h2> 
            </CCardHeader>
            <CCardBody>
              <CForm action="/savings/SavingsRegistration" method="post" onSubmit={onFormSubmit}>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">적금상품이름</CLabel>
                  </CCol>
                  <CCol xs="10" md="3">
                    <CInput id="text-input" name="J_NAME" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="10" md="3">
                    <CLabel htmlFor="text-input">적금상품한줄요약</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput id="text-input" name="J_SUMMARY" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">적금종류</CLabel>
                  </CCol>
                  <CCol sm="2">
                  <CSelect name="J_TYPE">
                      <option value="단리">단리</option>
                      <option value="복리">복리</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">금리(%)</CLabel>
                  </CCol>
                  <CCol sm="2">
                    <CInput type="number" step="0.1" min="0.1" name="J_INTEREST_RATE"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">최대적금기간(~36개월)</CLabel>
                  </CCol>
                  <CCol sm="2">
                    <CInput type="number" max="36" min="1" name="J_MAX_DATE"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">최소적금기간(1개월~)</CLabel>
                  </CCol>
                  <CCol xs="2">
                    <CInput type="number" max="36" min="1" name="J_MIN_DATE"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">적금설명</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="J_EXPLANATION" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..." 
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">유의사항</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="J_NOTICE" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..." 
                    />
                  </CCol>
                </CFormGroup>
                <CCardFooter>
                <div style={{textAlign:'center'}}>
                  <CButton type="submit" size="lg" color="info">등록</CButton>
                </div>
                </CCardFooter>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SavingsRegistration