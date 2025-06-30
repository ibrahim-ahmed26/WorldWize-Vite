import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
export default function CityList() {
  const { city, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!city.length) return <Message message={"Add Cities To Your List"} />;
  return (
    <ul className={styles.cityList}>
      {city.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
