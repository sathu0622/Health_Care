// server.js or index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')('sk_test_51Q5kUrKs4ldJ96PWugUoFocTH2VUxhzRBKsdeyB1i34xf8YiWddYbUjNM3a7lgmaBE97CxkPE9RUQ3VJL0ycCj9e001GGNWVLG');
const connectToDatabase = require('./db'); // Import the Singleton DB connection
const appointmentRoutes = require('./routes/appointmentRoutes');
const HospitalRoutes = require('./routes/HospitalRouter');
const doctorsRouter = require('./routes/DoctorDetails');
const UserRouter = require('./routes/UserRouter');
const articleRoutes = require('./routes/Articles');
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

// Use the Singleton pattern to connect to MongoDB
connectToDatabase().catch(err => {
  console.error('Failed to connect to the database', err);
  process.exit(1); // Exit if connection fails
});

app.use(cookieParser());
app.use('/appointments', appointmentRoutes);
app.use('/hospitals', HospitalRoutes);
app.use('/api/doctors', doctorsRouter);
app.use('/api/user', UserRouter);
app.use('/api', articleRoutes);
app.use("/api", reviewRoutes);

// Stripe payment route
app.post('/payment', (req, res) => {
  const { product, token, useInsurance, insuranceDetails } = req.body;
  const transactionKey = uuidv4();

  // Determine how much to charge based on insurance usage
  const amountToCharge = useInsurance ? product.advance : product.price;

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: amountToCharge * 100, // Stripe expects the amount in cents
        currency: 'LKR',
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
      });
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Payment failed');
    });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
