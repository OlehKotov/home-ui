import React, { useEffect } from "react";
import css from "./Invoices.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectInvoices, selectUserApartmentId } from "../../redux/selectors";
import { fetchInvoicesByApartmentId } from "../../redux/invoices/operations";

const Invoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(selectInvoices);
  const apartmentId = useSelector(selectUserApartmentId);

  useEffect(() => {
    if (apartmentId) {
      dispatch(fetchInvoicesByApartmentId({ apartmentId, limit: 3 }));
    }
  }, [dispatch, apartmentId]);

  return (
    <div className={css.container}>
      <h2 className={css.header}>Invoices</h2>

      {invoices && invoices.length > 0 ? (
        <table className={css.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>To pay</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              return (
                <tr key={invoice._id}>
                  <td>{invoice.monthYear}</td>
                  <td>{invoice.toPay.toFixed(2)} ₴</td>
                  <td>
                    <a
                      href={invoice.pdfUrl.replace("./", "/")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css.link}
                    >
                      Open
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={css.noData}>No invoices yet</p>
      )}
    </div>
  );
};

export default Invoices;
