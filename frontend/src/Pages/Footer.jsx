import '../Styles/Footer.css';

export default function Footer(){
    return(
        <>
        <footer className='footer'>
        <div className='container1'>
            <div className='footer-grid'>
                <div className='footer-section'>
                    <h3 className='footer-title'>Student Portal</h3>
                    <p className='footer-description'>Empowering education through better student management.</p>
                </div>
                <div className='footer-section'>
                    <h4 className='footer-subtitle'>Product</h4>
                    <ul className='footer-links'>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Security</a></li>
                        <li><a href="#">Integrations</a></li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h4 className='footer-subtitle'>Company</h4>
                    <ul className='footer-links'>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h4 className='footer-subtitle'>Support</h4>
                    <ul className='footer-links'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Status</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
            </div>
            <div className='footer-bottom'>
                <p>&copy; 2024 Student Management Portal. All rights reserved.</p>
            </div>
        </div>
    </footer>
        </>
    )
}