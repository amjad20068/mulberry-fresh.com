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
          <div className="section-header category-banner">
            <div className="category-banner-bg" style={{ backgroundImage: 'url(/assets/images/beef_bg.png)', backgroundPosition: 'center 65%' }}></div>
            <div className="category-banner-content">
              <h2 style={{ marginBottom: '8px', zIndex: 1 }}>Fresh Beef</h2>
              <p className="category-banner-subtitle">Premium cuts for the perfect meal</p>
            </div>
          </div>
          <div className="product-grid" id="beef-grid">
            {renderGrid('beef')}
          </div>
        </section>

        {/* SECTION 2: FRESH MUTTON */}
        <section id="shop-mutton" className="shop-section mt-lg">
          <div className="section-header category-banner">
            <div className="category-banner-bg" style={{ backgroundImage: 'url(/assets/images/mutton_bg.png)', backgroundPosition: 'center 60%' }}></div>
            <div className="category-banner-content">
              <h2 style={{ marginBottom: '8px', zIndex: 1 }}>Premium Mutton</h2>
              <p className="category-banner-subtitle">Tender and rich in flavor</p>
            </div>
          </div>
          <div className="product-grid" id="mutton-grid">
            {renderGrid('mutton')}
          </div>
        </section>

        {/* SECTION 3: FRESH CHICKEN */}
        <section id="shop-chicken" className="shop-section mt-lg">
          <div className="section-header category-banner">
            <div className="category-banner-bg" style={{ backgroundImage: 'url(/assets/images/chicken_bg.png)', backgroundPosition: 'center 60%' }}></div>
            <div className="category-banner-content">
              <h2 style={{ marginBottom: '8px', zIndex: 1 }}>Farm Fresh Chicken</h2>
              <p className="category-banner-subtitle">Hygienically processed and packed</p>
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
