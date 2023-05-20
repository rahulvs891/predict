import { useState , useEffect} from 'react'
import './App.css'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubmitModal from './SubmitModal';
import {db} from './firebase-config'
import { collection, query, orderBy, limit, getDocs, setDoc , doc} from "firebase/firestore";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [latestCouponCode, setLatestCouponCode] = useState(0);
  const [select, setSelect] = useState(1);
  const radioHandler = (choice) =>{
    setSelect(choice);
  }
   useEffect(() => {
  const fetchLatestCouponCode = async () => {
    try {
      const couponsCollectionRef = collection(db, "users");
      const q = query(couponsCollectionRef, orderBy("coupon", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty && querySnapshot.docs[0]) {
        const latestCoupon = querySnapshot.docs[0].id;
        setLatestCouponCode(parseInt(latestCoupon));
      }
    } catch (error) {
      console.error('Error fetching latest coupon code:', error);
    }
  };

  fetchLatestCouponCode();
}, []);


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const nextCouponCode = latestCouponCode + 1;

    const couponsCollectionRef = collection(db, "users");
    const docRef = doc(couponsCollectionRef, nextCouponCode.toString());

    await setDoc(docRef, { coupon: nextCouponCode });

    setLatestCouponCode(nextCouponCode);
    setModalShow(true);
  } catch (error) {
    console.error('Error generating and uploading new coupon code:', error);
  }
};

  return (
    <>
    <div className='predict-total-container p-0 px-sm-5 row d-flex justify-content-between align-items-center p-0 m-0'>
      <div className='col-12 col-lg-4 px-0'>
        <div className='d-flex justify-content-sm-between justify-content-center '>
          <img src='./assets/title.png' className='predict-title '/>
          </div>
          <div className='predict-form-container p-3'>
            <div >
              <div className='d-flex justify-content-center'>
                <img src='./assets/eduzet-logo.png' className='predict-logo my-3'/>
              </div>
              <Form>
                <Form.Label>Name<span>*</span></Form.Label>
                <Form.Control placeholder='Enter your Name' required />
                <Form.Label>Phone Number<span>*</span></Form.Label>
                <Form.Control placeholder='Enter your Phone Number' required/>
                <Form.Label className='mt-2'>What is your highest level of education ?<span>*</span></Form.Label>
                  <div className='d-flex flex-row justify-content-around mt-2 '>
                    <div className='select-item' style={{border: select ===1 ? '#0059ff 1px solid':'1px solid #d9d9d9' }}>
                    <Form.Check type="radio" label="Higher secondary" name="radioGroup" value="option1" defaultChecked onChange={()=>{
                      radioHandler(1)
                    }} checked={select===1}/>
                   </div>
                    <div className='select-item' style={{border: select ===2 ? '#0059ff 1px solid':'1px solid #d9d9d9' }}>
                    <Form.Check type="radio" label="Degree" name="radioGroup" value="option1" onChange={()=>{
                      radioHandler(2)
                    }}  checked={select===2}/>
                    </div>
                    
                  </div>
                  {
                    select ===1 && 
                    <div className=''>
                      <Form.Label>Stream <span>*</span></Form.Label>
                      <Form.Control placeholder='Enter your stream of study here' required/>
                    </div>
                  }
                  {
                    select ===2 && 
                    <div className=''>
                      <Form.Label>Course <span>*</span></Form.Label>
                      <Form.Control placeholder='Enter your course here' required/>
                    </div>
                  }
                  <div className='d-flex flex-column align-items-center'>
                  <Form.Label>Predict Your Percentage<span>*</span></Form.Label>
                  <div className='d-flex align-items-center border border-1 rounded'><Form.Control required style={{border:"0"}} className='percentage-input '/><span style={{marginInline:"0.5rem",fontWeight:"600"}}>%</span></div>
                  <Button style={{width:"6rem",backgroundColor:"#676AB1"}} className='mx-3 mt-4 border-0' onClick={handleSubmit}>Submit</Button>
                  <SubmitModal show={modalShow} onHide={() => setModalShow(false)} couponcode={latestCouponCode}/>
                  </div>
              </Form>
            </div>
          </div>
          </div>
          <div className='right-side col-12 col-lg-4 px-0'>
            <img src='./assets/web-01.jpg' className='predict-poster'/>
          </div>
        </div>
    </>
  )
}

export default App
