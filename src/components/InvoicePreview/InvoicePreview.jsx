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

      <ul className={css.invoiceList}>
        <li className={css.invoiceItem}>
          <strong>Beneficiary:</strong> OSBB "ZhK Parus"
        </li>
        <li className={css.invoiceItem}>
          <strong>EDRPOU code:</strong> 39050771
        </li>
        <li className={css.invoiceItem}>
          <strong>Bank of Beneficiary:</strong> PrivatBank
        </li>
        <li className={css.invoiceItem}>
          <strong>IBAN:</strong> UA633052990000026002045906483
        </li>
      </ul>
    </div>
  );
};

export default InvoicePreview;
