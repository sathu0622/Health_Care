const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Customer = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const KEY = "jwttokenkey"; 

router.post('/register', async (req, res) => {
  const { username, email, number, address, password, bloodGroup, DOB } = req.body;
  const cus = await Customer.findOne({ email })
  if (cus) {
    return res.json({ message: "user already existed" })
  }

  const hashpassword = await bcrypt.hash(password, 10)
  const newCustomer = new Customer({
    username,
    email,
    number,
    address,
    password: hashpassword,
    bloodGroup,
    DOB
  });

  await newCustomer.save()
  return res.json({ status: true, message: "record registed" })
})


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Customer.findOne({ email })
  if (!user) {
    return res.json({ message: "User is not registered" })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" })
  }

  const token = jwt.sign({ username: user.username }, KEY, { expiresIn: '1h' })
  res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
  return res.json({ status: true, message: "login successfully" })
})




router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Customer.findOne({ email })
    if (!user) {
      return res.json({ message: "user not registered" })
    }
    const token = jwt.sign({ username: user.username }, KEY, { expiresIn: '5m' })

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sathushan622@gmail.com',
        pass: 'jmal gzwg lksm mgpe'
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E")

    var mailOptions = {
      from: 'sathushan622@gmail.com',
      to: email,
      subject: 'Rest Password',
      text: `http://localhost:3000/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" })
      } else {
        return res.json({ status: true, message: "email sent" })
      }
    });

  } catch (err) {
    console.log(err)
  }
})



router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body

  try {
    const decoded = jwt.verify(token, KEY);
    const id = decoded.id;

    const hashpassword = await bcrypt.hash(password, 10)
    await Customer.findByIdAndUpdate(id , { password: hashpassword })
    return res.json({ status: true, message: "updated password" })
  } catch (err) {
    return res.json("invalid token")
  }
})

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" })
    }

    const decoded = await jwt.verify(token, KEY)
    next()
  
  } catch (err) {
    return res.json(err)
  }
}

router.get("/verify",verifyUser, (req, res) => {
    return res.json({status:true, message: "authorized"})
})

router.get('/logout', (req, res) =>{
  res.clearCookie('token')
  return res.json({status:true})
})



//customer profile
router.get('/getCustomerDetails', async (req, res) => {
  try {
    const { userEmail } = req.query;

    const customer = await Customer.findOne({ email: userEmail });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ response: customer });
  } catch (error) {
    console.error("Error fetching customer details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/updateCustomerDetails', async (req, res) => {
  try {
      const { username, email, number, address } = req.body;

      const updatedCustomer = await Customer.findOneAndUpdate(
          { email: email },
          { username: username, email: email, number: number, address: address },
          { new: true }
      );

      if (!updatedCustomer) {
          return res.status(404).json({ message: "Customer not found" });
      }

      return res.status(200).json({ message: "Customer details updated successfully", updatedCustomer });
  } catch (error) {
      console.error("Error updating customer details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete('/deleteCustomerDetails', async (req, res) => {
  try {
      const { userEmail } = req.body;

      await Customer.deleteOne({ email: userEmail });

      return res.status(200).json({ message: "Customer details deleted successfully" });
  } catch (error) {
      console.error("Error deleting customer details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/readCustomerDetails', async (req, res) => {
  try {
    const cus = await Customer.find();

    if (!cus) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ response: cus });
    
  } catch (error) {
    console.error("Error fetching Customer details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;




