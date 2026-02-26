import { useRef } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface QuotationPrintData {
  code: string;
  title: string;
  template: string;
  totalValue: string;
  discount: string;
  finalValue: string;
  status: string;
  createdDate: string;
  validUntil: string;
  approvalType: "self" | "manager";
  approvalStatus?: "pending" | "approved" | "rejected";
  approvedBy?: string;
}

interface PrintQuotationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quotation: QuotationPrintData | null;
  opportunityName?: string;
  customerName?: string;
}

// Sample line items based on quotation template
const getLineItems = (template: string) => {
  const items: Record<string, { no: number; description: string; unit: string; qty: number; unitPrice: string; amount: string }[]> = {
    "Enterprise Internet Package": [
      { no: 1, description: "Enterprise Fiber 100Mbps - 12 months", unit: "Package", qty: 1, unitPrice: "2,400,000", amount: "2,400,000" },
      { no: 2, description: "Static IP Address (5 IPs)", unit: "Set", qty: 1, unitPrice: "600,000", amount: "600,000" },
      { no: 3, description: "Managed Router - Cisco RV345", unit: "Unit", qty: 2, unitPrice: "450,000", amount: "900,000" },
      { no: 4, description: "Installation & Configuration", unit: "Service", qty: 1, unitPrice: "500,000", amount: "500,000" },
      { no: 5, description: "24/7 Technical Support - 12 months", unit: "Package", qty: 1, unitPrice: "600,000", amount: "600,000" },
    ],
    "Cloud Services": [
      { no: 1, description: "Cloud VPS - 8 vCPU / 16GB RAM / 200GB SSD", unit: "Instance", qty: 2, unitPrice: "800,000", amount: "1,600,000" },
      { no: 2, description: "Cloud Backup - 500GB Storage", unit: "Package", qty: 1, unitPrice: "400,000", amount: "400,000" },
      { no: 3, description: "SSL Certificate - Wildcard", unit: "License", qty: 1, unitPrice: "300,000", amount: "300,000" },
      { no: 4, description: "Migration Service", unit: "Service", qty: 1, unitPrice: "500,000", amount: "500,000" },
      { no: 5, description: "Managed Monitoring - 12 months", unit: "Package", qty: 1, unitPrice: "200,000", amount: "200,000" },
    ],
  };
  return items[template] || [
    { no: 1, description: "Service Package - Standard", unit: "Package", qty: 1, unitPrice: "1,500,000", amount: "1,500,000" },
    { no: 2, description: "Setup & Configuration", unit: "Service", qty: 1, unitPrice: "500,000", amount: "500,000" },
    { no: 3, description: "Annual Support & Maintenance", unit: "Package", qty: 1, unitPrice: "300,000", amount: "300,000" },
  ];
};

