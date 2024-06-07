import React from 'react'
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <>
    <footer className="footer">
                    <div className="footer-content">
                        <div>
                            <h5>Contact Us</h5>
                            <ul>
                                <li>Email: info@rcmathuracentral.org</li>
                                <li>Phone: +91 9997813970</li>
                                <li>Address: 123 Rotary Club Road, Mathura, India</li>
                            </ul>
                        </div>
                        <div>
                            <h5>Quick Links</h5>
                            <ul>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/events">Events</a></li>
                                <li><a href="/membership">Membership</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5>Follow Us</h5>
                            <div className="social-media">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </footer>
      
    </>
  )
}

export default Footer
