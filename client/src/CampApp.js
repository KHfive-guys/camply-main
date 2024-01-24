import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Component/pages/common/Register';
import GeneralRegister from './Component/pages/common/GeneralRegister';
import ManagerRegister from './Component/pages/common/ManagerRegister';
import GeneralEmailRegister from './Component/pages/common/GeneralEmailRegister';
import ManagerEmailRegister from './Component/pages/common/ManagerEmailRegister';
import Login from './Component/pages/common/Login';
import CampBoard from './Component/pages/camp/CampBoard/CampBoard';
import CampBoardAll from './Component/pages/camp/CampBoard/CampBoardAll';
import CampBoardDetail from './Component/pages/camp/CampBoard/CampBoardDetail';
import CampBoardUpdate from './Component/pages/camp/CampBoard/CampBoardUpdate';
import Preloader from './Pre';
import CampNavbar from './Component/pages/camp/CampNavbar';
import Home from './Component/pages/camp/CampMain/Home/Home';
import About from './Component/pages/camp/CampMain/About/About';
import Reservations from './Component/pages/camp/CampMain/Reservations/Reservations';
import CampFooter from './Component/pages/camp/CampFooter';
import Inquiry from './Component/pages/camp/CampMain/Inquiry/Inquiry';
import ScrollToTop from './Component/pages/camp/CampScrollToTop';
import './Component/pages/camp/CampStyle.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopDetail from './Component/pages/shop/ShopDetail/ShopDetail';
import OrderMain from './Component/pages/shop/ShopOrder/OrderMain';
import SellMain from './Component/pages/shop/ShopSell/SellMain';
import ShopCart from './Component/pages/shop/ShopCart';
import ShopMain from './Component/pages/shop/ShopMain';
import ShopMyPage from './Component/pages/shop/ShopMyPage/ShopMyPage';


function CampApp() {

  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? 'no-scroll' : 'scroll'}>
        <CampNavbar />
        <ScrollToTop />
        <Routes>
          <Route path="/camp" element={<Home />} />
          <Route path="/camp/reservation" element={<Reservations />} />
          <Route path="/camp/about" element={<About />} />
          <Route path="/camp/inquiry" element={<Inquiry />} />
          
          <Route path='/camp/board/add' element={<CampBoard />} />
          <Route path='/camp/board/all' element={<CampBoardAll />} />
          <Route path="/camp/board/get/:camp_id" element={<CampBoardDetail />} />
          <Route path="/camp/board/edit/:camp_id" element={<CampBoardUpdate />} />

          <Route path="/" element={<ShopMain/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/register/general' element={<GeneralRegister />} />
          <Route path='/register/manager' element={<ManagerRegister />} />
          <Route path='/register/general/email' element={<GeneralEmailRegister />} />
          <Route path='/register/manager/email' element={<ManagerEmailRegister />} />
          <Route path='/login' element={<Login />} />

          <Route path="/shop/detail" element={<ShopDetail/>} />
          <Route path="/shop/order" element={<OrderMain/>} />
          <Route path="/shop/sell" element={<SellMain/>} />
          <Route path="/shop/mypage" element={<ShopMyPage/>}/>
          <Route path="/shop/cart" element={<ShopCart/>} />

        </Routes>
        <CampFooter />
      </div>
    </Router>
  );
}

export default CampApp;