import React, { useState, useEffect } from 'react';
import ShopDetail from './Component/pages/shop/ShopDetail/ShopDetail';
import OrderMain from './Component/pages/shop/ShopOrder/OrderMain';
import SellMain from './Component/pages/shop/ShopSell/SellMain';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import Cart from './Component/pages/shop/ShopCart/Cart';
import ShopMain from './Component/pages/shop/ShopMain';
import ShopMyPage from './Component/pages/shop/ShopMyPage/ShopMyPage';
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
import Navbar from './Component/pages/camp/CampNavbar';
import Home from './Component/pages/camp/CampMain/Home/Home';
import About from './Component/pages/camp/CampMain/About/About';
import Reservations from './Component/pages/camp/CampMain/Reservations/Reservations';
import Inquiry from './Component/pages/camp/CampMain/Inquiry/Inquiry';
import ScrollToTop from './Component/pages/camp/CampScrollToTop';
import './Component/pages/camp/CampStyle.css';
import './CampApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/pages/camp/CampFooter';
import ShopLayout from './Component/pages/shop/ShopLayout';
import Tent from './Component/pages/shop/Category/Tent';
import Sleeping from './Component/pages/shop/Category/Sleeping';
import Kitchen from './Component/pages/shop/Category/Kitchen';
import Lamp from './Component/pages/shop/Category/Lamp';
import BBQ from './Component/pages/shop/Category/BBQ';
import Chair from './Component/pages/shop/Category/Table';
import CreateProduct from './Component/pages/shop/ShopOrder/CreateProduct';




function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>안녕하세요. 캠플리에 오신걸 환영합니다.</h1>
              <Link to="/camp">캠핑예약으로 이동하기</Link>
              <Link to="/shop/main">쇼핑몰로 이동하기</Link>
            </div>
          }
        />
        <Route
          path="/camp/*"
          element={
            <>
              <Preloader load={load} />
              <div className="App" id={load ? 'no-scroll' : 'scroll'}>
                <Navbar />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/reservation" element={<Reservations />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/inquiry" element={<Inquiry />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/register/general"
                    element={<GeneralRegister />}
                  />
                  <Route
                    path="/register/manager"
                    element={<ManagerRegister />}
                  />
                  <Route
                    path="/register/general/email"
                    element={<GeneralEmailRegister />}
                  />
                  <Route
                    path="/register/manager/email"
                    element={<ManagerEmailRegister />}
                  />
                </Routes>
              </div>
            </>
          }
        />
        <Route
          path="/register/manager/email"
          element={<ManagerEmailRegister />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/camp/board/add" element={<CampBoard />} />
        <Route path="/camp/board/all" element={<CampBoardAll />} />
        <Route path="/camp/board/get/:camp_id" element={<CampBoardDetail />} />
        <Route path="/camp/board/edit/:camp_id" element={<CampBoardUpdate />} />
        <Route
          path="/shop/*"
          element={
            <ShopLayout>
              <Routes>
              <Route path="/main" element={<ShopMain />} />
                <Route path="/detail/:productId" element={<ShopDetail/>} />
                <Route path="/order" element={<OrderMain />} />
                <Route path="/sell" target="_blank"  element={<CreateProduct />} />
                <Route path="/mypage" element={<ShopMyPage />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/tent" element={<Tent/>}/>
                <Route path="/chair" element={<Chair/>}/>
                <Route path="/sleeping" element={<Sleeping/>}/>
                <Route path="/kitchen" element={<Kitchen/>}/>S
                <Route path="/lamp" element={<Lamp/>}/>
                <Route path="/fireplace" element={<BBQ/>}/>
                
              </Routes>
            </ShopLayout>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;