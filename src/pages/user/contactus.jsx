import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulating an API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSubmitMessage(
          "Thank you for your message. We'll get back to you soon!"
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        setSubmitMessage("Oops! Something went wrong. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Urban Edge Clothing</title>
      </Helmet>

      {/* Banner Section */}
      <div className="bg-green-600 text-white py-4 text-center">
        <p className="text-lg font-medium">Free Shipping on Orders Over $50!</p>
      </div>

      <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
            <p className="text-xl text-center mb-12">
              We'd love to hear from you. Get in touch with us!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <FiSend className="ml-2" />
                  </button>
                </div>
              </form>
              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-green-500"
                >
                  {submitMessage}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Info Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiMail className="text-red-500 mr-4" />
                    <span>support@urbanedge.com</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="text-red-500 mr-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="text-red-500 mr-4" />
                    <span>123 Fashion Street, Style City, SC 12345</span>
                  </div>
                </div>
              </div>

              {/* Google Maps Section */}
              <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.527559461264!2d-122.0842499!3d37.4220652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7f16e9e6e8b%3A0xdeadbeef!2sGoogleplex!5e0!3m2!1sen!2sus!4v1619528747825!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              {/* Social Media Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                  {/* Social Media Links */}
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="text-black hover:text-blue-600 transition-colors"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="text-black hover:text-pink-500 transition-colors"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="text-black hover:text-blue-400 transition-colors"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="text-black hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="text-black hover:text-gray-800 transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className="text-black hover:text-green-500 transition-colors"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
