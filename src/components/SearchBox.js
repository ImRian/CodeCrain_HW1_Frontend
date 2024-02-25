import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div style={{ 
      backgroundColor: '#F1F6FE', 
      borderRadius: '14px', 
      padding: '10px',
      width: "940px",
      margin: "0 auto" 
    }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        style={{ 
          width: '30%', 
          padding: '8px', 
          borderRadius: '4px', 
          border: 'none'
        }}
        placeholder="검색"
      />
    </div>
  );
};

export default SearchBox;
