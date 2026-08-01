export default function AboutPage() {
    return (
        <main className="main-content" style={{ paddingTop: '120px' }}>
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image">
                            <img src="/assets/images/about-malabar.png" alt="Malabar Style Authentic Kitchen" />
                        </div>
                        <div className="about-content">
                            <span className="pre-heading">Our Roots</span>
                            <h2>The True Taste of Malabar</h2>
                            <p>At Mulberry Fresh, we bring the authentic, traditional flavors of the Malabar coast straight to your kitchen. Our premium, halal fresh meat is carefully sourced and processed to meet the highest standards of hygiene and quality.</p>
                            <ul className="why-list">
                                <li><i className='bx bx-check-circle'></i> 100% Halal Certified</li>
                                <li><i className='bx bx-check-circle'></i> Farm Fresh Daily</li>
                                <li><i className='bx bx-check-circle'></i> Authentic Malabar Tradition</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
