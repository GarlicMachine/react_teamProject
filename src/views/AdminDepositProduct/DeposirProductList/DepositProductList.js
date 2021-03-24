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

const DepositProductList = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              예금상품등록              
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="y_name">상품명</CLabel>
                <CInput id="y_name" placeholder="상품명을 입력해주세요" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="y_interest_rate">금리</CLabel>
                <CInput id="y_interest_rate" placeholder="1.0%" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="y_price">예금금액</CLabel>
                <CInput id="y_price" placeholder="10,000,000원" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="y_max_date">최대예금기간</CLabel>
                <CInput id="y_max_date" placeholder="2030-00-00" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="y_max_date">최소예금기간</CLabel>
                <CInput id="y_max_date" placeholder="2030-00-00" />
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="8">
                  <CFormGroup>
                    <CLabel htmlFor="city">City</CLabel>
                    <CInput id="city" placeholder="Enter your city" />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="postal-code">Postal Code</CLabel>
                    <CInput id="postal-code" placeholder="Postal Code" />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="country">Country</CLabel>
                <CInput id="country" placeholder="Country name" />
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
     
    </>
  )
}

export default DepositProductList
