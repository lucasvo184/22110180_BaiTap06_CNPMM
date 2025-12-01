'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import './admin.css';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('products');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    promotion: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch products
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await api.get('/products?limit=1000');
      return res.data.data.products;
    }
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data.data.categories;
    }
  });

  // Create product mutation
  const createProduct = useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/products', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      resetForm();
    }
  });

  // Update product mutation
  const updateProduct = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/products/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      resetForm();
    }
  });

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      promotion: '',
      image: ''
    });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category._id || product.category,
      stock: product.stock,
      promotion: product.promotion,
      image: product.image || ''
    });
    setEditingId(product._id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      promotion: parseFloat(formData.promotion) || 0,
      category: formData.category
    };

    if (editingId) {
      updateProduct.mutate({ id: editingId, data });
    } else {
      createProduct.mutate(data);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="admin-dashboard">
        <div className="container">
          <h1>Admin Dashboard</h1>

          <div className="admin-tabs">
            <button
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              className={activeTab === 'categories' ? 'active' : ''}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
          </div>

          {activeTab === 'products' && (
            <div className="admin-content">
              <div className="admin-form">
                <h2>{editingId ? 'Edit Product' : 'Create Product'}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        <option value="">Select Category</option>
                        {categoriesData?.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Promotion (%)</label>
                      <input
                        type="number"
                        value={formData.promotion}
                        onChange={(e) => setFormData({ ...formData, promotion: e.target.value })}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      {editingId ? 'Update' : 'Create'}
                    </button>
                    {editingId && (
                      <button type="button" onClick={resetForm} className="btn-cancel">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="admin-list">
                <h2>Products List</h2>
                {productsLoading ? (
                  <div className="loading">Loading...</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Promotion</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsData?.map(product => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.category?.name || 'N/A'}</td>
                          <td>{product.stock}</td>
                          <td>{product.promotion}%</td>
                          <td>
                            <button
                              onClick={() => handleEdit(product)}
                              className="btn-edit"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure?')) {
                                  deleteProduct.mutate(product._id);
                                }
                              }}
                              className="btn-delete"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="admin-content">
              <CategoryManager categories={categoriesData} />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

function CategoryManager({ categories }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createCategory = useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/categories', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setName('');
      setDescription('');
    }
  });

  const deleteCategory = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory.mutate({ name, description });
  };

  return (
    <>
      <div className="admin-form">
        <h2>Create Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
          <button type="submit" className="btn-save">Create</button>
        </form>
      </div>

      <div className="admin-list">
        <h2>Categories List</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map(category => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure?')) {
                        deleteCategory.mutate(category._id);
                      }
                    }}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

