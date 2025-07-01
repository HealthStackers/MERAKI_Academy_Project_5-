import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

import "./footer.css";
function footer() {
  return (
    <footer className="footer">
      <div className="footerDetails">
        <div className="websiteLogo">
          {" "}
          <img src="/images/WebsiteLogo.JPG" className="websiteLogoInFooter" />
        </div>
        <div className="websiteInfo">
          <div className="termsOfUse">Terms Of Use</div>
          <div className="privacyPolicy">Privacy Policy</div>
          <div className="beSafe">Be Safe</div>
          <div className="cookiePolicy">Cookie Policy</div>
        </div>
        <div className="contactDetails">
          <div className="emailInFooter">
            <MdEmail className="emailIcon" />
            info@medivohealth.com
          </div>
          <div className="phoneNumber">
            <MdPhone className="phoneNumbericon" />
            +962 (06) 510 0400
          </div>
          <div className="location">
            <MdLocationOn className="locationicon" />
            123 Medivo Street, Jordan
          </div>
          <div className="contactsIcons">
            <FaFacebookF className="faceBookIcon" />
            <FaInstagram className="instgramIcon" />
            <FaLinkedinIn className="linkedInIcon" />
          </div>
        </div>
      </div>
      <div className="copyRight">
        {" "}
        <svg
          className="copyRightIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503" />
        </svg>
        2025 MEDIVO | All rights Reserved
      </div>
    </footer>
  );
}

export default footer;
