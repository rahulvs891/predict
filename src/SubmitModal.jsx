import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './SubmitModal.css';
import { Icon } from '@iconify/react';
import 'bootstrap/dist/css/bootstrap.min.css';
function SubmitModal(props) {
  
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='d-flex justify-content-center'>
        <div className='d-flex justify-content-center'>
        
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex flex-column justify-content-center align-items-center gap-4 '>
          <h3 >You have successfully submitted</h3>
          <div className='coupon'>
            <div className='coupon-logo'>
              <img src='/assets/couponlogo.png'/>
            </div>
            <div className='coupon-code'>
              <h2>{props.couponcode}</h2>
            </div>
          </div>
          <p><Icon icon="fluent:important-12-filled" style={{color:"#CC5990"}}/>screenshot this coupon for later </p>
          <h3>Share this with your friends<Icon icon="material-symbols:share" /></h3>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default SubmitModal