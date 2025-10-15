import React, { useEffect, useMemo } from "react";
import css from "./Readings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectReadings, selectUserApartmentId } from "../../redux/selectors";
import {
  fetchReadingsByApartmentId,
  updateReadingsByApartmentId,
} from "../../redux/readings/operations";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const Readings = () => {
  const dispatch = useDispatch();
  const readings = useSelector(selectReadings);
  const apartmentId = useSelector(selectUserApartmentId);

  useEffect(() => {
    if (apartmentId) {
      dispatch(fetchReadingsByApartmentId({ apartmentId, limit: 2 }));
    }
  }, [dispatch, apartmentId]);

  const lastReading = useMemo(() => {
    if (readings.length === 0) return null;
    return readings[0];
  }, [readings]);

  const validationSchema = Yup.object().shape({
  waterCold: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
    .typeError("Please enter a valid number")
    .required("Cold water reading is required")
    .min(
      lastReading?.waterCold ?? 0,
      `Value cannot be less than previous reading (${lastReading?.waterCold ?? 0})`
    ),

  waterHot: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
    .typeError("Please enter a valid number")
    .min(
      lastReading?.waterHot ?? 0,
      `Value cannot be less than previous reading (${lastReading?.waterHot ?? 0})`
    ),

  electricity: Yup.number()
    .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
    .typeError("Please enter a valid number")
    .min(
      lastReading?.electricity ?? 0,
      `Value cannot be less than previous reading (${lastReading?.electricity ?? 0})`
    ),
});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (!apartmentId) return;

    const currentMonth = new Date().toISOString().split("T")[0]; 

    try {
      await dispatch(
        updateReadingsByApartmentId({
          apartmentId,
          month: currentMonth,
          ...data,
        })
      ).unwrap();

      toast.success("Readings successfully sent!");
      reset();
      dispatch(fetchReadingsByApartmentId({ apartmentId, limit: 2 })); 
    } catch (error) {
      toast.error(error || "Failed to send readings");
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.header}>Readings</h2>

      {readings.length > 0 ? (
        <table className={css.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Cold</th>
              <th>Hot</th>
              <th>Electricity</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((item) => (
              <tr key={item._id}>
                <td>{item.month}</td>
                <td>{item.waterCold ?? "-"}</td>
                <td>{item.waterHot ?? "-"}</td>
                <td>{item.electricity ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={css.noData}>No readings yet</p>
      )}

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.label}>
          Cold Water
          <input
            type="number"
            step="0.01"
            {...register("waterCold")}
            className={`${css.input} ${errors.waterCold ? css.error : ""}`}
            placeholder={
              lastReading?.waterCold ? `${lastReading.waterCold}` : "e.g. 123"
            }
          />
          {errors.waterCold && (
            <span className={css.errorMessage}>{errors.waterCold.message}</span>
          )}
        </label>

        <label className={css.label}>
          Hot Water
          <input
            type="number"
            step="0.01"
            {...register("waterHot")}
            className={`${css.input} ${errors.waterHot ? css.error : ""}`}
            placeholder={
              lastReading?.waterHot ? `${lastReading.waterHot}` : "e.g. 45"
            }
          />
          {errors.waterHot && (
            <span className={css.errorMessage}>{errors.waterHot.message}</span>
          )}
        </label>

        <label className={css.label}>
          Electricity
          <input
            type="number"
            step="1"
            {...register("electricity")}
            className={`${css.input} ${errors.electricity ? css.error : ""}`}
            placeholder={
              lastReading?.electricity
                ? `${lastReading.electricity}`
                : "e.g. 580"
            }
          />
          {errors.electricity && (
            <span className={css.errorMessage}>{errors.electricity.message}</span>
          )}
        </label>

        <button type="submit" className={css.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Readings;
