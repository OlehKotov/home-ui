import React, { useEffect, useState } from "react";
import css from "./Invoices.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectApartment, selectInvoices, selectUserApartmentId } from "../../redux/selectors";
import { fetchInvoicesByApartmentId } from "../../redux/invoices/operations";
import { generateInvoicePDF } from "../../utils/generateInvoicePDF";
import InvoicePreview from "../InvoicePreview/InvoicePreview";
import { fetchApartmentByApartmentId } from "../../redux/apartment/operations";

const Invoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(selectInvoices);
  const apartment = useSelector(selectApartment);
  const apartmentId = useSelector(selectUserApartmentId);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

   useEffect(() => {
      if (apartmentId) {
        dispatch(fetchApartmentByApartmentId(apartmentId));
      }
    }, [dispatch, apartmentId]);

  useEffect(() => {
    if (apartmentId) {
      dispatch(fetchInvoicesByApartmentId({ apartmentId, limit: 3 }));
    }
  }, [dispatch, apartmentId]);

  return (
    <div className={css.container}>
      <h2 className={css.header}>Invoices</h2>

      {invoices && invoices.length > 0 ? (
        <>
          <table className={css.table}>
    <thead>
      <tr>
        <th>Month</th>
        <th>To pay</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {invoices.map((invoice) => (
        <tr
          key={invoice._id}
          className={css.clickableRow}
          onClick={() => setSelectedInvoice(invoice)}
        >
          <td>{invoice.monthYear}</td>
          <td>{invoice.toPay.toFixed(2)} ₴</td>
          <td>
            <button
              onClick={(e) => {
                e.stopPropagation();
                generateInvoicePDF(invoice, apartment);
              }}
              className={css.pdfBtn}
            >
              PDF
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

          {selectedInvoice && (
            <div className={css.preview}>
              <h3 className={css.previewHeader}>Receipt preview</h3>
              <InvoicePreview invoice={selectedInvoice} />
            </div>
          )}
        </>
      ) : (
        <p className={css.noData}>No invoices yet</p>
      )}
    </div>
  );
};

export default Invoices;
