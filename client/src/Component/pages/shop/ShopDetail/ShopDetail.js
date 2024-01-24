import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../css/ShopDetail/ShopDetail.css';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Nav from '../../camp/CampNavbar';
import ShopReview from './ShopReview';
import ShopMore from './ShopMore';
import ShopInquiry from './ShopInquiry';
import { Routes, Route} from 'react-router-dom';

const ShopDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/detail/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("상품 세부 정보를 불러오는 중 오류 발생", error);
      }
    };

    fetchData();
  }, [productId]);

  const handleHeart = () => {
    setLike(!like);
  };

  return (
    
    <div className='main-shopping'>
      <hr></hr>
      <Nav/>
      <div className='main-section1'>
        <div className='main-section2'>
          <main className='main-section3'>
            {product ? (
              <>
                <div className='main-img'>
                    <div className='right-section-img'>
                      <img style={{width:'378px',height:'400px'}} src={product.productThumbnail}/>
                    </div>
                </div>
                <section className='right-section'>
                  <div className='right-section2'>무료배송</div>
                  <div className='right-section3'>
                    <h1 className='right-section-title'>{product.productName}</h1>
                    <h2 className='right-section-title2'>{product.productDescription}</h2>
                  </div>
                  <span>판매가{product.formattedProductPrice}</span>
                  <div className='right-section-login'>
                    로그인 후, 적립 혜택이 제공됩니다.
                  </div>
                  <div>
                  <div className='right-section-img'>
                                <div className='moving-text-container'>
                                <p className='moving-text'>파이브 가이즈~~~~~~</p>
                                </div>
                            </div>
                  </div>
                  <ul className='right-section-ul'>
                    <li className='right-section-li'>
                      <dt className='right-section-dt'>배송</dt>
                    </li>
                    <li className='right-section-li'>
                                <dt className='right-section-dt'>판매자</dt>
                                    <dd className='right-section-dd'>
                                        <p className='right-section-dd-p'>{product.productName}</p>
                                    </dd>
                            </li>
                            <li className='right-section-li'>
                                <dt className='right-section-dt'>판매단위</dt>
                                    <dd className='right-section-dd'>
                                        <p className='right-section-dd-p'>1개</p>
                                    </dd>
                            </li>
                            <article className="right-section-article">
                              <button src="https://choar816.github.io/open-market/73ef1e8c52aa8aab95e50eec7036f567.svg" className="right-section-article-img"></button>
                              <div>1</div>
                              <button src="https://choar816.github.io/open-market/d658909c1751cb655de642c07d7e90da.svg" className="right-section-article-img2"></button>
                            </article>
                            
                            <div className='right-section-footer-div3'>
                                <div className='right-section-footer-div3-div'>
                                    <div className='right-section-footer-div3-div-div1'>
                                        <span className='right-section-footer-div3-span'>총 상품금액 :{product.formattedProductPrice}</span>
                                    </div>
                                    <div className='right-section-footer-div3-div2'>
                                        <span className='right-section-footer-div3-div2-span'>적립</span>
                                        <span className='right-section-footer-div3-div2-span2'>로그인 후, 적립 혜택 제공</span>
                                    </div>
                                </div>
                            </div>        
                            <hr></hr>  
                  </ul>
                  <div className='right-section-footer'>
                    <button className='right-section-footer-button1' type='button'>
                      <span className='right-section-footer-button-span'>
                        <div className='like' onClick={handleHeart}>
                          {like ? (
                            <AiFillHeart style={{ color: '#FEA92A', fontSize: '30px' }} />
                          ) : (
                            <AiOutlineHeart style={{ fontSize: '30px' }} />
                          )}
                        </div>
                      </span>
                    </button>
                    <div className='right-section-footer-button-div'>
                                    <button className='right-section-footer-button-div-button' type='button' style={{radius:'20px'}}>
                                    <Link to="/shop/cart"><span className='right-section-footer-button-span2'>장바구니 담기</span></Link>
                                    </button>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <p>상품을 찾을 수 없습니다.</p>
            )}
          </main>
          <nav className='nav-first'>
            <ul className='nav-first-ul'>
            <li className='nav-first-ul-li'>  
                <Link to='/more'><span className='nav-first-ul-li-a-span'>상세정보</span></Link>
              </li> 
              <li className='nav-first-ul-li'>
                <Link to="/review"><span className='nav-first-ul-li-a-span'>후기</span></Link>
                <span className='nav-first-ul-li-a-span-count'></span>
              </li>
              <li className='nav-first-ul-li'>
                <Link to={`/shop/detail/${productId}/inquiry`}><span className='nav-first-ul-li-a-span'>문의</span></Link>
              </li>
            </ul>
            <Routes>
                <Route path="/" element={<ShopMore/>}>
                </Route>
                <Route path="/review" element={<ShopReview/>}/>
                <Route path="/inquiry" element={<ShopInquiry/>}/>
            </Routes>   
          </nav>
            
        </div>
        <div className='Footer'>
        </div>
      </div>
    </div>
  );
}

export default ShopDetail;
