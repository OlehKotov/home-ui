
// import { jsPDF } from "jspdf";

// export const generateInvoicePDF = (invoice, apartment) => {
//   const doc = new jsPDF();

//   doc.setFontSize(18);
//   console.log(invoice.monthYear);
  
//   doc.text(`Invoice for ${invoice.monthYear}`, 105, 20, { align: "center" });

//   doc.setFontSize(12);
//   doc.text(`Owner: ${invoice.userId.name}`, 20, 40);
//   doc.text(`Email: ${invoice.userId.email}`, 20, 48);
//   doc.text(`Apartment number: ${apartment.apartmentNumber}`, 20, 56);
//   doc.text(`Area: ${apartment.squareMeters}`, 20, 64);

//   let y = 75;
//   doc.text("Services:", 20, y);
//   y += 10;

//   invoice.services.forEach((s) => {
//     doc.text(
//       `${s.name}: ${s.prev} - ${s.curr} × ${s.tariff} UAH = ${s.charged.toFixed(2)} UAH`,
//       25,
//       y
//     );
//     y += 8;
//   });

//   y += 8;
//   doc.text(`Maintenance: ${invoice.maintenance.value}m3 × ${invoice.maintenance.tariff} UAH = ${invoice.maintenance.charged.toFixed(2)} UAH`, 25, y);
//   y += 8;
//   doc.text(`Electricity (public, kWh)): ${invoice.publicElectricity.value} × ${invoice.publicElectricity.tariff} UAH = ${invoice.publicElectricity.charged.toFixed(2)} UAH`, 25, y);

//   y += 15;
//   doc.text(`Total amount: ${invoice.totalAmount.toFixed(2)} UAH`, 20, y);
//   y += 8;
//   doc.text(`Debt: ${invoice.debt.toFixed(2)} UAH`, 20, y);
//   y += 8;
//   doc.text(`To pay: ${invoice.toPay.toFixed(2)} UAH`, 20, y);

//   window.open(doc.output("bloburl"));
// };

import { jsPDF } from "jspdf";

export const generateInvoicePDF = (invoice, apartment) => {
  const doc = new jsPDF();


  doc.setFontSize(18);
  doc.text(`Invoice for ${invoice.monthYear}`, 105, 20, { align: "center" });


  doc.setFontSize(12);
  doc.text(`Owner: ${invoice.userId.name}`, 20, 40);
  doc.text(`Email: ${invoice.userId.email}`, 20, 48);
  doc.text(`Apartment number: ${apartment.apartmentNumber}`, 20, 56);


  let y = 70;
  doc.setFontSize(13);
  doc.text("Services:", 20, y);
  y += 10;

  doc.setFontSize(12);
  invoice.services.forEach((s) => {
    doc.text(
      `${s.name}: ${s.prev} - ${s.curr} × ${s.tariff} UAH = ${s.charged.toFixed(2)} UAH`,
      25,
      y
    );
    y += 8;
  });

  y += 10;
  doc.text(
    `Maintenance: ${invoice.maintenance.value} × ${invoice.maintenance.tariff} UAH = ${invoice.maintenance.charged.toFixed(2)} UAH`,
    25,
    y
  );
  y += 8;
  doc.text(
    `Electricity (public): ${invoice.publicElectricity.value} × ${invoice.publicElectricity.tariff} UAH = ${invoice.publicElectricity.charged.toFixed(2)} UAH`,
    25,
    y
  );


  y += 15;
  doc.setFontSize(13);
  doc.text("Summary:", 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Total amount: ${invoice.totalAmount.toFixed(2)} UAH`, 25, y);
  y += 8;
  doc.text(`Debt: ${invoice.debt.toFixed(2)} UAH`, 25, y);
  y += 8;
  doc.text(`To pay: ${invoice.toPay.toFixed(2)} UAH`, 25, y);

  
  y += 20;
  doc.setFontSize(13);
  doc.text("Payment details:", 20, y);
  y += 10;

   doc.setFontSize(12);
  doc.text(`Beneficiary: OSBB "ZhK Parus"`, 25, y);
  y += 8;
  doc.text(`EDRPOU code: 39050771`, 25, y);
  y += 8;
  doc.text(`Bank of Beneficiary: PrivatBank`, 25, y);
  y += 8;
  doc.text(`IBAN: UA633052990000026002045906483`, 25, y);

 
  y += 20;
  doc.setFontSize(10);
  doc.text("Please make the payment before the 10th of the next month.", 105, y, { align: "center" });


  window.open(doc.output("bloburl"));
};

