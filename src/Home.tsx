import { ChangeEvent, useEffect, useState } from 'react';
import "./App.css";
import CountryCard from './components/CountryCard';
import Search from './components/Search';


interface InitialCountry {
  cca3: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
  };
}
type Props = {
  theme: boolean
}
function Home({ theme }: Props) {
  const [countries, setCountries] = useState<InitialCountry[]>([]);
  const [selectedValue, setSelectedValue] = useState("All");
  const [searchedCountry, setSearchedCountry] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function fetchCountry() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);
      setLoading(false);
    }
    fetchCountry();
  }, []);

  // for SearchedItem;
  async function fetchApi(key: string, value: string) {
    try {
      if (key === 'all') {
        const res = await fetch(`https://restcountries.com/v3.1/${key}`);
        const data = await res.json();
        return data;
      }
      const res = await fetch(`https://restcountries.com/v3.1/${key}/${value}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    try {
      if (e.target.value === 'All') {
        setSelectedValue(e.target.value);
        setCountries(await fetchApi('all', e.target.value));
        return;
      }
      setSelectedValue(e.target.value);
      setCountries(await fetchApi('region', e.target.value));
    } catch (err) {
      console.log(err);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleInputChange(e: any) {
    if (e.code === "Enter") {
      fetchApi('name', searchedCountry);
      setSearchedCountry("");
      setCountries(await fetchApi('name', searchedCountry));
    }
  }

  return (
    <main className={`${theme ? 'bg-[#e4e3e3] text-black' : 'bg-[#3a3939] text-white'}`}>
      <Search
        selectedValue={selectedValue}
        handleChange={handleChange}
        handleInputChange={handleInputChange}
        searchedCountry={searchedCountry}
        setSearchedCountry={setSearchedCountry}
        theme={theme}
      />
      <div className='grid px-5  md:px-10 xl:px-[60px] md:grid-cols-3 lg:grid-cols-4 gap-[4rem] pb-10'>
        {loading ? (
          <h1>Loading...</h1>
        ) : countries.length > 0 ? (
          countries.map((ctry) => (
            <CountryCard
              key={ctry.cca3}
              country={ctry.name.common}
              population={ctry.population}
              region={ctry.region}
              capital={ctry.capital}
              imgUrl={ctry.flags.png}
              theme={theme}
            />
          ))
        ) : (
          <h1>Failed to load the countries</h1>
        )}
      </div>
    </main>
  );
}

export default Home;
