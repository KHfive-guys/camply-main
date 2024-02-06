import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../camp/CampNavbar';

function ShopNav( ) {
  return (
   
      <div>
        <Nav/>
        <br/>
        <div className='main-category'>
          <div className='contentsWrap'>
            <ul className='clearfix'>
              <li className='f1'>
                <Link to="/shop/tent">
                  <img src='https://www.ocamall.com/design/ocamall/2022_renew/img/main_category_icon_01.png' alt="텐트 아이콘" />
                  <span>텐트</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/sleeping" rel="noopener noreferrer">
                  <img src='https://www.ocamall.com/design/ocamall/2022_renew/img/main_category_icon_02.png' alt="침낭 아이콘" />
                  <span>침낭</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/lamp">
                  <img src='https://www.ocamall.com/design/ocamall/2022_renew/img/main_category_icon_04.png' alt="램프 아이콘" />
                  <span>램프</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/fireplace">
                  <img src='https://www.ocamall.com/design/ocamall/2022_renew/img/main_category_icon_05.png' alt="화로 아이콘" />
                  <span>화로BBQ</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/chair">
                  <img src='https://www.ocamall.com/design/ocamall/2022_renew/img/main_category_icon_03.png' alt="의자 아이콘" />
                  <span>의자</span>
                </Link>
              </li>
              <li className='f1'>
                <Link to="/shop/kitchen">
                  <img src='https://www.ocamall.com/design/ocamall/2022_renew/img/main_category_icon_06.png' alt="키친 아이콘" />
                  <span>키친</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default ShopNav;
