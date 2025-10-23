import React from "react";
import css from "./InvoicePreview.module.css";
import { selectApartment } from "../../redux/selectors";
import { useSelector } from "react-redux";

const InvoicePreview = ({ invoice }) => {
  const apartmentNumber = useSelector(selectApartment);

  if (!invoice) return null;

  return (
    <div className={css.invoice}>
      <h2 className={css.invoiceHeader}>Receipt for {invoice.monthYear}</h2>
      <div className={css.invoiceListContainer}>
        <ul className={css.invoiceList}>
          <li className={css.invoiceItem}>
            <strong>Owner:</strong> {invoice.userId.name}
          </li>
          <li className={css.invoiceItem}>
            <strong>Apartment Number:</strong> {apartmentNumber.apartmentNumber}
          </li>
          <li className={css.invoiceItem}>
            <strong>Area:</strong> {apartmentNumber.squareMeters}m2
          </li>
        </ul>

        <ul className={css.invoiceList}>
          <li className={css.invoiceItem}>
            <strong>Beneficiary:</strong> OSBB "ZhK Dom"
          </li>
          <li className={css.invoiceItem}>
            <strong>EDRPOU code:</strong> 39000000
          </li>
          <li className={css.invoiceItem}>
            <strong>Bank of Beneficiary:</strong> PRIVATBANK
          </li>
          <li className={css.invoiceItem}>
            <strong>IBAN:</strong> UA00305299000002600000000000
          </li>
        </ul>
      </div>

      <table className={css.table}>
        <thead>
          <tr>
            <th>Service</th>
            <th>Tariff</th>
            <th>Readings</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.services.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.tariff} ₴</td>
              <td>
                {s.prev} - {s.curr}
              </td>
              <td>{s.charged.toFixed(2)} ₴</td>
            </tr>
          ))}
          <tr>
            <td>Maintenance</td>
            <td>{invoice.maintenance.tariff}</td>
            <td>{invoice.maintenance.value} м²</td>
            <td>{invoice.maintenance.charged.toFixed(2)} ₴</td>
          </tr>
          <tr>
            <td>Electricity (public, kWh)</td>
            <td>{invoice.publicElectricity.tariff}</td>
            <td>{invoice.publicElectricity.value}</td>
            <td>{invoice.publicElectricity.charged.toFixed(2)} ₴</td>
          </tr>
        </tbody>
      </table>

      <div className={css.total}>
        <p>Total amount: {invoice.totalAmount.toFixed(2)} ₴</p>
        <p>Debt: {invoice.debt.toFixed(2)} ₴</p>
        <p>
          <strong>To pay: {invoice.toPay.toFixed(2)} ₴</strong>
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;
