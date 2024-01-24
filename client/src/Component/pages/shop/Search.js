import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [productName, setProductName] = useState(''); // 검색어 상태 변경

  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (productName) => {
    try {
      // 실제 서버에서 검색을 처리하는 API 엔드포인트로 요청을 보냅니다.
      const response = await axios.get(`http://localhost:8080/main/search/${productName}`);
      
      // 검색 결과를 상태에 저장합니다.
      setSearchResults(response.data);

      // 여기서 결과를 활용하거나 필요한 로직을 추가할 수 있습니다.
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="검색어를 입력하세요"
        style={{
          padding: '10px',
          borderRadius: '20px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="button"
        onClick={handleSearch}
        style={{
          marginLeft: '10px',
          padding: '10px',
          borderRadius: '20px',
          backgroundColor: '##FEA92A',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        검색
      </button>

      {/* 여기서 검색 결과를 표시하거나 활용할 수 있습니다. */}
      {searchResults && (
        <div>
          <h3>검색 결과</h3>
          <ul>
            {searchResults.map((search) => (
              <li key={search.productId}>{search.productName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
