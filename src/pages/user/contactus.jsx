import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+91",
    city: "",
    comment: "",
    newsletter: false,
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber)
      tempErrors.phoneNumber = "Phone Number is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.comment) tempErrors.comment = "Comment is required";
    if (!formData.terms)
      tempErrors.terms = "You must accept the terms and conditions";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Luxury Fashion</title>
      </Helmet>

      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-serif mb-6">Contact Us</h1>
            <p className="text-gray-600">
              If you have any queries related to our products or your order,
              kindly call or WhatsApp us on{" "}
              <a
                href="tel:+919999913456"
                className="text-[#8b6d3f] hover:underline"
              >
                +91 99999 13456
              </a>{" "}
              (Monday to Saturday - 9:30 am to 6:00 pm IST except on national
              holidays), or email us at{" "}
              <a
                href="mailto:care@luxuryfashion.com"
                className="text-[#8b6d3f] hover:underline"
              >
                care@luxuryfashion.com
              </a>
            </p>
            <p className="text-gray-600 mt-4">
              For any PR or media-related queries, write to us at:{" "}
              <a
                href="mailto:press@luxuryfashion.com"
                className="text-[#8b6d3f] hover:underline"
              >
                press@luxuryfashion.com
              </a>
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name *"
                className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f]"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f]"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-24 border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f]"
                >
                  <option value="+91">+91(IN)</option>
                  <option value="+1">+1(US)</option>
                  <option value="+44">+44(UK)</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className="flex-1 border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f]"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City *"
                className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f]"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Comment *"
                rows="4"
                className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f]"
              ></textarea>
              {errors.comment && (
                <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-600">
                  Sign up for our newsletters and stay up to date on the latest
                  news, collections and events.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-600">
                  I understand and agree that registration on or use of the site
                  constitutes agreement to its{" "}
                  <a href="#" className="text-[#8b6d3f] hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#8b6d3f] hover:underline">
                    Terms and Conditions
                  </a>
                  .
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 hover:bg-gray-800 transition-colors"
              >
                Submit
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-sm text-gray-600 space-y-4"
          >
            <div>
              <h2 className="font-medium mb-2">
                House Of Luxury Fashion Private Limited
              </h2>
              <p>CIN: U17116MH1995PTC086449</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Registered Office Address:</h3>
              <p>20/C Pali Village, Opp. SAISA Club, Off 16th Rd, Bandra (W)</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Corporate Office Address:</h3>
              <p>
                Plot No B 8A/1/1, TTC Ind. Area, MIDC, Rabale, Navi Mumbai,
                India – 400701
              </p>
            </div>

            <p className="text-xs">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="text-[#8b6d3f] hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#8b6d3f] hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
