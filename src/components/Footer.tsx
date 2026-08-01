export function Footer() {
    return (
        <footer id="contact" className="footer mt-xl">
            <div className="container footer-grid">
                <div className="footer-col brand-col">
                    <img src="/assets/images/logo-transparent.png" alt="Mulberry Fresh" className="footer-logo" />
                    <p>Premium Halal fresh meat delivered straight to your door with utmost hygiene and care.</p>
                    <div className="social-links">
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                        <a href="#"><i className='bx bxl-instagram'></i></a>
                        <a href="#"><i className='bx bxl-whatsapp'></i></a>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <a href="#">Home</a>
                    <a href="#about">About Us</a>
                    <a href="#">Recipes</a>
                    <a href="#">Track Order</a>
                    <a href="#">My Account</a>
                </div>
                <div className="footer-col">
                    <h4>Categories</h4>
                    <a href="#shop-beef">Fresh Beef</a>
                    <a href="#shop-mutton">Premium Mutton</a>
                    <a href="#shop-chicken">Farm Fresh Chicken</a>
                    <a href="#">Marinades</a>
                </div>
                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <p><i className='bx bxl-whatsapp'></i> +91 98765 43210</p>
                    <p><i className='bx bx-phone'></i> +91 98765 43211</p>
                    <p><i className='bx bx-envelope'></i> fresh@mulberry.com</p>
                    <p><i className='bx bx-map'></i> Kochi, Kerala, India</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Mulberry Fresh. All rights reserved.</p>
            </div>
        </footer>
    );
}
