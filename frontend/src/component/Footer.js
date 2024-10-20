import React from "react";
import FB from '../assest/facebook.jpg';
import IG from '../assest/instagram.jpg';
import WA from '../assest/whatsapp.jpg';
import GG from '../assest/google.jpg';

function Footer() {
  return (
    <footer className=" flex-col md:flex-row justify-between items-center px-5 py-20 bg-primary z-20 h-auto">
      <div className="flex flex-col items-center space-y-3 mb-5 md:mb-0 info">
        <div className="flex h-8 space-x-8 p-8">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={FB}
              alt="Facebook"
              className="w-8 h-8 opacity-40 hover:opacity-100 transition duration-300"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={IG}
              alt="Instagram"
              className="w-8 h-8 opacity-40 hover:opacity-100 transition duration-300"
            />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={WA}
              alt="WhatsApp"
              className="w-8 h-8 opacity-40 hover:opacity-100 transition duration-300"
            />
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={GG}
              alt="Google"
              className="w-8 h-8 opacity-40 hover:opacity-100 transition duration-300"
            />
          </a>
        </div>

        <hr />
        <hr />
        <hr />
        <p className="text-center mt-5">© 2024, Powered by SPASH</p>
      </div>
    </footer>
  );
}

export default Footer;

{
  /* <li>
<details>
    <summary className='flex items-center cursor-pointer'>Services</summary>
    <p>Bridal Dresses</p>
    <p>Bridal Jewellery</p>
    <p>Bridal Full Package</p>
</details>
</li> */
}
