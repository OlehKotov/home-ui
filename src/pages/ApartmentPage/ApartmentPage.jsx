import React, { useEffect } from "react";
import css from "./ApartmentPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApartment,
  selectApartmentOwner,
  selectOwner,
} from "../../redux/selectors";
import { fetchApartmentByApartmentId } from "../../redux/apartment/operations";
import { fetchUserByUserId } from "../../redux/user/operations";
import { useParams } from "react-router-dom";
import { clearUser } from "../../redux/user/slice";

const ApartmentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const apartment = useSelector(selectApartment);
  const ownerId = useSelector(selectApartmentOwner);
  const owner = useSelector(selectOwner);

  useEffect(() => {
    dispatch(fetchApartmentByApartmentId(id));
  }, [dispatch, id]);

  useEffect(() => {
  if (ownerId) {
    dispatch(fetchUserByUserId(ownerId));
  } else {
    dispatch(clearUser());
  }
}, [dispatch, ownerId]);

  if (!apartment) return <div>Loading...</div>;

  return (
    <div className={css.container}>
      <h2 className={css.header}>Apartment Info</h2>

      <ul className={css.list}>
        <li className={css.item}>Floor: {apartment.floor}</li>
        <li className={css.item}>Apartment Number: {apartment.apartmentNumber}</li>
        <li className={css.item}>Area: {apartment.squareMeters}</li>

        {owner && (
          <>
            <li className={css.item}>Owner name: {owner.name}</li>
            <li className={css.item}>Owner phone: {owner.phone}</li>
            <li className={css.item}>Owner email: {owner.email}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ApartmentPage;
