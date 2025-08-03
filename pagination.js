import React, { useState } from 'react';

export default function PaginationExample() {
  // Mock data — you can replace this with API data
  const data = Array.from({ length: 42 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIdx, startIdx + itemsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
      <h2>Pagination Example</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentItems.map((item, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              margin: '5px 0',
              background: '#f2f2f2',
              borderRadius: '6px',
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            style={{
              margin: '0 5px',
              fontWeight: page === currentPage ? 'bold' : 'normal',
              background: page === currentPage ? '#4caf50' : '#fff',
              color: page === currentPage ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
