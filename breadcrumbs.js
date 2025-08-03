import React from 'react';
import { useNavigate } from 'react-router-dom'; // Optional: for navigation

export default function Breadcrumbs({ pathSegments = [] }) {
  const navigate = useNavigate?.(); // optional, can be removed if not using routing

  const handleClick = (index) => {
    const newPath = '/' + pathSegments.slice(0, index + 1).join('/');
    if (navigate) {
      navigate(newPath);
    } else {
      console.log('Navigating to:', newPath);
    }
  };

  return (
    <nav style={{ padding: '10px 20px', fontSize: '14px' }}>
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        return (
          <span key={index}>
            {!isLast ? (
              <span
                onClick={() => handleClick(index)}
                style={{
                  color: '#007bff',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginRight: '6px',
                }}
              >
                {capitalize(segment)}
              </span>
            ) : (
              <span style={{ color: '#333' }}>{capitalize(segment)}</span>
            )}
            {!isLast && <span style={{ margin: '0 6px' }}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
