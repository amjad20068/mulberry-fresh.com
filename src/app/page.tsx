'use client';

import { useCart } from '@/components/CartContext';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  const { searchQuery } = useCart();

  const filterProducts = (category: 'beef' | 'mutton' | 'chicken') => {
    return products[category].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const renderGrid = (category: 'beef' | 'mutton' | 'chicken') => {
    const filtered = filterProducts(category);
    if (filtered.length === 0 && searchQuery !== '') {
      return (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
          No products match your search.
        </p>
      );
    }
    return filtered.map(p => <ProductCard key={p.id} product={p} category={category} />);
  };

  if (searchQuery) {
    const allProductsArray = [
      ...products.beef.map(p => ({ ...p, category: 'beef' as const })),
      ...products.mutton.map(p => ({ ...p, category: 'mutton' as const })),
      ...products.chicken.map(p => ({ ...p, category: 'chicken' as const })),
    ];

    const searchResults = allProductsArray.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <main className="container main-content">
        <section className="shop-section">
          <div className="section-header">
            <h2>Search Results</h2>
            <p>Showing results for &quot;{searchQuery}&quot;</p>
          </div>
          {searchResults.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              No products match your search.
            </p>
          ) : (
            <div className="product-grid">
              {searchResults.map(p => <ProductCard key={p.id} product={p} category={p.category} />)}
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="container main-content">
        {/* SECTION 1: FRESH BEEF */}
        <section id="shop-beef" className="shop-section">
          <div className="section-header" style={{
            position: 'relative',
            padding: '60px 20px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '40px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(/assets/images/beef_bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 65%',
              opacity: 0.35,
              zIndex: 0
            }}></div>
            <div style={{ position: 'relative', zIndex: 1, padding: '10px' }}>
              <h2 style={{ marginBottom: '8px', zIndex: 1 }}>Fresh Beef</h2>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0, zIndex: 1, textShadow: '0 2px 10px rgba(255,255,255,0.9)' }}>Premium cuts for the perfect meal</p>
            </div>
          </div>
          <div className="product-grid" id="beef-grid">
            {renderGrid('beef')}
          </div>
        </section>

        {/* SECTION 2: FRESH MUTTON */}
        <section id="shop-mutton" className="shop-section mt-lg">
          <div className="section-header" style={{
            position: 'relative',
            padding: '60px 20px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '40px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(/assets/images/mutton_bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 60%',
              opacity: 0.35,
              zIndex: 0
            }}></div>
            <div style={{ position: 'relative', zIndex: 1, padding: '10px' }}>
              <h2 style={{ marginBottom: '8px', zIndex: 1 }}>Premium Mutton</h2>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0, zIndex: 1, textShadow: '0 2px 10px rgba(255,255,255,0.9)' }}>Tender and rich in flavor</p>
            </div>
          </div>
          <div className="product-grid" id="mutton-grid">
            {renderGrid('mutton')}
          </div>
        </section>

        {/* SECTION 3: FRESH CHICKEN */}
        <section id="shop-chicken" className="shop-section mt-lg">
          <div className="section-header" style={{
            position: 'relative',
            padding: '60px 20px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '40px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(/assets/images/chicken_bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 60%',
              opacity: 0.35,
              zIndex: 0
            }}></div>
            <div style={{ position: 'relative', zIndex: 1, padding: '10px' }}>
              <h2 style={{ marginBottom: '8px', zIndex: 1 }}>Farm Fresh Chicken</h2>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0, zIndex: 1, textShadow: '0 2px 10px rgba(255,255,255,0.9)' }}>Hygienically processed and packed</p>
            </div>
          </div>
          <div className="product-grid" id="chicken-grid">
            {renderGrid('chicken')}
          </div>
        </section>
      </main>
    </>
  );
}
