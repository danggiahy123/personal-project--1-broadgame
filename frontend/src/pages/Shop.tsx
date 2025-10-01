import React, { useState, useEffect } from 'react';
import './Shop.css';

interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  discountPercentage: number;
  isInStock: boolean;
  isFlashSale: boolean;
  isFeatured: boolean;
  category: string;
  brand: string;
  stock: number;
  ratings: {
    average: number;
    count: number;
  };
}

const Shop: React.FC = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (showAllProducts) {
      fetchAllProducts();
    }
  }, [showAllProducts, searchTerm, selectedCategory, sortBy, sortOrder, currentPage]);

  const fetchProducts = async () => {
    try {
      const [flashSaleResponse, featuredResponse] = await Promise.all([
        fetch('http://localhost:3001/api/products/flash-sale'),
        fetch('http://localhost:3001/api/products/featured')
      ]);

      const flashSaleData = await flashSaleResponse.json();
      const featuredData = await featuredResponse.json();

      if (flashSaleData.success) {
        setFlashSaleProducts(flashSaleData.data);
      }
      if (featuredData.success) {
        setFeaturedProducts(featuredData.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sortBy,
        sortOrder
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`http://localhost:3001/api/products?${params}`);
      const data = await response.json();

      if (data.success) {
        setAllProducts(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % flashSaleProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + flashSaleProducts.length) % flashSaleProducts.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAllProducts();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="shop-container">
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="search-header">
          <h1 className="page-title">Cửa hàng Board Game</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">Tìm kiếm</button>
          </form>
        </div>
        
        <div className="filter-section">
          <div className="category-filters">
            <button
              className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('')}
            >
              Tất cả
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="sort-section">
            <label>Sắp xếp theo:</label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="createdAt">Mới nhất</option>
              <option value="price">Giá</option>
              <option value="name">Tên</option>
              <option value="ratings.average">Đánh giá</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="sort-order-btn"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="flash-sale-section">
        <div className="section-header">
          <div className="flash-sale-banner">
            <span className="flash-text">FLASHSALE</span>
          </div>
          <button 
            className="view-all-btn"
            onClick={() => setShowAllProducts(!showAllProducts)}
          >
            {showAllProducts ? 'Ẩn tất cả' : 'Xem tất cả'}
          </button>
        </div>

        <div className="carousel-container">
          <button className="carousel-btn prev-btn" onClick={prevSlide}>
            ←
          </button>
          
          <div className="products-carousel">
            <div 
              className="products-slide"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {flashSaleProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.images[0] || '/placeholder-game.jpg'} 
                      alt={product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.shortDescription}</p>
                    
                    <div className="price-section">
                      <span className="current-price">{formatPrice(product.price)}</span>
                      <span className="original-price">{formatPrice(product.originalPrice)}</span>
                      <span className="discount-badge">-{product.discountPercentage}%</span>
                    </div>
                    
                    <button className="buy-btn">
                      {product.isInStock ? 'Còn hàng' : 'Hết hàng'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next-btn" onClick={nextSlide}>
            →
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <h2 className="section-title">Sản phẩm nổi bật</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img 
                  src={product.images[0] || '/placeholder-game.jpg'} 
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
                  }}
                />
                {product.isFlashSale && <div className="flash-sale-badge">FLASH SALE</div>}
                {product.isFeatured && <div className="featured-badge">NỔI BẬT</div>}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.shortDescription}</p>
                
                <div className="rating-section">
                  <div className="stars">
                    {renderStars(product.ratings.average)}
                  </div>
                  <span className="rating-count">({product.ratings.count})</span>
                </div>
                
                <div className="price-section">
                  <span className="current-price">{formatPrice(product.price)}</span>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount-badge">-{product.discountPercentage}%</span>
                </div>
                
                <div className="product-meta">
                  <span className="brand">{product.brand}</span>
                  <span className="category">{product.category}</span>
                </div>
                
                <button className="buy-btn">
                  {product.isInStock ? 'Còn hàng' : 'Hết hàng'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      {showAllProducts && (
        <section className="all-products-section">
          <h2 className="section-title">Tất cả sản phẩm</h2>
          <div className="products-grid">
            {allProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.images[0] || '/placeholder-game.jpg'} 
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
                    }}
                  />
                  {product.isFlashSale && <div className="flash-sale-badge">FLASH SALE</div>}
                  {product.isFeatured && <div className="featured-badge">NỔI BẬT</div>}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.shortDescription}</p>
                  
                  <div className="rating-section">
                    <div className="stars">
                      {renderStars(product.ratings.average)}
                    </div>
                    <span className="rating-count">({product.ratings.count})</span>
                  </div>
                  
                  <div className="price-section">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    <span className="discount-badge">-{product.discountPercentage}%</span>
                  </div>
                  
                  <div className="product-meta">
                    <span className="brand">{product.brand}</span>
                    <span className="category">{product.category}</span>
                  </div>
                  
                  <button className="buy-btn">
                    {product.isInStock ? 'Còn hàng' : 'Hết hàng'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Trước
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Sau
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Shop;
