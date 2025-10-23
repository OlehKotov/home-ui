import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (invoice, apartment) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Invoice for ${invoice.monthYear}`, 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Owner: ${invoice.userId.name}`, 20, 40);
  doc.text(`Email: ${invoice.userId.email}`, 20, 48);
  doc.text(`Apartment number: ${apartment.apartmentNumber}`, 20, 56);

  const rightX = 120;
  doc.text(`Beneficiary: OSBB "ZhK Dom"`, rightX, 40);
  doc.text(`EDRPOU code: 39000000`, rightX, 48);
  doc.text(`Bank of Beneficiary: PRIVATBANK`, rightX, 56);
  doc.text(`IBAN: UA00305299000002600000000000`, rightX, 64);

  const tableData = invoice.services.map((s) => [
    s.name,
    s.tariff.toFixed(2),
    `${s.prev} - ${s.curr}`,
    s.charged.toFixed(2),
  ]);

  tableData.push([
    "Maintenance",
    invoice.maintenance.tariff.toFixed(2),
    invoice.maintenance.value.toString(),
    invoice.maintenance.charged.toFixed(2),
  ]);
  tableData.push([
    "Electricity (public)",
    invoice.publicElectricity.tariff.toFixed(2),
    invoice.publicElectricity.value.toString(),
    invoice.publicElectricity.charged.toFixed(2),
  ]);

  autoTable(doc, {
    startY: 80,
    head: [["Service", "Tariff (UAH)", "Readings", "Amount (UAH)"]],
    body: tableData,
    theme: "striped",
    styles: {
      fontSize: 11,
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: [0, 0, 0],
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
    },
  });

  let y = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.text("Summary:", 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Total amount: ${invoice.totalAmount.toFixed(2)} UAH`, 25, y);
  y += 8;
  doc.text(`Debt: ${invoice.debt.toFixed(2)} UAH`, 25, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text(`To pay: ${invoice.toPay.toFixed(2)} UAH`, 25, y);
  doc.setFont("helvetica", "normal");

  y += 20;
  doc.setFontSize(10);
  doc.text(
    "Please make the payment before the 10th of the next month.",
    105,
    y,
    { align: "center" }
  );

  window.open(doc.output("bloburl"));
};
