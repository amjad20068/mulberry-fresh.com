'use client';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import Link from 'next/link';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cart, openCart, searchQuery, setSearchQuery } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <>
            <nav className="navbar" id="navbar" style={{ boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none' }}>
                <div style={{ background: 'var(--secondary-green)', color: 'white', textAlign: 'center', padding: '6px', fontSize: '0.85rem', fontWeight: 600, width: '100%' }}>
                    100% Halal Certified Premium Meat
                </div>
                <div className="nav-container">
                    <Link href="/" className="logo">
                        <img src="/assets/images/logo-transparent.png" alt="Mulberry Fresh Logo" className="brand-logo" />
                    </Link>

                    <div className="nav-links">
                        <Link href="/" className="active">Home</Link>
                        <Link href="/#shop-beef">Fresh Beef</Link>
                        <Link href="/#shop-mutton">Fresh Mutton</Link>
                        <Link href="/#shop-chicken">Fresh Chicken</Link>
                        <Link href="/about">About</Link>
                        <Link href="#contact">Contact</Link>
                    </div>

                    <div className="nav-actions">
                        <div className="search-box desktop-search">
                            <i className='bx bx-search'></i>
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Search fresh meat..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <a href="#" className="icon-link"><i className='bx bx-user'></i></a>
                        <a
                            href="#"
                            className="icon-link cart-icon"
                            id="cart-toggle"
                            onClick={(e) => { e.preventDefault(); openCart(); }}
                        >
                            <i className='bx bx-shopping-bag'></i>
                            <span className="cart-badge">{totalItems}</span>
                        </a>
                        <button className="mobile-menu-btn" id="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <i className={mobileMenuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
                        </button>
                    </div>
                </div>

                <div className="mobile-search-row">
                    <div className="search-box">
                        <i className='bx bx-search'></i>
                        <input
                            type="text"
                            placeholder="Search beef, chicken, mutton..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none' }}
                        />
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} id="mobile-menu">
                <div className="mobile-search-wrapper" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                    <div className="search-box" style={{ display: 'flex', width: '100%', background: 'var(--bg-warm-white)' }}>
                        <i className='bx bx-search'></i>
                        <input
                            type="text"
                            placeholder="Search fresh meat..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none' }}
                        />
                    </div>
                </div>
                <Link href="/" className="active" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/#shop-beef" onClick={() => setMobileMenuOpen(false)}>Fresh Beef</Link>
                <Link href="/#shop-mutton" onClick={() => setMobileMenuOpen(false)}>Fresh Mutton</Link>
                <Link href="/#shop-chicken" onClick={() => setMobileMenuOpen(false)}>Fresh Chicken</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
        </>
    );
}
