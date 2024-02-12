import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CgWebsite } from 'react-icons/cg';
import { TfiFullscreen } from 'react-icons/tfi';

function ReservationCard(props) {
  // 첫 번째 이미지만 사용하도록 수정
  const mainImage = props.camp_images && props.camp_images.length > 0 ? props.camp_images[0] : null;

  const handleReservationClick = () => {
    props.introduceLink(props.camp_id);
  };

  return (
    <Card className="project-card-view">
      <div className="carousel-inner">
        {mainImage && (
          <div className="carousel-item active">
            <img
              src={mainImage}
              className="d-block w-100"
              alt="camp-main-image"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}>
          {props.description}
        </Card.Text>
        
        {props.address && (
          <p>
            <strong>주소:</strong> {props.address}
          </p>
        )}
        {props.price && (
          <p>
            <strong>가격:</strong> {props.price}원
          </p>
        )}
        
        

        {!props.isBlog && props.reservationsLink && (
          <Button
            variant="warning"
            onClick={handleReservationClick}
            style={{ marginLeft: '10px' }}
          >
            <CgWebsite /> &nbsp;
            {'둘러보기'}
          </Button>
        )}
        
      </Card.Body>
      
    </Card>
  );
}

export default ReservationCard;
