import React, { useEffect } from "react";
import css from "./Readings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectReadings, selectUserApartmentId } from "../../redux/selectors";
import { fetchReadingsByApartmentId } from "../../redux/readings/operations";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
 // axios instance с withCredentials
// import { selectUser } from "../../redux/selectors"; // селектор твоего пользователя
// import toast from "react-hot-toast";

const Readings = () => {
  const dispatch = useDispatch();
  const readings = useSelector(selectReadings);
  const apartmentId = useSelector(selectUserApartmentId);
  
  
  useEffect(() => {
    if (apartmentId) {
      dispatch(fetchReadingsByApartmentId(apartmentId));
    }
  }, [dispatch, apartmentId]);
  // const [readings, setReadings] = useState([]);
  // const { register, handleSubmit, reset } = useForm();

  // const apartmentId = user?.apartmentId;

  // Загружаем показания
  // useEffect(() => {
  //   if (!apartmentId) return;
  //   const fetchReadings = async () => {
  //     try {
  //       const { data } = await instance.get(`/readings/${apartmentId}`);
  //       setReadings(data);
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Failed to load readings");
  //     }
  //   };
  //   fetchReadings();
  // }, [apartmentId]);

  // Отправка новых показаний
  // const onSubmit = async (formData) => {
  //   const payload = {
  //     apartmentId,
  //     ...Object.fromEntries(
  //       Object.entries(formData).filter(([_, v]) => v !== "")
  //     ),
  //   };

  //   try {
  //     const { data } = await instance.post("/readings", payload);
  //     setReadings((prev) => [...prev, data]);
  //     toast.success("Readings submitted successfully");
  //     reset();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response?.data?.message || "Error submitting readings");
  //   }
  // };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Meter Readings</h2>

      <ul>
        {readings.map((item) => (
          <li key={item._id}>
            <strong>{item.month}:</strong> <br />
            Горячая вода: {item.waterHot ?? "-"} <br />
            Холодная вода: {item.waterCold ?? "-"} <br />
            Электричество: {item.electricity ?? "-"}
          </li>
        ))}
      </ul>

      <form className={css.form}>
        <label className={css.label}>
          Cold Water
          <input
            type="number"
            step="0.01"
            // {...register("waterCold")}
            className={css.input}
            placeholder="e.g. 123"
          />
        </label>

        <label className={css.label}>
          Hot Water
          <input
            type="number"
            step="0.01"
            // {...register("waterHot")}
            className={css.input}
            placeholder="e.g. 45"
          />
        </label>

        <label className={css.label}>
          Electricity
          <input
            type="number"
            step="1"
            // {...register("electricity")}
            className={css.input}
            placeholder="e.g. 580"
          />
        </label>

        <button type="submit" className={css.submitBtn}>
          Submit Readings
        </button>
      </form>

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
            {readings.map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td>{r.waterCold ?? "-"}</td>
                <td>{r.waterHot ?? "-"}</td>
                <td>{r.electricity ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={css.noData}>No readings yet</p>
      )}
    </div>
  );
};

export default Readings;
