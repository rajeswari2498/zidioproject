import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import "./home.css";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="home-container">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <div className="home-content">
        <div className="text-container">
          <h1>Transform Task Management with Zidio</h1>
          <p>
            Harness Zidio Task Management to enhance efficiency and
            collaboration. Our intuitive platform allows for effortless task
            organization, real-time progress tracking, and seamless teamwork,
            enabling your team to focus on achieving goals.
          </p>
          <button className="btn-secondary">Get Started</button>
        </div>
        <div className="image-container">
          <img src="/images/image.png" alt="Home" className="home-image" />
        </div>
      </div>

      <div className="features-section">
        <div className="features-text">
          <h1>Empower Your Team with Zidio Task Management</h1>
          <p>
            Our platform enhances efficiency and collaboration, allowing you to
            take control of your projects effortlessly.
          </p>
          <div className="features-list">
            {["Dynamic Kanban Boards", "Real-Time Updates", "Seamless Integrations"].map((title, index) => (
              <div key={index} className="feature">
                <h2>{title}</h2>
                <p>
                  {index === 0 && "Visualize your workflow and prioritize tasks with clarity, enhancing accountability among team members."}
                  {index === 1 && "Stay informed as projects evolve, ensuring your team remains synchronized and adaptable."}
                  {index === 2 && "Integrate with existing tools to streamline processes and maintain productivity without interruption."}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="features-image">
          <img src="/images/page3.png" alt="Features" className="feature-image" />
        </div>
      </div>

      <h1 className="cards-heading">Experience the transformative capabilities of Zidio Task Management</h1>
      
      <div className="cards-container">
        {["Kanban Boards", "Progress Tracking", "Seamless Integrations"].map((title, index) => (
          <div key={index} className="card">
            <img src={`/images/card${index + 1}.png`} alt={title} className="card-image" />
            <h3>{title}</h3>
            <p>
              {index === 0 && "Robust Task Organization with Kanban Boards"}
              {index === 1 && "Real-Time Progress Tracking"}
              {index === 2 && "Seamless Integrations with your favorite tools"}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {["How can Zidio support my team's productivity?", "What features make Zidio unique?", "How does Zidio drive teamwork?", "What support options do you offer?", "How can I get started with Zidio?"].map((question, index) => (
            <div key={index} className="faq-item" onClick={() => toggleFaq(index)}>
              <h3 className="faq-question">{question}</h3>
              <p className={`faq-answer ${openFaqIndex === index ? "open" : ""}`}>
                {index === 0 && "Zidio helps streamline task organization, track progress, and enhance collaboration among teams."}
                {index === 1 && "Zidio offers dynamic Kanban boards, real-time updates, and seamless integrations with popular tools."}
                {index === 2 && "By centralizing task management, providing transparency, and fostering collaboration among team members."}
                {index === 3 && "We offer comprehensive online support and training materials for all users."}
                {index === 4 && "Simply sign up, choose your plan, and start using Zidio for effortless task management."}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            <h1>Zidio Tool Management</h1>
            <p>Enhance productivity with our intuitive task management platform.</p>
          </div>
          <div className="footer-contact">
            <h2>Contact Information</h2>
            <p>123 Zidio Ave, Management City, NC 28201</p>
            <p>+1 (888) 123-4567</p>
            <p>info@zidiotoolmanagement.com</p>
          </div>
          <div className="footer-links">
            <h2>Quick Links</h2>
            <ul>
              <li>Our Services</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>Help Center</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
        <div className="footer-rights">
          <p>© 2025 Zidio Tool Management. All Rights Reserved</p>
        </div>
      </footer>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
};

export default Home;
