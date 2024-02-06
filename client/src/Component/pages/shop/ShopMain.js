import React from 'react';
import Main from '../shop/Main';
import Search from './Search';
import Tent from './Category/Tent';
import Table from './Category/Table';
import Sleeping from './Category/Sleeping';
import BBQ from './Category/BBQ';
import Kitchen from './Category/Kitchen';
import Lamp from './Category/Lamp';

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
        
        <h2 style={{marginBottom:'70px', marginTop:'50px', textAlign:'center'}}>카테고리별 상품</h2>
        <Tent/>
        <Sleeping/>
        <Lamp/>
        <BBQ/>
        <Table/>
        <Kitchen/>
      </div>
    </div>
  );
};

export default ShopMain;
