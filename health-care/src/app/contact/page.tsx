import React from "react";
import Footer from "../components/footer"

import "./contact.css";
const Contact = () => {
  return (
    <div className="container contact-section">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="contact-info">
            <h5>Our Location</h5>
            <p>123 Medivo Street, Jordan</p>
          </div>
          <div className="contact-info">
            <h5>Phone</h5>
            <p>+962 (06) 510 0400</p>
          </div>
          <div className="contact-info">
            <h5>Email</h5>
            <p>info@medivohealth.com</p>
          </div>
          <div className="contact-info">
            <h5>Working Hours</h5>
            <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
            <p>Sat: 10:00 AM – 4:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>
        <div className="col-md-6">
          <h5>Send Us a Message</h5>
          <form className="contact-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Your Message
              </label>
              <textarea
                class="form-control"
                id="message"
                rows="4"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="map-container mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3435.123456789012!2d35.123456789012345!3d32.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b2a3b4c5d6e7f%3A0x8a9b8c9d0e1f2g3h!2sMedivo%20Health%20Care!5e0!3m2!1sen!2sus!4v1621234567890"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      
    </div>
  );
};

export default Contact;
