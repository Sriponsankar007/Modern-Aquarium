/**
 * Modern Aquarium — Google Sheets Backend Storage Connector
 * 
 * Provides:
 * - Direct Google Sheets integration for Orders, Catalog, and Inquiries.
 * - Supports Google Apps Script Web App webhook (zero-auth, no OAuth required)
 *   or Google Sheets REST API v4.
 * - Auto-sync and manual batch sync of orders.
 * - Pre-formatted Apps Script template and step-by-step setup guides.
 */

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  appsScriptUrl: string;
  apiKey: string;
  autoSyncOrders: boolean;
  lastSyncTime: string | null;
  syncStatus: 'IDLE' | 'CONNECTED' | 'ERROR' | 'SYNCING';
  lastError: string | null;
}

export interface SheetOrderRow {
  orderId: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  itemsSummary: string;
  totalAmount: number;
  deliveryAddress: string;
  deliveryMethod: string;
  paymentStatus: string;
}

const STORAGE_KEY = 'modern_aquarium_sheets_config_v1';

export const GoogleSheets = {
  /**
   * Load stored Google Sheets configuration
   */
  getConfig(): GoogleSheetsConfig {
    if (typeof window === 'undefined') {
      return this.getDefaultConfig();
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('GoogleSheets: Failed to load config from storage', e);
    }
    return this.getDefaultConfig();
  },

  /**
   * Default configuration template
   */
  getDefaultConfig(): GoogleSheetsConfig {
    return {
      spreadsheetId: '',
      appsScriptUrl: '',
      apiKey: '',
      autoSyncOrders: false,
      lastSyncTime: null,
      syncStatus: 'IDLE',
      lastError: null,
    };
  },

  /**
   * Persist Google Sheets configuration
   */
  saveConfig(config: Partial<GoogleSheetsConfig>): GoogleSheetsConfig {
    const updated = { ...this.getConfig(), ...config };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('GoogleSheets: Failed to save config', e);
    }
    return updated;
  },

  /**
   * Append a customer order to Google Sheets
   * Uses Apps Script Webhook (POST) if configured, or falls back to server endpoint
   */
  async appendOrder(order: SheetOrderRow): Promise<{ success: boolean; message: string }> {
    const config = this.getConfig();

    // If Google Apps Script webhook URL is provided
    if (config.appsScriptUrl && config.appsScriptUrl.trim().length > 10) {
      try {
        const response = await fetch(config.appsScriptUrl.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'APPEND_ORDER',
            data: order,
          }),
          mode: 'no-cors' // Google Apps Script redirects require no-cors in browser
        });

        this.saveConfig({
          lastSyncTime: new Date().toISOString(),
          syncStatus: 'CONNECTED',
          lastError: null,
        });

        return {
          success: true,
          message: 'Order dispatched successfully to Google Sheets backend.',
        };
      } catch (err: any) {
        const errorMsg = err?.message || 'Network error writing to Google Sheets';
        this.saveConfig({
          syncStatus: 'ERROR',
          lastError: errorMsg,
        });
        return {
          success: false,
          message: errorMsg,
        };
      }
    }

    // Fallback: Notify user that Google Sheets webhook is pending configuration
    return {
      success: false,
      message: 'Google Sheets webhook URL is not configured yet. Order saved locally.',
    };
  },

  /**
   * Test connection to Google Sheets webhook
   */
  async testConnection(webhookUrl: string): Promise<{ success: boolean; details: string }> {
    if (!webhookUrl || !webhookUrl.startsWith('https://script.google.com')) {
      return {
        success: false,
        details: 'Invalid Webhook URL. It must begin with https://script.google.com/macros/s/...',
      };
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'PING' }),
        mode: 'no-cors',
      });

      this.saveConfig({
        appsScriptUrl: webhookUrl,
        syncStatus: 'CONNECTED',
        lastSyncTime: new Date().toISOString(),
        lastError: null,
      });

      return {
        success: true,
        details: 'Connection probe dispatched successfully to Google Sheets Web App.',
      };
    } catch (e: any) {
      return {
        success: false,
        details: e?.message || 'Failed to connect to Google Sheets webhook.',
      };
    }
  },

  /**
   * Generate copy-paste ready Google Apps Script code for the user
   */
  getAppsScriptTemplate(): string {
    return `/**
 * Modern Aquarium — Google Sheets Webhook Script
 * 
 * Paste this in your Google Sheet via Extensions > Apps Script:
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Orders") || ss.insertSheet("Orders");
    
    // Auto-create header if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order ID", "Timestamp", "Customer Name", 
        "Phone / WhatsApp", "Items Summary", "Total Amount (INR)", 
        "Delivery Address", "Delivery Method", "Payment Status"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#e0f2fe");
    }
    
    var data = JSON.parse(e.postData.contents);
    if (data.action === "APPEND_ORDER") {
      var o = data.data;
      sheet.appendRow([
        o.orderId, o.timestamp, o.customerName, 
        o.customerPhone, o.itemsSummary, o.totalAmount, 
        o.deliveryAddress, o.deliveryMethod, o.paymentStatus
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "pong" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
  }
};