const thStyle: React.CSSProperties = {
  background: "#f1f5f9", textAlign: "left", padding: "10px 14px", fontSize: "11px",
  textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", fontWeight: 600,
  borderBottom: "2px solid #e2e8f0",
};
const tdStyle: React.CSSProperties = { padding: "10px 14px", borderBottom: "1px solid #e2e8f0", fontSize: "13px" };
const tdRight: React.CSSProperties = { ...tdStyle, textAlign: "right", fontFamily: "monospace" };
const sectionTitle: React.CSSProperties = { fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#334155", marginBottom: "12px", paddingBottom: "6px", borderBottom: "2px solid #e2e8f0" };

export const PrintQuotationDialog = ({
  open,
  onOpenChange,
  quotation,
  opportunityName = "Enterprise Network Upgrade",
  customerName = "NetNam Corporation",
}: PrintQuotationDialogProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!quotation) return null;

  const lineItems = getLineItems(quotation.template);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html><html><head>
      <title>${quotation.code} - ${quotation.title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; padding: 32px; line-height: 1.5; font-size: 13px; }
        table { border-collapse: collapse; }
        .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 72px; font-weight: 700; color: rgba(0,0,0,0.03); pointer-events: none; z-index: 0; }
        @media print { body { padding: 16px; } @page { margin: 12mm; size: A4; } }
      </style></head><body>
      <div class="watermark">QUOTATION</div>
      ${content.innerHTML}
    </body></html>`);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  const approvalLabel = quotation.approvalType === "self" ? "Self-Approved" : "Needs Approval";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Quotation Preview
          </DialogTitle>
        </DialogHeader>

        <div className="border rounded-lg p-6 bg-white text-black text-sm" ref={printRef}>
          {/* ===== HEADER ===== */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #2563eb", paddingBottom: "20px", marginBottom: "28px" }}>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#2563eb" }}>TeleCom CRM</div>
              <div style={{ fontSize: "11px", color: "#666", marginTop: "4px", lineHeight: 1.6 }}>
                123 Business Avenue, District 1, Ho Chi Minh City<br />
                Tel: (028) 1234 5678 | Fax: (028) 1234 5679<br />
                Email: sales@telecomcrm.com | Web: www.telecomcrm.com<br />
                Tax ID: 0301234567
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "26px", fontWeight: 700, color: "#333" }}>QUOTATION</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px", fontFamily: "monospace" }}>{quotation.code}</div>
              <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>Date: {quotation.createdDate}</div>
            </div>
          </div>

          {/* ===== BILL TO / SHIP TO ===== */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "28px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px" }}>
              <h4 style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "8px", fontWeight: 700 }}>Bill To</h4>
              <p style={{ fontSize: "14px", fontWeight: 600 }}>{customerName}</p>
              <p style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                456 Customer Street, District 3<br />
                Ho Chi Minh City, Vietnam<br />
                Tax ID: 0309876543
              </p>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px" }}>
              <h4 style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "8px", fontWeight: 700 }}>Project / Opportunity</h4>
              <p style={{ fontSize: "14px", fontWeight: 600 }}>{opportunityName}</p>
              <p style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                Template: {quotation.template}<br />
                Approval: {approvalLabel}
              </p>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px" }}>
              <h4 style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "8px", fontWeight: 700 }}>Validity</h4>
              <p style={{ fontSize: "13px", fontWeight: 500 }}>Issue Date: {quotation.createdDate}</p>
              <p style={{ fontSize: "13px", fontWeight: 500, marginTop: "2px" }}>Valid Until: {quotation.validUntil}</p>
              <p style={{ fontSize: "13px", fontWeight: 500, marginTop: "2px" }}>Status: {quotation.status}</p>
            </div>
          </div>

          {/* ===== LINE ITEMS ===== */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={sectionTitle}>Line Items</h3>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: "40px", textAlign: "center" }}>No.</th>
                  <th style={thStyle}>Description</th>
                  <th style={{ ...thStyle, width: "70px", textAlign: "center" }}>Unit</th>
                  <th style={{ ...thStyle, width: "50px", textAlign: "center" }}>Qty</th>
                  <th style={{ ...thStyle, width: "110px", textAlign: "right" }}>Unit Price</th>
                  <th style={{ ...thStyle, width: "110px", textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item) => (
                  <tr key={item.no}>
                    <td style={{ ...tdStyle, textAlign: "center", color: "#64748b" }}>{item.no}</td>
                    <td style={{ ...tdStyle, fontWeight: 500 }}>{item.description}</td>
                    <td style={{ ...tdStyle, textAlign: "center", color: "#64748b" }}>{item.unit}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{item.qty}</td>
                    <td style={tdRight}>{item.unitPrice}</td>
                    <td style={{ ...tdRight, fontWeight: 600 }}>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== SUMMARY ===== */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "28px" }}>
            <div style={{ width: "300px", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "8px", padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: "13px" }}>
                <span>Subtotal</span><span style={{ fontFamily: "monospace" }}>{quotation.totalValue}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: "13px", color: "#dc2626" }}>
                <span>Discount ({quotation.discount})</span><span style={{ fontFamily: "monospace" }}>-{quotation.discount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: "13px" }}>
                <span>VAT (10%)</span><span style={{ fontFamily: "monospace" }}>Included</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #2563eb", marginTop: "8px", paddingTop: "10px", fontSize: "16px", fontWeight: 700, color: "#2563eb" }}>
                <span>Total</span><span style={{ fontFamily: "monospace" }}>{quotation.finalValue}</span>
              </div>
            </div>
          </div>

          {/* ===== PAYMENT INFORMATION ===== */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={sectionTitle}>Payment Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: "8px", padding: "14px" }}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#92400e", marginBottom: "8px" }}>Payment Schedule</h4>
                <table style={{ width: "100%", fontSize: "12px" }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "3px 0", color: "#666" }}>Deposit (30%)</td>
                      <td style={{ padding: "3px 0", textAlign: "right", fontWeight: 500 }}>Upon signing</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "3px 0", color: "#666" }}>Progress (50%)</td>
                      <td style={{ padding: "3px 0", textAlign: "right", fontWeight: 500 }}>Upon delivery</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "3px 0", color: "#666" }}>Final (20%)</td>
                      <td style={{ padding: "3px 0", textAlign: "right", fontWeight: 500 }}>Upon acceptance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "14px" }}>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#166534", marginBottom: "8px" }}>Bank Details</h4>
                <div style={{ fontSize: "12px", lineHeight: 1.8 }}>
                  <div><span style={{ color: "#666" }}>Bank:</span> <strong>Vietcombank</strong></div>
                  <div><span style={{ color: "#666" }}>Account:</span> <strong>0071 0012 3456 789</strong></div>
                  <div><span style={{ color: "#666" }}>Name:</span> <strong>TeleCom CRM JSC</strong></div>
                  <div><span style={{ color: "#666" }}>Branch:</span> Ho Chi Minh City</div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== TERMS & CONDITIONS ===== */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={sectionTitle}>Terms & Conditions</h3>
            <div style={{ fontSize: "11px", color: "#475569", lineHeight: 1.8, columns: "2", columnGap: "24px" }}>
              <ol style={{ paddingLeft: "16px", margin: 0 }}>
                <li style={{ marginBottom: "6px" }}>This quotation is valid for 30 days from the date of issue unless otherwise stated.</li>
                <li style={{ marginBottom: "6px" }}>Prices are quoted in VND and inclusive of VAT (10%) unless stated otherwise.</li>
                <li style={{ marginBottom: "6px" }}>Delivery timeline: within 14 business days after receiving confirmed purchase order and deposit payment.</li>
                <li style={{ marginBottom: "6px" }}>Warranty: 12 months for hardware, 24 months for software licenses from delivery date.</li>
                <li style={{ marginBottom: "6px" }}>Service Level Agreement (SLA): 99.5% uptime guarantee with 4-hour response time for critical issues.</li>
                <li style={{ marginBottom: "6px" }}>Any changes to the scope of work may result in revised pricing and timeline.</li>
                <li style={{ marginBottom: "6px" }}>Cancellation after order confirmation may incur up to 15% restocking/cancellation fee.</li>
                <li style={{ marginBottom: "6px" }}>This quotation constitutes a binding agreement upon written acceptance by both parties.</li>
              </ol>
            </div>
          </div>

          {/* ===== NOTES ===== */}
          <div style={{ marginBottom: "36px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px" }}>
            <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "6px", textTransform: "uppercase" }}>Notes</h4>
            <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.6 }}>
              Thank you for your business. If you have any questions regarding this quotation, please contact your sales representative. 
              We look forward to a successful partnership.
            </p>
          </div>

          {/* ===== SIGNATURES ===== */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", marginTop: "40px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontWeight: 700 }}>Prepared By</div>
              <div style={{ borderBottom: "1px solid #ccc", margin: "50px auto 6px", width: "160px" }} />
              <div style={{ fontSize: "12px", color: "#666" }}>Sales Representative</div>
              <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>Date: ___/___/______</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontWeight: 700 }}>Approved By</div>
              <div style={{ borderBottom: "1px solid #ccc", margin: "50px auto 6px", width: "160px" }} />
              <div style={{ fontSize: "12px", color: "#666" }}>Sales Manager</div>
              <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>Date: ___/___/______</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontWeight: 700 }}>Accepted By</div>
              <div style={{ borderBottom: "1px solid #ccc", margin: "50px auto 6px", width: "160px" }} />
              <div style={{ fontSize: "12px", color: "#666" }}>{customerName}</div>
              <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>Date: ___/___/______</div>
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div style={{ marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "12px", textAlign: "center", fontSize: "10px", color: "#94a3b8" }}>
            <p>This document was generated by TeleCom CRM. Ref: {quotation.code} | Page 1 of 1</p>
            <p style={{ marginTop: "2px" }}>© 2024 TeleCom CRM JSC. All rights reserved.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handlePrint} className="gap-1.5">
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
