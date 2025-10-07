import React, { useEffect } from "react";
import css from "./Overview.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectApartment, selectUser, selectUserApartmentId } from "../../redux/selectors";
import { fetchApartmentByApartmentId } from "../../redux/apartment/operations";
import { fetchUserByUserId } from "../../redux/user/operations";

const Overview = () => {
  const dispatch = useDispatch();
  const apartment = useSelector(selectApartment);
  const user = useSelector(selectUser);
  const apartmentId = useSelector(selectUserApartmentId);

  useEffect(() => {
    if (apartmentId) {
      dispatch(fetchApartmentByApartmentId(apartmentId));
    }
  }, [dispatch, apartmentId]);

  useEffect(() => {
    if (apartment.owner) {
      dispatch(fetchUserByUserId(apartment.owner));
    }
  }, [dispatch, apartment.owner]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>My Apartment Info</h2>
      <ul>
        <li>Apartment Number - {apartment.apartmentNumber}</li>
        <li>Floor - {apartment.floor}</li>
        <li>SquareMeters - {apartment.squareMeters}</li>
        <li>Owner - {user.name}</li>
      </ul>
    </div>
  );
};

export default Overview;
