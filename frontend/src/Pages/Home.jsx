import { useState } from 'react';
import '../Styles/Page.css';
import Footer from './Footer';
import Login from './Login';
import ThemeToggle from '../Components/ThemeToggle';

export default function Home(){
  const [formType, setFormType] = useState(null); // "signup" or "login"

  const handleFormToggle = (type) => setFormType(type);

  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    setFormType(null); // close modal after submit
  };

    return(
    <>
    {/* <ThemeToggle/> */}
    {/* Hero Section */}
<div className='hero-section'>
  <div className='hero-content'>
    <h1 className='hero-title'>Welcome to the Student <span className='highlight'>Management Portal</span></h1>
    <h3 className='hero-subtitle'>Easily manage students, track progress, and stay organized, <span className='highlight'>all in one place.</span></h3>
    <div className='hero-buttons'>
      <button className='btn1 btn-primary1' onClick={() => handleFormToggle("signup")}>Get Started</button>
      <button className='btn1 btn-secondary1' onClick={() => handleFormToggle("login")}>Login</button>
    </div>
  </div>

  <div className='scroll-indicator'>
    <div className='scroll-indicator-outer'>
      <div className='scroll-indicator-inner'></div>
    </div>
  </div>
</div>

{/* Modal goes here, outside of hero-section */}
{formType && (
  <div className="form-modal">
    <div className="form-modal-overlay" onClick={() => setFormType(null)}></div>
    <div className="form-modal-content">
      <Login type={formType} onSubmit={handleFormSubmit} />
    </div>
  </div>
)}

    {/* Features Section */}
    <div className='features-section'>
        <div className='container1'>
            <h2 className='section-title'>What You Can Do</h2>
            <div className='features-grid'>
                <div className='feature-card'>
                    <div className='feature-icon'>📊</div>
                    <h3 className='feature-title'>Manage Student Records</h3>
                    <p className='feature-description'>Keep detailed records of all student information in one secure place</p>
                </div>
                <div className='feature-card'>
                    <div className='feature-icon'>🎓</div>
                    <h3 className='feature-title'>Track Progress</h3>
                    <p className='feature-description'>Monitor active students and celebrate graduations</p>
                </div>
                <div className='feature-card'>
                    <div className='feature-icon'>🔍</div>
                    <h3 className='feature-title'>Search & Filter</h3>
                    <p className='feature-description'>Find any student instantly with powerful search tools</p>
                </div>
                <div className='feature-card'>
                    <div className='feature-icon'>🛠</div>
                    <h3 className='feature-title'>Admin Tools</h3>
                    <p className='feature-description'>Simple yet powerful administrative features</p>
                </div>
            </div>
        </div>
    </div>

    {/* Statistics Section */}
    <div className='stats-section'>
        <div className='container-small'>
            <h2 className='section-title'>Trusted by Educators</h2>
            <div className='stats-grid'>
                <div className='stat-item'>
                    <div className='stat-number stat-primary'>10,000+</div>
                    <div className='stat-label'>Students Managed</div>
                </div>
                <div className='stat-item'>
                    <div className='stat-number stat-accent'>500+</div>
                    <div className='stat-label'>Institutions</div>
                </div>
                <div className='stat-item'>
                    <div className='stat-number stat-secondary'>99.9%</div>
                    <div className='stat-label'>Uptime</div>
                </div>
            </div>
        </div>
    </div>

    {/* How It Works Section */}
    <div className='how-it-works-section'>
        <div className='container2'>
            <h2 className='section-title'>How It Works</h2>
            <div className='steps-grid'>
                <div className='step-item'>
                    <div className='step-number step-primary'>
                        <span>1</span>
                    </div>
                    <h3 className='step-title'>Sign Up</h3>
                    <p className='step-description'>Create your account and set up your institution profile</p>
                </div>
                <div className='step-item'>
                    <div className='step-number step-accent'>
                        <span>2</span>
                    </div>
                    <h3 className='step-title'>Add Students</h3>
                    <p className='step-description'>Import or manually add student records to your system</p>
                </div>
                <div className='step-item'>
                    <div className='step-number step-secondary'>
                        <span>3</span>
                    </div>
                    <h3 className='step-title'>Manage</h3>
                    <p className='step-description'>Track progress, update records, and generate reports</p>
                </div>
            </div>
        </div>
    </div>

    {/* Testimonials Section */}
    <div className='testimonials-section'>
        <div className='container1  '>
            <h2 className='section-title'>What Educators Say</h2>
            <div className='testimonials-grid'>
                <div className='testimonial-card'>
                    <div className='stars'>
                        <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className='testimonial-text'>"This portal has revolutionized how we manage our student database. The interface is intuitive and the search functionality is outstanding."</p>
                    <div className='testimonial-author'>- Sarah Johnson, Principal</div>
                </div>
                <div className='testimonial-card'>
                    <div className='stars'>
                        <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className='testimonial-text'>"We've saved hours each week thanks to the automated tracking features. Highly recommend for any educational institution."</p>
                    <div className='testimonial-author'>- Michael Chen, Administrator</div>
                </div>
            </div>
        </div>
    </div>

    {/* CTA Section */}
<div className='cta-section'>
    <div className='container-small'>
        <h2 className='cta-title'>Ready to Get Started?</h2>
        <p className='cta-subtitle'>Join thousands of educators who trust our platform to manage their students effectively.</p>
        <div className='cta-buttons'>
            {/* Open the signup form */}
            <button 
                className='btn1 btn-white1' 
                onClick={() => handleFormToggle("signup")}
            >
                Start Free Trial
            </button>

            {/* Open the login form */}
            <button 
                className='btn1 btn-outline1' 
                onClick={() => handleFormToggle("login")}
            >
                Login
            </button>
        </div>
    </div>
</div>

{/* Form modal (outside of CTA section, usually at the end of JSX) */}
{formType && (
  <div className="form-modal">
    <div className="form-modal-overlay" onClick={() => setFormType(null)}></div>
    <div className="form-modal-content">
      <Login type={formType} onSubmit={handleFormSubmit} />
    </div>
  </div>
)}
    <Footer/>
    </>
    )
}