import React, { useState, useEffect, Component } from "react";
import ShopDetail from "./Component/pages/shop/ShopDetail/ShopDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
<<<<<<< HEAD
} from "react-router-dom";

import Register from "./Component/pages/common/Register";
import GeneralRegister from "./Component/pages/common/GeneralRegister";
import ManagerRegister from "./Component/pages/common/ManagerRegister";
import GeneralEmailRegister from "./Component/pages/common/GeneralEmailRegister";
import ManagerEmailRegister from "./Component/pages/common/ManagerEmailRegister";
import Login from "./Component/pages/common/Login";
import Preloader from "./Pre";
import Navbar from "./Component/pages/camp/CampNavbar";
import CampSearch from "./Component/pages/camp/CampSearch/CampSearch";
import Home from "./Component/pages/camp/CampMain/Home/Home";
import About from "./Component/pages/camp/CampMain/About/About";
import Reservations from "./Component/pages/camp/CampMain/Reservations/Reservations";
import Inquiry from "./Component/pages/camp/CampMain/Inquiry/Inquiry";
import ScrollToTop from "./Component/pages/camp/CampScrollToTop";
import "./Component/pages/camp/CampStyle.css";
import "./CampApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Component/pages/camp/CampFooter";
import ShopMain from "./Component/pages/shop/ShopMain";
import ShopMyPage from "./Component/pages/shop/ShopMyPage/ShopMyPage";
import ShopLayout from "./Component/pages/shop/ShopLayout";
import Tent from "./Component/pages/shop/Category/Tent";
import Sleeping from "./Component/pages/shop/Category/Sleeping";
import Kitchen from "./Component/pages/shop/Category/Kitchen";
import Lamp from "./Component/pages/shop/Category/Lamp";
import BBQ from "./Component/pages/shop/Category/BBQ";
import Chair from "./Component/pages/shop/Category/Table";
import CreateProduct from "./Component/pages/shop/ShopOrder/CreateProduct";
import SellerProduct from "./Component/pages/shop/ShopOrder/SellerProduct";
import UpdateProduct from "./Component/pages/shop/ShopOrder/UpdateProduct";
import ShopMore from "./Component/pages/shop/ShopDetail/ShopMore/ShopMore";
import ShopInquiry from "./Component/pages/shop/ShopDetail/ShopInquiry/ShopInquiry";
import ButtonUp from "./Component/pages/shop/ButtonUp";
import ShopReview from "./Component/pages/shop/ShopDetail/ShopReview/ShopReview";
import ReviewDetail from "./Component/pages/shop/ShopDetail/ShopReview/ReviewDetail";
import ReviewUpdate from "./Component/pages/shop/ShopDetail/ShopReview/ReviewUpdate";
import InquiryDetail from "./Component/pages/shop/ShopDetail/ShopInquiry/InquiryDetail";
import UpdateBoard from "./Component/pages/camp/CampBoard/CampBoardUpdate";
import InquiryUpdate from "./Component/pages/shop/ShopDetail/ShopInquiry/InquiryUpdate";
import InquiryWriter from "./Component/pages/shop/ShopDetail/ShopInquiry/InquiryWriter";
import ReviewWriter from "./Component/pages/shop/ShopDetail/ShopReview/ReviewWriter";
import ShopCart from "./Component/pages/shop/ShopCart";
import OrderCart from "./Component/pages/shop/ShopOrder/Order/OrderCart";
import MyPage from "./Component/pages/common/MyPage";
import EditUser from "./Component/pages/common/EditUser";
import campMainImg from "./Component/img/MainImg/메인페이지 이미지2.jpeg";
import CampBoard from "./Component/pages/camp/CampBoard/CampBoard";
import CampBoardAll from "./Component/pages/camp/CampBoard/CampBoardAll";
import CampBoardDetail from "./Component/pages/camp/CampBoard/CampBoardDetail";
import CampBoardUpdate from "./Component/pages/camp/CampBoard/CampBoardUpdate";
import CampReserve from "./Component/pages/camp/CampReserve/CampReserve";
import CampBoardTent from "./Component/pages/camp/CampBoard/CampBoardTent";
import CampBoardCaravan from "./Component/pages/camp/CampBoard/CampBoardCaravan";
import CampBoardGlamping from "./Component/pages/camp/CampBoard/CampBoardGlamping";
import CampBoardPension from "./Component/pages/camp/CampBoard/CampBoardPension";
import CampBoardSite from "./Component/pages/camp/CampBoard/CampBoardSite";
import MyShopping from "./Component/pages/common/MyShopping";
import MyCamping from "./Component/pages/common/MyCamping";
import CartList from "./Component/pages/shop/ShopCart/Cartlist";
import "./Component/pages/camp/CampStyle.css";
import "./CampApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
=======
} from 'react-router-dom';

