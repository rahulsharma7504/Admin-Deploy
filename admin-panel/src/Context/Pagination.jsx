import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import '../Styles/Paginate.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <ButtonGroup className="pagination-btn-group">
        <Button className="pagination-btn" onClick={() => onPageChange(currentPage - 1)}isDisabled={currentPage === 1}> Previous
        </Button>
        {pages.map(page => (
          <Button
            key={page}
            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)} >{page}</Button>))}
        <Button className="pagination-btn" onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}>Next</Button>
      </ButtonGroup>
    </div>
  );
};

export default Pagination;
