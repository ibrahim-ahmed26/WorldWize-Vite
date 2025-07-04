// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message";
import BackButton from "./BackButton";
import { usePostion } from "../custom-hooks/usePosition";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [lat, lng] = usePostion();
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const { setNewCity, isLoading: loadingform } = useCities();
  useEffect(
    function () {
      async function fetchCities() {
        try {
          setIsLoadingGeoCoding(true);
          setError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That Doesn't Seem An City Please Click SomeWhere Else"
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
          console.log(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCities();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    const isCountryCode = /^[A-Z]{2}$/.test(emoji);
    const emojiURL = isCountryCode
      ? `https://flagcdn.com/w20/${emoji.toLowerCase()}.png`
      : emoji;
    const newCity = {
      cityName,
      country,
      emoji: emojiURL,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await setNewCity(newCity);
    navigate("/app");
  }

  if (isLoadingGeoCoding) return <Spinner />;
  if (error) return <Message message={error} />;
  return (
    <form
      className={`${styles.form} ${loadingform ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <img
            src={`https://flagcdn.com/w20/${emoji.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${emoji.toLowerCase()}.png 2x`}
            width="20"
            alt={`Flag of ${country}`}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
