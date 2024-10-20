import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';



import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddButton from "../component/AddButton"
import ViewButton from "../component/ViewButton"
import DoctorHeader from '../component/DoctorHeader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Reviewlist() {
    const [reviews, setReviews] = useState([]); // Corrected hook usage
    const [editReview, setEditReview] = useState(null); // Corrected hook usage
    const [openDialog, setOpenDialog] = useState(false); // Corrected hook usage
    const [editedName, setEditedName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedRating, setEditedRating] = useState("");
    const [editedFReview, setEditedFReview] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm] = useState('');
    const [viewReview, setViewReview] = useState("");
    const [printDetails, setPrintDetails] = useState("");
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/review");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleEditClick = (review) => {
    setEditReview(review);
    setEditedName(review.Name);
    setEditedEmail(review.email);
    setEditedRating(review.rating);
    setEditedFReview(review.freview);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (review) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviewbills/${review._id}`);
      const updatedReviews = reviews.filter((r) => r._id !== review._id);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error deleting reviews:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedReview = {
        Name: editedName,
        email: editedEmail,
        rating: editedRating,
        freview: editedFReview,
      };    

      await axios.put(
        `http://localhost:5000/api/review/${editReview._id}`,
        updatedReview
      );

      setOpenDialog(false);

      const response = await axios.get("http://localhost:5000/api/review");
      setReviews(response.data);
    } catch (error) {
      console.error("Error updating reviews:", error);
    }
  };

  const [dataList] = useState([])


  const filteredReviews = reviews.filter((review) => {
    const { Name } = review;
    const query = searchQuery.toLowerCase();
    return (
      (typeof Name === "string" && Name.toLowerCase().includes(query)) 
    );
  });

  
  const filterDataList = dataList.filter(item=>
    item.review.toLowerCase().includes(searchTerm.toLowerCase())
  
  )


  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text('Filtered Feedback Details', 10, 10);
    let yPos = 20;
    let rowCount = 1;

    doc.setFont('calibiri', 'bold');
    doc.setFontSize(10);
    doc.text('Patientid', 10, yPos);
    doc.text('Doctor Name', 30, yPos);
    doc.text('Patient Name', 70, yPos);
    doc.text('Email', 110, yPos);
    doc.text('Rating', 160, yPos);
    doc.text('Feedback', 180, yPos);
    
    yPos += 10;

    doc.setFont('calibiri', '');
    doc.setFontSize(10);
   
    filteredReviews.forEach((review) => {
      doc.text(`${rowCount}`, 10, yPos);
      doc.text(review.reviewid, 30, yPos);
      doc.text(review.Name, 70, yPos);
      doc.text(review.email, 110, yPos);
      doc.text(review.rating, 165, yPos);
      doc.text(review.freview, 180, yPos);
      
      yPos += 10;
      rowCount++;
    });

    const totalReview = filteredReviews.length;
    doc.text(`Total Feedbacks Until Today: ${totalReview}`, 10, yPos + 10);

    doc.save('All_Feedback_details.pdf');
  };

  const handleViewClick = (review) => {
    setViewReview(review);
    setOpenDialog(true);
  };

  const handlePrintReport = () => {
    setPrintDetails(viewReview);
    // Code to print the details
    if (printDetails) {
      const doc = new jsPDF();
      doc.text('Review Details', 10, 10);
      doc.text(`Name: ${printDetails.Name}`, 10, 20);
      doc.text(`Email: ${printDetails.email}`, 10, 30);
      doc.text(`Rating: ${printDetails.rating}`, 10, 40);
      doc.text(`Review: ${printDetails.freview}`, 10, 50);
  
      doc.save('Review_Details.pdf');
    }
  };


  return (
    
    <Box flex="1">
      <DoctorHeader/>
        <div className='flex justify-between items-center m-5'>
        <Link to='/formreview'>
          <AddButton />
        </Link>
      </div>
      <div
        className="bg-white p-8 rounded-lg shadow-md"
        style={{ paddingTop: "80px" }}
      >
        <div className="flex justify-center items-center mb-4">
          <Typography variant="h4">Feedbacks & Enquiries from patients</Typography>
        </div>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Name: {viewReview && viewReview.Name}
          </Typography>
          <Typography variant="body1">
          Email: {viewReview && viewReview.email}
          </Typography>
          <Typography variant="body1">
          rating: {viewReview && viewReview.rating}
          </Typography>
          <Typography variant="body1">
          freview: {viewReview && viewReview.freview}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button onClick={handlePrintReport} variant="contained" color="primary">
            Print Report
          </Button>
        </DialogActions>
      </Dialog>
        <Box
          mb={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            label="Search by Patient Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "50%" }}
          />
            <Button variant="contained" color="primary" onClick={handlePDFDownload}>Generate Report</Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textTransform: "uppercase" }}>
                Doctor Name
                </TableCell>
                <TableCell style={{ textTransform: "uppercase" }}>
                Patient Name
                </TableCell>
                <TableCell style={{ textTransform: "uppercase" }}>
                Email
                </TableCell>
                <TableCell style={{ textTransform: "uppercase" }}>
                Rating
                </TableCell>
                <TableCell style={{ textTransform: "uppercase" }}>
                Feedback
                </TableCell>
                <TableCell style={{ textTransform: "uppercase" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReviews.map((review, index) => (
                <TableRow key={index}>
                  <TableCell>{review.reviewid}</TableCell>
                  <TableCell>{review.Name}</TableCell>
                  <TableCell>{review.email}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.freview}</TableCell>
                  
                  <TableCell>
                  <div >
                  <Link to={`/reviewview?review=${JSON.stringify(review)}`}>
                      <ViewButton onClick={() => handleViewClick(review)} />
                    </Link>


                      </div>
                    { <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(review)}
                    >
                      <EditIcon />
                    </IconButton> }
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(review)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </TableContainer>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <br />
          <Box mb={2}>
            <TextField
              label="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="rating"
              value={editedRating}
              onChange={(e) => setEditedRating(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Feedbacks"
              value={editedFReview}
              onChange={(e) => setEditedFReview(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>

        </DialogActions>
      </Dialog>
       {/* Footer */}
       <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>Healthcare</p>
            <p>Fossels Lane, Colombo, Sri Lanka</p>
            <p>+94 123 456 789</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link to="/" className="block mt-2 hover:underline">
              Home
            </Link>
            <Link to="/services" className="block mt-2 hover:underline">
              Services
            </Link>
            <Link href="/about" className="block mt-2 hover:underline">
              About
            </Link>
            <Link href="/contact" className="block mt-2 hover:underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          &copy; 2024 Sri Lanka Healthcare | Privacy Policy | Cookie Policy
        </div>
      </footer>
    </Box>
  );
}

export default Reviewlist;
