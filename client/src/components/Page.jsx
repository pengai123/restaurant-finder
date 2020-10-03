import React from 'react'

export default function Page(props) {
	
	let handlePrevPage = function (e){
		e.preventDefault();
		props.pageClick(-1);
	}

	let handleNextPage = function (e){
		e.preventDefault();
		props.pageClick(1);
	}
	

	return (
		<div className="page-container">
			<button className="page-btn" onClick={handlePrevPage} >Prev Page</button>
			<button className="page-btn" onClick={handleNextPage} >Next Page</button>
		</div>
	)
}
