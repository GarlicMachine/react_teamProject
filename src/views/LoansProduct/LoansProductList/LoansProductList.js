import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable} from '@coreui/react';
import LoansProductData from '../../users/LoansProductData'

const LoansProductList = () => {
	const fields = ['d_name', 'd_date', 'd_interest_rate', 'd_min_price', 'd_max_price', 'd_min_date', 'd_max_date']

	return (
		<>
			<CRow>
				<CCol xs="12" lg="12">
					<CCard>
						<CCardHeader>
						대출상품 리스트	
						</CCardHeader>
						<CCardBody>
							<CDataTable
								items={LoansProductData}
								fields={fields}
								itemsPerPage={10}
								pagination
							/>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</>
	)
}

export default LoansProductList