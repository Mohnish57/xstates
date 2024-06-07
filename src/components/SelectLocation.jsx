import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SelectLocation.css";

// Get All Countries:
// Endpoint: https://crio-location-selector.onrender.com/countries

// Get States of a Specific Country:
// Endpoint: https://crio-location-selector.onrender.com/country={countryName}/states

// Get Cities of a Specific State in a Specific Country:
// Endpoint: https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities

const All_Countries_Endpoint =
  "https://crio-location-selector.onrender.com/countries";

const SelectLocation = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async () => {
    try {
      let data = await axios.get(All_Countries_Endpoint);
      let response = await data.data;
      // console.log(response);
      return response;
    } catch (e) {
      console.log("error fetching API");
    }
  };

  const fetchState = async (selectedCountry) => {
    try {
      let data = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      let response = await data.data;
      return response;
    } catch (e) {
      console.log("error fetching API");
    }
    // console.log(response);
  };

  const fetchCity = async (selectedCounty, selectedState) => {
    try {
      let data = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      let response = await data.data;
      return response;
    } catch (e) {
      console.log("error fetching API");
    }
    // console.log(response);
  };

  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch((e) => console.log(e));
  }, []);

  //   useEffect(() => {
  //     console.log("selected country useEffect");
  //     if (selectedCountry) {
  //       fetchState(selectedCountry).then((data) => setStates(data));
  //       setSelectedState("");
  //       setCities([]);
  //       setSelectedCity("");
  //     }
  //   }, [selectedCountry]);
  //   console.log(Boolean(selectedState), selectedState);

  //   useEffect(() => {
  //     console.log("selected state useEffect");
  //     if (selectedCountry && selectedState) {
  //       fetchCity(selectedCountry, selectedState).then((data) => setCities(data));
  //       setSelectedCity("");
  //     }
  //   }, [selectedState, selectedCountry]);

  useEffect(() => {
    // console.log("selected country useEffect");
    if (selectedCountry) {
      fetchState(selectedCountry)
        .then((data) => setStates(data))
        .catch((e) => console.log(e));
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedCountry]);
  //   console.log(Boolean(selectedState), selectedState);

  useEffect(() => {
    // console.log("selected state useEffect");
    if (selectedCountry && selectedState) {
      fetchCity(selectedCountry, selectedState)
        .then((data) => setCities(data))
        .catch((e) => console.log(e));
      setSelectedCity("");
    }
  }, [selectedState]);

  return (
    <>
      <h1>Select Location</h1>
      <form>
        <label htmlFor="country">
          <select
            onChange={(e) => {
              setSelectedCountry(e.target.value);
            }}
            name="country"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </label>
        <label htmlFor="states">
          <select
            disabled={!selectedCountry}
            name="states"
            onChange={(e) => {
              setSelectedState(e.target.value);
            }}
          >
            <option value="">Select State</option>
            {selectedCountry
              ? states.map((state) => <option key={state}>{state}</option>)
              : null}
          </select>
        </label>
        <label htmlFor="cities">
          <select
            disabled={!selectedState}
            name="cities"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {selectedCountry
              ? cities.map((city) => <option key={city}>{city}</option>)
              : null}
          </select>
        </label>
      </form>
      {selectedCity ? (
        <>
          <h3>
            You have Selected <span className="city">{selectedCity},</span>
            <span className="state">
              {selectedState},{selectedCountry}
            </span>
          </h3>
        </>
      ) : null}
    </>
  );
};
export default SelectLocation;
