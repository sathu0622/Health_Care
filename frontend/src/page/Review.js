import React from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../component/UserHeader'
import Footer from '../component/Footer'

export const Review = () => {
  return (
    <div >
     <UserHeader/>
            
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mt-8 mb-12">Give Us Your Valuable Feedback! </h1>
      <div className="flex justify-around bg-blue-200 p-10 ">
        <div className="w-60 h-100 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
        <img
        src="https://img.freepik.com/premium-vector/community-cloud-logo-design-template_412311-3891.jpg?w=740"
        
        className="w-full h-40 rounded-2xl mb-3"
      /><div>
            <p className="font-bold text-lg">We for you</p>
            <p className="text-sm">You can Make Appointments and you can be able to access variable things from our website.</p>
          </div>
          <Link to="/listreview">
          <button className="bg-sky-700 font-bold text-sm p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">Make Appointment</button>
          </Link>
        </div>
        <div className="w-60 h-100 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
        <img
        src="https://img.freepik.com/premium-vector/partnership-icon-vector-illustration-white-background_917213-249689.jpg?w=740"
          alt="Card Image"
        className="w-full h-40 rounded-2xl mb-3"
      /> <div>
            <p className="font-bold text-lg">Feedbacks from patients</p>
            <p className="text-sm">Your reviews will be shown here, you can give your experiences confidentally.</p>
          </div>
          <Link to="/Userreviewlist">
          <button className="bg-sky-700 font-bold text-sm p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">View Reviews</button>
          </Link>
        </div>
        <div className=" w-60 h-100 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
        <img
        src="https://img.freepik.com/premium-vector/colorful-illustration-star-thumbs-up-speech-bubbles-representing-positive-feedback_657438-48091.jpg?w=740"
        alt="Card Image"
        className="w-full h-40 rounded-2xl mb-3"
      /><div>
            
            <p className="font-bold text-lg">Review</p>
           
            <p className="text-sm">Give your valuable reviews to us to make our Hospital service more usable for everyone</p>
          </div>
          <Link to="/formreview">
          <button className="bg-sky-700 font-bold text-sm p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">Give review</button>
          </Link>
        </div>
        
      </div>
            <div className="text-5xl text-center text-gray-900 mt-8 mb-12">
            <section className="bg-background ">
              <h2 className="text-5xl font-bold text-primary justify-center ali">About us</h2>
              <p className="mt-4 text-lg text-muted-foreground">
              Welcome to our Healthcare System Name, your trusted partner in delivering high-quality, accessible healthcare services to everyone, anytime, anywhere.

We believe that everyone deserves access to excellent healthcare, regardless of location or circumstance. Our online healthcare platform is designed to bridge the gap between patients and healthcare providers, making it easier than ever to receive the care you need, when you need it. </p>
            </section>
            </div>

            <div className="p-6 bg-background text-foreground bg-blue-200">
              <h2 className="text-5xl font-bold text-center text-gray-900 mt-8 mb-12">Our values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                  <img undefinedhidden="true" alt="collaborative-icon" src="https://openui.fly.dev/openui/24x24.svg?text=❄️" />
                  <h3 className="text-lg font-semibold">Collaborative</h3>
                  <p className="text-muted-foreground">We get our best results working collaboratively – this is how we excel.</p>
                </div>
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                  <img undefinedhidden="true" alt="transparent-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔍" />
                  <h3 className="text-lg font-semibold">Transparent</h3>
                  <p className="text-muted-foreground">We share our knowledge and our skills because, when we work in an open and frank way, we demonstrate that we trust and respect each other.</p>
                </div>
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                  <img undefinedhidden="true" alt="respectful-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🤝" />
                  <h3 className="text-lg font-semibold">Respectful and trusting</h3>
                  <p className="text-muted-foreground">
                    We care about each other and we treat everyone in a way that we would want to be treated. We know with conviction that we can rely on each other because it is only together that we can
                    achieve greatness.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                  <img undefinedhidden="true" alt="innovative-icon" src="https://openui.fly.dev/openui/24x24.svg?text=💡" />
                  <h3 className="text-lg font-semibold">Innovative</h3>
                  <p className="text-muted-foreground">We seek to understand new and different ways to improve delivery and performance for digital health.</p>
                </div>
                <div className="p-4 border border-border rounded-lg bg-card hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                  <img undefinedhidden="true" alt="accountable-icon" src="https://openui.fly.dev/openui/24x24.svg?text=✅" />
                  <h3 className="text-lg font-semibold">Accountable</h3>
                  <p className="text-muted-foreground">
                    We are all accountable for living our values and taking responsibility for our actions. When we think this way, we will always be focusing on doing things that are right and good.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8 p-5 ">
                    <h2 className="text-5xl font-bold">Famous Doctors We have Worked with</h2>
                </div>
                <div className="flex flex-wrap justify-center space-x-4">
                    <div className="max-w-xs p-4 bg-card rounded-lg shadow-md">
                        <img undefinedhidden="true" alt="Dr. Sarah Thompson, MD" src="https://openui.fly.dev/openui/300x200.svg?text=Claire+Dellar" className="rounded-t-lg" />
                        <h3 className="text-lg font-semibold mt-2">Dr. Sarah Thompson, MD</h3>
                        <p className="text-muted-foreground">Dr. Sarah Thompson is a dedicated family physician focused on comprehensive care for patients of all ages. With over 12 years of experience, she specializes in preventive care, chronic disease management, and patient education to promote overall wellness.</p>
                    </div>
                    <div className="max-w-xs p-4 bg-card rounded-lg shadow-md">
                        <img undefinedhidden="true" alt="Dr. Michael Patel, MD" src="https://openui.fly.dev/openui/300x200.svg?text=Chris+Day" className="rounded-t-lg" />
                        <h3 className="text-lg font-semibold mt-2">Dr. Michael Patel, MD</h3>
                        <p className="text-muted-foreground">Dr. Michael Patel is an experienced cardiologist specializing in heart disease prevention and treatment. With 15+ years of expertise, he provides personalized cardiac care, helping patients manage heart conditions and improve their cardiovascular health.</p>
                        
                    </div>
                    <div className="max-w-xs p-4 bg-card rounded-lg shadow-md">
                        <img undefinedhidden="true" alt="Dr. Emily Martinez, DO" src="https://openui.fly.dev/openui/300x200.svg?text=Kranthi+Mavuri" className="rounded-t-lg" />
                        <h3 className="text-lg font-semibold mt-2">Dr. Emily Martinez, DO</h3>
                        <p className="text-muted-foreground">Dr. Emily Martinez is a compassionate pediatrician with over 10 years of experience. She specializes in preventive care, vaccinations, and managing childhood illnesses, ensuring your child’s healthy development from infancy through adolescence.</p>
                        
                    </div>
                </div>
                <div className="text-center mt-6 mb-8">
                 <Link to="/">
                   <button className="bg-sky-700 font-bold text-sm p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors ">Meet Doctors</button>
                 </Link>
                </div>

      
  
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
        </div>
  )
};

export default Review;