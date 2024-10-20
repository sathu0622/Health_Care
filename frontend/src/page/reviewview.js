import React  from 'react';
import { Link} from 'react-router-dom';
import Button from '../component/Button'; // Assuming Button component is imported correctly
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {useLocation} from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'


const Reviewview = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const review = JSON.parse(searchParams.get('review'));


  const handlePrint = () => {
    if (!review) return; 
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the content to be added to the PDF
    const content = `
    Feedback Receipt
    Doctor Name: ${review?.reviewid}
    Patient Name: ${review?.Name}
    Email: ${review?.email}
    Rating: ${review?.rating}
    Feedback: ${review?.freview}
    `;

    // Add the content to the PDF
    doc.text(content, 10, 10);

    // Save the PDF
    doc.save('Personal_Feedback_Details.pdf');
  };

  return (
    <div className='relative'>
      <div id="pdfContent" className='flex flex-col bg-bgc rounded-xl w-[600px] p-4 mx-auto font-BreeSerif text-ternary'>
        <h1 className='text-3xl my-4 text-center font-semibold'> Patient Personal Feedback</h1>
        <div className='my-4'>
          <span className='text-xl mr-4'>Doctor Name :</span>
          <span>{review?.reviewid}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Patient Name :</span>
          <span>{review?.Name}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Email :</span>
          <span>{review?.email}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Rating :</span>
          <span>{review?.rating}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Feedback:</span>
          <span>{review?.freview}</span>
        </div>
        
        <div className='flex justify-left gap-x-20'>
          <Link to="/listreview">
            <Button onClick={handlePrint}>Print</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reviewview;


