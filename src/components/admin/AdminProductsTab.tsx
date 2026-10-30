import React, { useState } from 'react';
import { Search, Plus, Check, X, DollarSign, Edit2, Trash2 } from 'lucide-react';
import { Product, Category, ShopSettings } from '../../types';
import { formatMoney } from '../../lib/whatsapp';

interface AdminProductsTabProps {
  products: Product[];
  categories: Category[];
  settings: ShopSettings;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string, name: string) => void;
  onAddProduct: (product: Product) => void;
}

export const AdminProductsTab: React.FC<AdminProductsTabProps> = ({
  products,
  categories,
  settings,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
}) => {
  const [adminSearch, setAdminSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Inline Quick Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  // Full Product Edit / Add Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    slug: '',
    sku: '',
    categoryId: 'freshwater-fish',
    subcategoryId: '',
    variety: '',
    scientificName: '',
    shortDescription: '',
    fullDescription: '',
    price: 499,
    compareAtPrice: 0,
    currency: 'INR',
    stockQuantity: 10,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80']
  });

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      adminSearch.trim() === '' ||
      p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.variety?.toLowerCase().includes(adminSearch.toLowerCase());
    const matchCat = filterCategory === 'all' || p.categoryId === filterCategory;
    return matchSearch && matchCat;
  });

  const startInlineEdit = (p: Product) => {
    setEditingId(p.id);
    setEditPrice(p.price);
    setEditStock(p.stockQuantity);
  };

  const saveInlineEdit = (p: Product) => {
    const updated: Product = {
      ...p,
      price: editPrice,
      stockQuantity: editStock,
      availabilityStatus: editStock <= 0 ? 'out_of_stock' : editStock <= 5 ? 'low_stock' : 'in_stock'
    };
    onUpdateProduct(updated);
    setEditingId(null);
  };

  const toggleProductActive = (p: Product) => {
    onUpdateProduct({ ...p, active: !p.active });
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setProductForm({
      id: `prod-user-${Date.now()}`,
      name: '',
      slug: '',
      sku: `MA-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId: 'freshwater-fish',
      subcategoryId: '',
      variety: '',
      scientificName: '',
      shortDescription: '',
      fullDescription: '',
      price: 499,
      compareAtPrice: 0,
      currency: 'INR',
      stockQuantity: 10,
      availabilityStatus: 'in_stock',
      productType: 'live-fish',
      deliveryPolicy: 'standard_delivery',
      featured: false,
      active: true,
      images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80']
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setModalMode('edit');
    setProductForm({ ...p });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    const slug =
      productForm.slug ||
      productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const isBird = productForm.productType === 'live-bird' || productForm.categoryId === 'birds';

    const fullProduct: Product = {
      ...(productForm as Product),
      slug,
      deliveryPolicy: isBird ? 'store_pickup_only' : productForm.deliveryPolicy || 'standard_delivery',
      variants: productForm.variants && productForm.variants.length > 0 ? productForm.variants : [
        {
          id: `var-${Date.now()}`,
          name: 'Standard',
          sku: productForm.sku || `SKU-${Date.now()}`,
          price: productForm.price || 0,
          stockQuantity: productForm.stockQuantity || 10,
          isAvailable: true
        }
      ],
      tags: productForm.tags || [productForm.categoryId || 'freshwater'],
      specifications: productForm.specifications || {},
      createdAt: productForm.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (modalMode === 'create') {
      onAddProduct(fullProduct);
    } else {
      onUpdateProduct(fullProduct);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Filter and Add Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <input
              type="text"
              placeholder="Search by name, SKU..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="all">All Departments</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Stock</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
              {filteredProducts.map((p) => {
                const isEditingThis = editingId === p.id;
                const isBird = p.productType === 'live-bird' || p.deliveryPolicy === 'store_pickup_only';

                return (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Item Thumbnail & Name */}
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{p.name}</p>
                        {p.variety && <span className="text-[10px] text-cyan-600 dark:text-cyan-400">{p.variety}</span>}
                        {isBird && (
                          <span className="text-[9px] text-amber-600 dark:text-amber-400 block font-semibold">Store Pickup Only</span>
                        )}
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {p.sku}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 capitalize">
                      {p.categoryId.replace(/-/g, ' ')}
                    </td>

                    {/* Price (Inline Editable) */}
                    <td className="py-3 px-3">
                      {isEditingThis ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-20 px-2 py-1 bg-white dark:bg-slate-950 border border-cyan-500 rounded text-xs text-slate-900 dark:text-white"
                        />
                      ) : (
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {formatMoney(p.price, settings.currencySymbol)}
                        </span>
                      )}
                    </td>

                    {/* Stock Quantity (Inline Editable) */}
                    <td className="py-3 px-3">
                      {isEditingThis ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white dark:bg-slate-950 border border-cyan-500 rounded text-xs text-slate-900 dark:text-white"
                        />
                      ) : (
                        <span
                          className={`font-medium ${
                            p.stockQuantity <= 0
                              ? 'text-rose-600 dark:text-rose-400'
                              : p.stockQuantity <= 5
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {p.stockQuantity}
                        </span>
                      )}
                    </td>

                    {/* Availability */}
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                          p.availabilityStatus === 'in_stock'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/50'
                            : p.availabilityStatus === 'low_stock'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800/50'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800/50'
                        }`}
                      >
                        {p.availabilityStatus.replace(/_/g, ' ')}
                      </span>
                    </td>

                    {/* Active Toggle Switch */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleProductActive(p)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          p.active ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                        title={p.active ? 'Active on store' : 'Hidden from store'}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white dark:bg-slate-950 transition-transform ${
                            p.active ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isEditingThis ? (
                          <>
                            <button
                              onClick={() => saveInlineEdit(p)}
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                              title="Save price & stock"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-pointer"
                              title="Cancel edit"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startInlineEdit(p)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              title="Quick edit price & stock"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              title="Edit full product details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(p.id, p.name)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {modalMode === 'create' ? 'Add New Product' : `Edit: ${productForm.name}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Crowntail Betta"
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku || ''}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Department</label>
                  <select
                    value={productForm.categoryId || 'freshwater-fish'}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Variety / Morph</label>
                  <input
                    type="text"
                    placeholder="e.g. Mustard Gas / Moscow Blue"
                    value={productForm.variety || ''}
                    onChange={(e) => setProductForm({ ...productForm, variety: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Product Type</label>
                  <select
                    value={productForm.productType || 'live-fish'}
                    onChange={(e) => setProductForm({ ...productForm, productType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="live-fish">Live Fish</option>
                    <option value="live-bird">Live Bird (Pickup Only)</option>
                    <option value="live-plant">Live Plant</option>
                    <option value="aquarium">Aquarium Glass</option>
                    <option value="filter">Filter</option>
                    <option value="lighting">Lighting</option>
                    <option value="food">Fish Food</option>
                    <option value="substrate">Substrate</option>
                    <option value="equipment">Equipment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || 0}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={productForm.stockQuantity || 0}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Availability</label>
                  <select
                    value={productForm.availabilityStatus || 'in_stock'}
                    onChange={(e) => setProductForm({ ...productForm, availabilityStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="contact_for_price">Contact for Price</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Product Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={productForm.images?.[0] || ''}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={productForm.shortDescription || ''}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.featured || false}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="rounded bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-cyan-600"
                  />
                  <span>Featured Showcase</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.active !== false}
                    onChange={(e) => setProductForm({ ...productForm, active: e.target.checked })}
                    className="rounded bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-cyan-600"
                  />
                  <span>Active in Store</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
