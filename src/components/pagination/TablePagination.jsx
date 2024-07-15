// // TablePagination.jsx
// import React from 'react';
// import Pagination from 'react-bootstrap/Pagination';
// import { usePagination, usePaginationUpdate } from '../../context/PaginationContext';

// const TablePagination = ({ totalPages }) => {
//   const currentPage = usePagination();
//   const goToPage = usePaginationUpdate();

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       goToPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       goToPage(currentPage + 1);
//     }
//   };

//   const handlePageClick = (page) => {
//     goToPage(page);
//   };

//   return (
//     <Pagination>
//       <Pagination.Prev onClick={handlePrevPage} />
//       {Array.from({ length: totalPages }, (_, index) => (
//         <Pagination.Item
//           key={index + 1}
//           active={index + 1 === currentPage}
//           onClick={() => handlePageClick(index + 1)}
//         >
//           {index + 1}
//         </Pagination.Item>
//       ))}
//       <Pagination.Next onClick={handleNextPage} />
//     </Pagination>
//   );
// };

// export default TablePagination;








// // TablePagination.js working good but not able to navigate to next page
// import React from 'react';
// import ReactPaginate from 'react-paginate';
// import { usePagination, usePaginationUpdate } from '../../context/PaginationContext';

// const TablePagination = ({ totalPages, handlePageClick }) => {
//   const currentPage = usePagination();
//   const goToPage = usePaginationUpdate();

//   return (
//     <ReactPaginate
//       previousLabel={'Previous'}
//       nextLabel={'Next'}
//       breakLabel={'...'}
//       pageCount={totalPages}
//       marginPagesDisplayed={2}
//       pageRangeDisplayed={5}
//       onPageChange={handlePageClick}
//       containerClassName={'pagination justify-content-end'}
//       activeClassName={'active'}
//       pageClassName={'page-item'}
//       pageLinkClassName={'page-link'}
//       previousClassName={'page-item'}
//       nextClassName={'page-item'}
//       previousLinkClassName={'page-link'}
//       nextLinkClassName={'page-link'}
//     />
//   );
// };

// export default TablePagination;














// // TablePagination.js
// import React from 'react';
// import ReactPaginate from 'react-paginate';
// import { usePagination, usePaginationUpdate } from '../../context/PaginationContext';

// const TablePagination = ({ totalPages, handlePageClick }) => {
//   const currentPage = usePagination();
//   const goToPage = usePaginationUpdate();

//   const handlePageChange = (selectedPage) => {
//     goToPage(selectedPage);
//   };

//   return (
//     <ReactPaginate
//       previousLabel={'Previous'}
//       nextLabel={'Next'}
//       breakLabel={'...'}
//       pageCount={totalPages}
//       marginPagesDisplayed={2}
//       pageRangeDisplayed={5}
//       onPageChange={handlePageChange}
//       containerClassName={'pagination justify-content-end'}
//       activeClassName={'active'}
//       pageClassName={'page-item'}
//       pageLinkClassName={'page-link'}
//       previousClassName={'page-item'}
//       nextClassName={'page-item'}
//       previousLinkClassName={'page-link'}
//       nextLinkClassName={'page-link'}
//     />
//   );
// };

// export default TablePagination;









////4
// TablePagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import { usePagination, usePaginationUpdate } from '../../context/PaginationContext';

const TablePagination = ({ totalPages, handlePageClick }) => {
  const currentPage = usePagination();
  const goToPage = usePaginationUpdate();

  const handlePageChange = (selectedPage) => {
    goToPage(selectedPage);
  };

  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={'pagination justify-content-end'}
      activeClassName={'active'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
    />
  );
};

export default TablePagination;