import Register from './Component/pages/common/Register';
import GeneralRegister from './Component/pages/common/GeneralRegister';
import ManagerRegister from './Component/pages/common/ManagerRegister';
import GeneralEmailRegister from './Component/pages/common/GeneralEmailRegister';
import ManagerEmailRegister from './Component/pages/common/ManagerEmailRegister';
import Login from './Component/pages/common/Login';
import Preloader from './Pre';
import Navbar from './Component/pages/camp/CampNavbar';
import CampSearch from './Component/pages/camp/CampSearch/CampSearch';
import Home from './Component/pages/camp/CampMain/Home/Home';
import About from './Component/pages/camp/CampMain/About/About';
import Reservations from './Component/pages/camp/CampMain/Reservations/Reservations';
import Inquiry from './Component/pages/camp/CampMain/Inquiry/Inquiry';
import ScrollToTop from './Component/pages/camp/CampScrollToTop';
import './Component/pages/camp/CampStyle.css';
import './CampApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/pages/camp/CampFooter';
import ShopMain from './Component/pages/shop/ShopMain';
import ShopMyPage from './Component/pages/shop/ShopMyPage/ShopMyPage';
import ShopLayout from './Component/pages/shop/ShopLayout';
import Tent from './Component/pages/shop/Category/Tent';
import Sleeping from './Component/pages/shop/Category/Sleeping';
import Kitchen from './Component/pages/shop/Category/Kitchen';
import Lamp from './Component/pages/shop/Category/Lamp';
import BBQ from './Component/pages/shop/Category/BBQ';
import Chair from './Component/pages/shop/Category/Table';
import CreateProduct from './Component/pages/shop/ShopOrder/CreateProduct';
import SellerProduct from './Component/pages/shop/ShopOrder/SellerProduct';
import UpdateProduct from './Component/pages/shop/ShopOrder/UpdateProduct';
import ShopMore from './Component/pages/shop/ShopDetail/ShopMore/ShopMore';
import ShopInquiry from './Component/pages/shop/ShopDetail/ShopInquiry/ShopInquiry';
import ButtonUp from './Component/pages/shop/ButtonUp';
import ShopReview from './Component/pages/shop/ShopDetail/ShopReview/ShopReview';
import ReviewDetail from './Component/pages/shop/ShopDetail/ShopReview/ReviewDetail';
import ReviewUpdate from './Component/pages/shop/ShopDetail/ShopReview/ReviewUpdate';
import InquiryDetail from './Component/pages/shop/ShopDetail/ShopInquiry/InquiryDetail';
import UpdateBoard from './Component/pages/camp/CampBoard/CampBoardUpdate';
import InquiryUpdate from './Component/pages/shop/ShopDetail/ShopInquiry/InquiryUpdate';
import InquiryWriter from './Component/pages/shop/ShopDetail/ShopInquiry/InquiryWriter';
import ReviewWriter from './Component/pages/shop/ShopDetail/ShopReview/ReviewWriter';
import ShopCart from './Component/pages/shop/ShopCart';
import OrderCart from './Component/pages/shop/ShopOrder/Order/OrderCart';
import MyPage from './Component/pages/common/MyPage';
import EditUser from './Component/pages/common/EditUser';
import campMainImg from './Component/img/MainImg/메인페이지 이미지2.jpeg';
import CampBoard from './Component/pages/camp/CampBoard/CampBoard';
import CampBoardAll from './Component/pages/camp/CampBoard/CampBoardAll';
import CampBoardDetail from './Component/pages/camp/CampBoard/CampBoardDetail';
import CampBoardUpdate from './Component/pages/camp/CampBoard/CampBoardUpdate';
import CampReserve from './Component/pages/camp/CampReserve/CampReserve';
import CampBoardTent from './Component/pages/camp/CampBoard/CampBoardTent';
import CampBoardCaravan from './Component/pages/camp/CampBoard/CampBoardCaravan';
import CampBoardGlamping from './Component/pages/camp/CampBoard/CampBoardGlamping';
import CampBoardPension from './Component/pages/camp/CampBoard/CampBoardPension';
import CampBoardSite from './Component/pages/camp/CampBoard/CampBoardSite';
import MyShopping from './Component/pages/common/MyShopping';
import MyCamping from './Component/pages/common/MyCamping';

