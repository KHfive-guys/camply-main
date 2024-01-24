import React from 'react';
import CategoryList from './CategoryList';
import Main from '../shop/Main';
import Search from './Search';

const ShopMain = () => 
{
  
  
  return (
    
    <div>

      <div>
      </div>
      <div style={{paddingTop:'50px'}}>
      </div>
      <div>
      <section className='Search'>
      
        <Search/> 
      </section>
      <section>
      </section>
      </div>
      <div>
        <Main/>
        <CategoryList/>
      </div>
    </div>
  );
};

export default ShopMain;
