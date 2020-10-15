import React, { useEffect, useState } from "react";
import SideBarSearch from "./SideBarSearch";
import Search from "./Search";
import useLocalState from "../customHooks/useLocalState";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchScreen = ({ location }) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useLocalState("coffeeShopQuery", getName());
  const [cityQuery, setCityQuery] = useLocalState("coffeeShopCityQuery", "");
  const [stateQuery, setStateQuery] = useLocalState("coffeeShopStateQuery", "");
  const [zipQuery, setZipQuery] = useLocalState("coffeeShopZipQuery", "");
  const [coffeeShops, setCoffeeShops] = useLocalState("coffeeShops", []);

  // Checks if a name parameter is passed and requests shops
  // conditionally on the name's value. It also will pass the page number for
  // Pagination function to work.
  useEffect(() => {
    const name = getName();
    const params = { params: { name, page } };

    //This will add the initial result
    axios
      .get(`/api/coffee_shops`, params)
      .then((res) => setCoffeeShops(res.data))
      .catch(console.log);
  }, []);

  //Keep the name when passing from the home search
  function getName() {
    const params = new URLSearchParams(location.search);
    return params.get("name");
  }

  const nextPage = () => {
    const params = {
      params: {
        page: page + 1,
        name: query,
        city: cityQuery,
        state: stateQuery,
        zip: zipQuery,
      },
    };

    // This will add more result to the array, and setting the page to the next page
    axios
      .get(`/api/coffee_shops`, params)
      .then((res) => {
        setCoffeeShops([...coffeeShops, ...res.data]);
        setPage(page + 1);
      })
      .catch(console.log);
  };

  //TODO reset these when log out, or something like that.
  // localStorage.clear() will take everything out of localStorage
  // we can either call that on logout, or do localStorage.removeItem("<some-key>");
  // for each key want want removed
  // docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

  // make state for results (empty array)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e :>> ", e);
    const params = {
      name: query,
      city: cityQuery,
      state: stateQuery,
      zip: zipQuery,
    };

    axios
      .get(`/api/coffee_shops`, { params }) // <--- add query params in the options hash
      .then((res) => setCoffeeShops(res.data))
      .catch(console.log);
  };

  return (
    <>
      <SideBarSearch
        handleSubmit={handleSubmit}
        setCityQuery={setCityQuery}
        setStateQuery={setStateQuery}
        setZipQuery={setZipQuery}
        cityQuery={cityQuery}
        stateQuery={stateQuery}
        zipQuery={zipQuery}
      />
      <Search
        nextPage={nextPage}
        coffeeShops={coffeeShops}
        handleSubmit={handleSubmit}
        setQuery={setQuery}
        query={query}
      />
    </>
  );
};

export default SearchScreen;