import './Component/pages/camp/CampStyle.css';
import './CampApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> c0dbc5046d05e6aee029cfdb6597a7f9da10cf6e

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
          path='/'
          element={
            <div className='container text-center mt-5'>
              <h1 className='display-4'>
                안녕하세요. 캠플리에 오신걸 환영합니다.
              </h1>
              <p className='lead'>캠핑 예약 또는 쇼핑 몰로 이동하세요.</p>
              <div className='d-flex justify-content-center'>
                <Link to='/camp' className='btn btn-primary m-2'>
                  <img
                    src={campMainImg}
                    alt='Camping Image'
                    className='img-thumbnail'
                    style={{ width: "200px", height: "200px" }}
                  />
                  <p>캠핑 예약</p>
                </Link>

                <Link to='/shop/main' className='btn btn-success m-2'>
                  <img
                    src={campMainImg}
                    alt='Shopping Image'
                    className='img-thumbnail'
                    style={{ width: "200px", height: "200px" }}
                  />
                  <p>쇼핑몰</p>
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path='/seller'
          element={
            <div>
              <Navbar />
              <h1 style={{ marginTop: "100px" }}>상품관리 페이지.</h1>
              <Link to='/seller/sell'>상품등록</Link>
              <Link to='/seller/list'>상품리스트</Link>
            </div>
          }
        />

        <Route
          path='/seller/*'
          element={
            <>
              <Preloader load={load} />
              <div className='App' id={load ? "no-scroll" : "scroll"}>
                <Routes>
                  <Route path='/sell' element={<CreateProduct />} />
                  <Route path='/list' element={<SellerProduct />} />
                  <Route
                    path='/product/edit/:productId'
                    element={<UpdateProduct />}
                  />
                </Routes>
              </div>
            </>
          }
        />

        <Route
          path='/camp/*'
          element={
            <>
              <Preloader load={load} />
              <div className='App' id={load ? "no-scroll" : "scroll"}>
                <Navbar />
                <ScrollToTop />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/reservation' element={<Reservations />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/inquiry' element={<Inquiry />} />
                </Routes>
              </div>
            </>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/register/general' element={<GeneralRegister />} />
        <Route path='/register/manager' element={<ManagerRegister />} />
        <Route
          path='/register/general/email'
          element={<GeneralEmailRegister />}
        />
        <Route
          path='/register/manager/email'
          element={<ManagerEmailRegister />}
        />

<<<<<<< HEAD
        <Route path='/login' element={<Login />} />
        <Route path='/camp/board/add' element={<CampBoard />} />
        <Route path='/camp/board/all' element={<CampBoardAll />} />
        <Route path='/camp/board/get/:camp_id' element={<CampBoardDetail />} />
        <Route path='/camp/board/edit/:camp_id' element={<CampBoardUpdate />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/myshopping' element={<MyShopping />} />
        <Route path='/mycamping' element={<MyCamping />} />
        <Route path='/mypage/edit' element={<EditUser />} />
        <Route path='/camp/searchList' element={<CampSearch />} />
        <Route path='/camp/reserve' element={<CampReserve />} />

        <Route path='/camp/board/caravan' element={<CampBoardCaravan />} />
        <Route path='/camp/board/tent' element={<CampBoardTent />} />
        <Route path='/camp/board/glamping' element={<CampBoardGlamping />} />
        <Route path='/camp/board/site' element={<CampBoardSite />} />
        <Route path='/camp/board/pension' element={<CampBoardPension />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/camp/board/add" element={<CampBoard />} />
        <Route path="/camp/board/all" element={<CampBoardAll />} />
        <Route path="/camp/board/get/:camp_id" element={<CampBoardDetail />} />
        <Route path="/camp/board/edit/:camp_id" element={<CampBoardUpdate />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myshopping" element={<MyShopping />} />
        <Route path="/mycamping" element={<MyCamping />} />
        <Route path="/mypage/edit" element={<EditUser />} />
        <Route path="/camp/searchList" element={<CampSearch />} />
        <Route path="/camp/reserve" element={<CampReserve />} />

        <Route path="/camp/board/caravan" element={<CampBoardCaravan />} />
        <Route path="/camp/board/tent" element={<CampBoardTent />} />
        <Route path="/camp/board/glamping" element={<CampBoardGlamping />} />
        <Route path="/camp/board/site" element={<CampBoardSite />} />
        <Route path="/camp/board/pension" element={<CampBoardPension />} />
>>>>>>> c0dbc5046d05e6aee029cfdb6597a7f9da10cf6e

        <Route
          path='/shop/*'
          element={
            <ShopLayout>
              <Routes>
                <Route path='/main' element={<ShopMain />} />
                <Route path='/order/:productId' element={<OrderCart />} />
                <Route path='/mypage' element={<ShopMyPage />} />
                <Route path='/cart' element={<ShopCart />} />
                <Route path='/tent' element={<Tent />} />
                <Route path='/chair' element={<Chair />} />
                <Route path='/sleeping' element={<Sleeping />} />
                <Route path='/kitchen' element={<Kitchen />} />
                <Route path='/lamp' element={<Lamp />} />
                <Route path='/fireplace' element={<BBQ />} />
              </Routes>
            </ShopLayout>
          }
        />
        <Route path='/shop/mycart/:userId' element={<CartList />} />
        <Route path='/shop/detail/:productId' element={<ShopDetail />} />
        <Route path='/shop/detail/:productId/more' element={<ShopMore />} />
        <Route path='/shop/detail/:productId/review' element={<ShopReview />} />

        <Route path='/shop/review/view/:reviewNo' element={<ReviewDetail />} />
        <Route path='/review/update/:reviewNo' element={<ReviewUpdate />} />
        <Route
          parh='/shop/detail/:productId/inquiry'
          element={<ShopInquiry />}
        />
        <Route
          path='/shop/question/view/:questionNo'
          element={<InquiryDetail />}
        />
        <Route path='/inquiry/update/:questionNo' element={<InquiryUpdate />} />
        <Route path='/inquiry/writer' element={<InquiryWriter />} />
        <Route path='/review/writer' element={<ReviewWriter />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
