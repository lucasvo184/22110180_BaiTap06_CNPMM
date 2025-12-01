'use client';

import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import './products.css';

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minPromotion: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.data.categories))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  // Fetch products with infinite query for lazy loading
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = { page: pageParam, limit: 8, ...filters }; // Reduced to 8 for easier testing
      const response = await api.get('/products', { params });
      return response.data.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  // Handle scroll for lazy loading
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minPromotion: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  // Accumulate products from all pages
  const allProducts = data?.pages.flatMap(page => page.products) || [];

  return (
    <div className="products-page">
      <div className="container">
        <h1>Products</h1>

        {/* Filters */}
        <div className="products-filters">
          <form onSubmit={handleSearch} className="filter-form">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="filter-input"
                min="0"
              />
            </div>

            <div className="filter-group">
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="filter-input"
                min="0"
              />
            </div>

            <div className="filter-group">
              <input
                type="number"
                placeholder="Min Promotion %"
                value={filters.minPromotion}
                onChange={(e) => handleFilterChange('minPromotion', e.target.value)}
                className="filter-input"
                min="0"
                max="100"
              />
            </div>

            <div className="filter-group">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                <option value="createdAt">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="views">Sort by Views</option>
                <option value="promotion">Sort by Promotion</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>

            <div className="filter-group">
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="filter-select"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>

            <button type="submit" className="btn-filter">Search</button>
            <button type="button" onClick={resetFilters} className="btn-filter btn-reset">
              Reset
            </button>
          </form>
        </div>

        {/* Products Grid */}
        {error && (
          <div className="error">
            Error loading products: {error.message}
          </div>
        )}

        {isLoading && (
          <div className="loading">Loading products...</div>
        )}

        {!isLoading && (
          <>
            <div className="products-grid">
              {allProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {isFetchingNextPage && (
              <div className="loading">Loading more products...</div>
            )}

            {!hasNextPage && allProducts.length > 0 && (
              <div className="products-end">
                No more products to load
              </div>
            )}

            {allProducts.length === 0 && !isLoading && (
              <div className="products-empty">
                No products found. Try adjusting your filters.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

