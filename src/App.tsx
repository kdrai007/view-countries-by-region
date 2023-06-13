import { ChangeEvent, useEffect, useState } from 'react'
import "./App.css";
import { countryData } from './countryData'
import NavBar from './components/NavBar';
import CountryCard from './components/CountryCard';
import Search from './components/Search';
import { InitialCountry } from './countryData';
// import { InitialCountryData } from './countryData';


function App() {
  const [countires, setCountries] = useState([...countryData]);
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    async function fetchCountry() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      const region = [...new Set(data.map((item: { region: string }) => item.region))];
      console.log(region)
    }
    console.log(countires);
  }, [countires])

  //for SearchedItem;
  const [selectedValue, setSelectedValue] = useState("All");
  const [searchedCountry, setSearchedCountry] = useState("");
  async function fetchApi(key: string, value: string) {
    const res = await fetch(`https://restcountries.com/v3.1/${key}/${value}`);
    const data = await res.json();
    console.log(data);
    return data;
  }
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'All') {
      console.log("showing all countries");
    } else {
      setSelectedValue(e.target.value);
      fetchApi('region', e.target.value);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleInputChange(e: any) {
    if (e.code === "Enter") {
      fetchApi('name', searchedCountry);
      setSearchedCountry("");
    }
  }


  return (
    <main>
      <NavBar theme={theme} setTheme={setTheme} />
      <Search selectedValue={selectedValue} handleChange={handleChange} handleInputChange={handleInputChange} searchedCountry={searchedCountry} setSearchedCountry={setSearchedCountry} />
      <div className='grid  md:px-10 xl:px-[60px] md:grid-cols-3 lg:grid-cols-4 gap-[4rem] pb-10'>
        {countires.map((ctry) => (
          <CountryCard key={ctry.cca3} country={ctry.name.common} population={ctry.population} region={ctry.region} capital={ctry.capital} imgUrl={ctry.flags.png} />))}
      </div>
    </main>
  )
}

export default App
