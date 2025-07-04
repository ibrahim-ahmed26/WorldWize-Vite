import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <img
          src={country.emoji}
          width="20"
          style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
          alt={`Flag of ${country.cityName}`}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
