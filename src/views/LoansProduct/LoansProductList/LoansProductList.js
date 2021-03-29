import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable, CButton, CPagination} from '@coreui/react';
import { useHistory, useLocation } from 'react-router';
import { useAsync } from 'react-async';
import axios from 'axios';

async function getLoansProductList () {
	console.log('getLoansProductList_1')
	const response = await axios.get(
		`/LoansProduct/LoansProductList/`
	);
	console.log('getLoansProductList_2')
	return response.data;
}

const LoansProductList = () => {
	const history = useHistory()
	const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
	const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
	const [page, setPage] = useState(currentPage)
	const pageChange = newPage => {
		currentPage !== newPage && history.push('/LoansProduct/LoansProductList?page=${newPage}')
	}

	useEffect(() => {
		currentPage !== page && setPage(currentPage)
	}, [currentPage, page])

	const fields = [
		{key : '대출명'},
		{key : '대출등록일'},
		{key : '대출금리'},
		{key : '최소대출금액'},
		{key : '최대대출금액'},
		{key : '최소대출기간'},
		{key : '최대대출기간'},
		{key : '조회'}
	]

	const {data : board, error, isLoading, reload} = useAsync ({
		promiseFn : getLoansProductList
	});

	if(isLoading) return <div>로딩중..</div>;
	if(error) return <div>에러가 발생했습니다.</div>;
	if(!board) return <button onClick={reload}>불러오기</button>;
	console.log(board.length)

	return (
		<>
			<CRow>
				<CCol xs="12" lg="12">
					<CCard>
						<CCardHeader>
							<strong>대출상품 리스트</strong>
						</CCardHeader>
						<CCardBody>
							<CDataTable
								items={board}
								fields={fields}
								tableFilter
								itemsPerPageSelect
								hover
								striped
								bordered
								size="sm"
								itemsPerPage={10}
								activePage={page}
								clickableRows
								scopedSlots = {{
									
									'조회' : 
									(item) => (
										<td>
											<CButton size="sm" color="primary" onClick={() => history.push(`/LoansProduct/LoansProductList/LoansProductDetail/${item.대출명}`)}>조회</CButton>
										</td>
									),
									'최소대출금액' : 
									(item) => (
										<td>
											{item.최소대출금액}억원	
										</td>
									)
								}}
							/>
							<CPagination
								activePage={page}
								onActivePageChange={pageChange}
								pages={board.length/10 + 1}
								doubleArrows={false}
								align="center"
							/>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</>
	)
}

export default LoansProductList