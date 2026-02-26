import { useRef } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export const PrintQuotationDialog = ({
  open,
  onOpenChange,
  quotation,
  opportunityName = "Opportunity",
  customerName = "Customer",
}: PrintQuotationDialogProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!quotation) return null;

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${quotation.code} - ${quotation.title}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; padding: 40px; line-height: 1.6; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #2563eb; padding-bottom: 24px; margin-bottom: 32px; }
          .company-name { font-size: 24px; font-weight: 700; color: #2563eb; }
          .company-details { font-size: 12px; color: #666; margin-top: 4px; }
          .quote-label { font-size: 28px; font-weight: 700; color: #333; text-align: right; }
          .quote-code { font-size: 14px; color: #666; text-align: right; margin-top: 4px; font-family: monospace; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
          .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
          .meta-box h4 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px; font-weight: 600; }
          .meta-box p { font-size: 14px; font-weight: 500; }
          .meta-box .sub { font-size: 12px; color: #666; margin-top: 2px; }
          .details-table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          .details-table th { background: #f1f5f9; text-align: left; padding: 10px 16px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; font-weight: 600; border-bottom: 2px solid #e2e8f0; }
          .details-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .details-table .label { color: #64748b; width: 200px; }
          .details-table .value { font-weight: 500; }
          .summary-box { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 24px; margin-bottom: 32px; }
          .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
          .summary-row.total { border-top: 2px solid #2563eb; margin-top: 8px; padding-top: 12px; font-size: 18px; font-weight: 700; color: #2563eb; }
          .footer { margin-top: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
          .signature-box { text-align: center; }
          .signature-box .title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; }
          .signature-line { border-bottom: 1px solid #ccc; margin: 60px auto 8px; width: 200px; }
          .signature-box .name { font-size: 13px; color: #666; }
          .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; }
          .badge-approved { background: #dcfce7; color: #166534; }
          .badge-pending { background: #fef9c3; color: #854d0e; }
          .badge-self { background: #dbeafe; color: #1e40af; }
          .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 80px; font-weight: 700; color: rgba(0,0,0,0.04); pointer-events: none; z-index: 0; }
          @media print {
            body { padding: 20px; }
            @page { margin: 15mm; size: A4; }
          }
        </style>
      </head>
      <body>
        <div class="watermark">QUOTATION</div>
        ${content.innerHTML}
      </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const approvalLabel = quotation.approvalType === "self" ? "Self-Approved" : "Needs Approval";
  const approvalBadgeClass = quotation.approvalType === "self" ? "badge-self" : 
    quotation.approvalStatus === "approved" ? "badge-approved" : "badge-pending";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Quotation
          </DialogTitle>
        </DialogHeader>

        {/* Preview */}
        <div className="border rounded-lg p-6 bg-white text-black" ref={printRef}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #2563eb", paddingBottom: "24px", marginBottom: "32px" }}>
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#2563eb" }}>TeleCom CRM</div>
              <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                123 Business Avenue, District 1<br />
                Ho Chi Minh City, Vietnam<br />
                Tel: (028) 1234 5678 | Email: sales@telecomcrm.com
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#333" }}>QUOTATION</div>
              <div style={{ fontSize: "14px", color: "#666", marginTop: "4px", fontFamily: "monospace" }}>{quotation.code}</div>
            </div>
          </div>

          {/* Meta */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
              <h4 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", marginBottom: "8px", fontWeight: 600 }}>Bill To</h4>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>{customerName}</p>
              <p style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{opportunityName}</p>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
              <h4 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", marginBottom: "8px", fontWeight: 600 }}>Quotation Details</h4>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Date: {quotation.createdDate}</p>
              <p style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>Valid Until: {quotation.validUntil}</p>
            </div>
          </div>

          {/* Details */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "32px" }}>
            <thead>
              <tr>
                <th style={{ background: "#f1f5f9", textAlign: "left", padding: "10px 16px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", fontWeight: 600, borderBottom: "2px solid #e2e8f0" }}>Field</th>
                <th style={{ background: "#f1f5f9", textAlign: "left", padding: "10px 16px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", fontWeight: 600, borderBottom: "2px solid #e2e8f0" }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Quotation Title", quotation.title],
                ["Template", quotation.template],
                ["Status", quotation.status],
                ["Approval Type", approvalLabel],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#64748b", width: "200px" }}>{label}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", fontWeight: 500 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "8px", padding: "24px", marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "14px" }}>
              <span>Subtotal</span>
              <span>{quotation.totalValue}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "14px", color: "#dc2626" }}>
              <span>Discount</span>
              <span>-{quotation.discount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #2563eb", marginTop: "8px", paddingTop: "12px", fontSize: "18px", fontWeight: 700, color: "#2563eb" }}>
              <span>Total</span>
              <span>{quotation.finalValue}</span>
            </div>
          </div>

          {/* Signatures */}
          <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", fontWeight: 600 }}>Prepared By</div>
              <div style={{ borderBottom: "1px solid #ccc", margin: "60px auto 8px", width: "200px" }} />
              <div style={{ fontSize: "13px", color: "#666" }}>Sales Representative</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", fontWeight: 600 }}>Accepted By</div>
              <div style={{ borderBottom: "1px solid #ccc", margin: "60px auto 8px", width: "200px" }} />
              <div style={{ fontSize: "13px", color: "#666" }}>{customerName}</div>
            </div>
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
