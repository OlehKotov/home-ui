import React, { useEffect } from "react";
import css from "./Overview.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApartment,
  selectUserApartmentId,
  selectUserName,
} from "../../redux/selectors";
import { fetchApartmentByApartmentId } from "../../redux/apartment/operations";

const Overview = () => {
  const dispatch = useDispatch();
  const apartment = useSelector(selectApartment);
  const userName = useSelector(selectUserName);
  const apartmentId = useSelector(selectUserApartmentId);

  useEffect(() => {
    if (apartmentId && !apartment) {
      dispatch(fetchApartmentByApartmentId(apartmentId));
    }
  }, [dispatch, apartmentId, apartment]);

  return (
    <div className={css.container}>
      <h2 className={css.header}>My Apartment Info</h2>
      <ul className={css.list}>
        <li className={css.item}>Floor - {apartment?.floor}</li>
        <li className={css.item}>
          Apartment Number - {apartment?.apartmentNumber}
        </li>
        <li className={css.item}>Area - {apartment?.squareMeters}</li>
        <li className={css.item}>Owner - {userName}</li>
      </ul>
    </div>
  );
};

export default Overview;
