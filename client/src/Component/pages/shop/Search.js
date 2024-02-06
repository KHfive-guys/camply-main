import React, { useState } from 'react';
import axios from 'axios';

import './css/ShopMain.css';

const Search = () => {
  const [productName, setProductName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/shop/main/search/${productName}`);
      setSearchResults(response.data);
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  
  const handleDetailClick = (productId) => {
    window.location.href = `/shop/detail/${productId}`;
  }

  return (
    <>
    <div className='container1'>
    <div className='search-btn' style={{ display: 'flex', alignItems: 'center' }}>
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
          backgroundColor: '#FEA92A',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        검색
      </button>
    </div> 
  
    {/* 여기서 검색 결과를 표시하거나 활용할 수 있습니다. */}
    <div style={{display:'flex', justifyContent:'center'}} className='searchResult'>
      {searchResults.length > 0 && (
        <ul className='swiper-wrapper'>
          <div>
          <h2 style={{paddingBottom:'30px'}}>검색결과:<span style={{color:'red'}}>{searchResults.length}</span></h2>
          </div>
          {searchResults.map((product) => (
            <li className='swiper-slide swiper-slide-active' style={{
              width: "272.5px",
              marginRight: "30px",
            }}>
              <div className='imgWrap'>
                <img src={product.productThumbnail} className="imgs" alt={product.productName} onClick={() => handleDetailClick(product.productId)} />
              </div>
              <div className="textWrap">
                <p style={{ fontSize: '20px' }} className="companyName"><b>{product.productName}</b></p>
                <p className="itemName1">{product.productDescription}</p>
                <div className="itemsPrice clearfix">
                  <div className="fr">
                    <strong className="sellPrice">{product.formattedProductPrice}</strong>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {searchResults.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
    </div>
  </>
  
    );
  };

export default Search;