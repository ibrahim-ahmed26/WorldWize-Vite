import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { deleteCity } = useCities();
  function handleSubmit(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span>
          <img
            src={emoji}
            width="20"
            style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
            alt={`Flag of ${cityName}`}
          />
        </span>

        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.time}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleSubmit}>
          &times;
        </button>
      </Link>
    </li>
  );
}
