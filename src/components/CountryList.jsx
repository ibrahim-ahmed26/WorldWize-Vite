import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList({ city, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!city.length) return <Message message={"Add Cities To Your List"} />;

  const countries = city.reduce((arr, currentCity) => {
    if (!arr.some((el) => el.country === currentCity.country)) {
      return [
        ...arr,
        { country: currentCity.country, emoji: currentCity.emoji },
      ];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
