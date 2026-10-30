import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatMoney } from '../lib/whatsapp';
import { OrderStatus } from '../types';
import {
  Package,
  ShoppingBag,
  RotateCcw,
  Trash2,
  Truck,
  Store,
  MessageCircle,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    orderHistory,
    updateOrderStatusInHistory,
    deleteOrderFromHistory,
    clearOrderHistory,
    reorderPastOrder,
    settings
  } = useShop();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const filteredOrders = filterStatus === 'all'
    ? orderHistory
    : orderHistory.filter((o) => o.status === filterStatus);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed_by_shop':
        return {
          label: 'Confirmed by Shop',
          bg: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800/60'
        };
      case 'out_for_delivery_or_ready':
        return {
          label: 'Out for Delivery / Ready for Pickup',
          bg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800/60'
        };
      case 'completed':
        return {
          label: 'Completed / Delivered',
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/60'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800/60'
        };
      case 'whatsapp_opened':
      default:
        return {
          label: 'WhatsApp Sent (Awaiting Confirmation)',
          bg: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-800/60'
        };
    }
  };

  const getProgressStep = (status: OrderStatus): number => {
    switch (status) {
      case 'whatsapp_opened':
        return 1;
      case 'confirmed_by_shop':
        return 2;
      case 'out_for_delivery_or_ready':
        return 3;
      case 'completed':
        return 4;
      default:
        return 1;
    }
  };

  const handleCopyRef = (ref: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ref);
      setCopiedRef(ref);
      setTimeout(() => setCopiedRef(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">My Account &amp; Order History</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
              <Package className="w-4 h-4" />
              <span>Order Management</span>
              <span aria-hidden="true">·</span>
              <span>Local Browser Persistence</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Order History &amp; Status Tracking
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Track status, review itemized breakdowns, re-open WhatsApp conversations, or easily re-order items from past inquiries.
            </p>
          </div>

          {orderHistory.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Clear all past order history saved in this browser?')) {
                  clearOrderHistory();
                }
              }}
              className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1.5 self-start md:self-auto transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        {orderHistory.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors shadow-xs ${
                filterStatus === 'all'
                  ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800'
              }`}
            >
              All Orders ({orderHistory.length})
            </button>
            <button
              onClick={() => setFilterStatus('whatsapp_opened')}
              className={`px-3 py-1.5 rounded-lg transition-colors shadow-xs ${
                filterStatus === 'whatsapp_opened'
                  ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800'
              }`}
            >
              Awaiting Shop Confirmation ({orderHistory.filter((o) => o.status === 'whatsapp_opened').length})
            </button>
            <button
              onClick={() => setFilterStatus('confirmed_by_shop')}
              className={`px-3 py-1.5 rounded-lg transition-colors shadow-xs ${
                filterStatus === 'confirmed_by_shop'
                  ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800'
              }`}
            >
              Confirmed ({orderHistory.filter((o) => o.status === 'confirmed_by_shop').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-lg transition-colors shadow-xs ${
                filterStatus === 'completed'
                  ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800'
              }`}
            >
              Completed ({orderHistory.filter((o) => o.status === 'completed').length})
            </button>
          </div>
        )}

        {/* Orders Listing */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto">
              <ShoppingBag className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Order History Found</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                You haven&apos;t placed any WhatsApp orders yet. Browse our living showroom catalog to generate your first order request.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const badge = getStatusBadge(order.status);
              const currentStep = getProgressStep(order.status);
              const isPickup = order.fulfilmentMethod === 'store_pickup';

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs text-xs space-y-4"
                >
                  {/* Order Top Bar */}
                  <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                          {order.orderRef}
                        </span>
                        <button
                          onClick={() => handleCopyRef(order.orderRef)}
                          className="text-[10px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline font-medium"
                        >
                          {copiedRef === order.orderRef ? 'Copied!' : 'Copy'}
                        </button>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Created on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        Total: {formatMoney(order.subtotal, settings.currencySymbol)}
                      </span>
                      <button
                        onClick={() => deleteOrderFromHistory(order.id)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Status Progress Stepper */}
                  <div className="px-5 pt-1">
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      <div className={`p-1.5 rounded-lg border ${currentStep >= 1 ? 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-700/60 dark:text-cyan-300' : 'bg-slate-100 border-slate-200 dark:bg-slate-950 dark:border-slate-800'}`}>
                        1. WhatsApp Prepared
                      </div>
                      <div className={`p-1.5 rounded-lg border ${currentStep >= 2 ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:border-blue-700/60 dark:text-blue-300' : 'bg-slate-100 border-slate-200 dark:bg-slate-950 dark:border-slate-800'}`}>
                        2. Confirmed by Shop
                      </div>
                      <div className={`p-1.5 rounded-lg border ${currentStep >= 3 ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:border-amber-700/60 dark:text-amber-300' : 'bg-slate-100 border-slate-200 dark:bg-slate-950 dark:border-slate-800'}`}>
                        3. Out for Dispatch / Ready
                      </div>
                      <div className={`p-1.5 rounded-lg border ${currentStep >= 4 ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-700/60 dark:text-emerald-300' : 'bg-slate-100 border-slate-200 dark:bg-slate-950 dark:border-slate-800'}`}>
                        4. Completed
                      </div>
                    </div>
                  </div>

                  {/* Order Details & Items */}
                  <div className="px-5 space-y-3">
                    {/* Fulfilment info */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-2.5">
                      {isPickup ? (
                        <Store className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <Truck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {isPickup ? 'Store Pickup Only' : 'Home Delivery Enquiry'}
                        </p>
                        {order.deliveryArea && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                            Destination: {order.deliveryArea}
                          </p>
                        )}
                        {order.preferredPickupTime && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                            Pickup Timing: {order.preferredPickupTime}
                          </p>
                        )}
                        {order.notes && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 italic mt-0.5">
                            Notes: &ldquo;{order.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Itemized Rows */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 dark:text-white truncate max-w-[280px]">
                                {item.name}
                              </p>
                              {item.variantName && (
                                <p className="text-[11px] text-cyan-600 dark:text-cyan-400">{item.variantName}</p>
                              )}
                              {item.isPickupOnly && (
                                <span className="text-[9px] text-amber-700 dark:text-amber-400 font-semibold">Store Pickup Only</span>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {formatMoney(item.lineTotal, settings.currencySymbol)}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {item.quantity} × {formatMoney(item.unitPrice, settings.currencySymbol)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Interactive Status Switcher (for demo verification) */}
                  <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {/* Demo status updater */}
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-500">Demo Status Simulator:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatusInHistory(order.id, e.target.value as OrderStatus)}
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-2 py-1 text-slate-900 dark:text-white text-[11px] focus:outline-none shadow-xs"
                      >
                        <option value="whatsapp_opened">1. WhatsApp Opened</option>
                        <option value="confirmed_by_shop">2. Confirmed by Shop</option>
                        <option value="out_for_delivery_or_ready">3. Out for Delivery / Ready</option>
                        <option value="completed">4. Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Reopen WhatsApp & Re-order actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={order.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Re-Open WhatsApp</span>
                      </a>

                      <button
                        onClick={() => reorderPastOrder(order)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs transition-colors shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-Order Items</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
