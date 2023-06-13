//Search countries and search by region
import { ChangeEvent, useState } from 'react'
import { regions } from '../countryData'


const Search = () => {
    const [selectedValue, setSelectedValue] = useState("All");
    const [searchedCountry, setSearchedCountry] = useState("");
    async function fetchApi(key: string, value: string) {
        const res = await fetch(`https://restcountries.com/v3.1/${key}/${value}`);
        const data = await res.json();
        console.log(data);
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
        <div className='flex items-center justify-between  md:px-10 xl:px-[60px] py-10'>
            <div className="flex bg-white items-center px-2 py-3 w-[20rem] rounded-sm">
                <img src='/search.svg' className="w-[24px] h-[24px] mr-2" />
                <input type="text" placeholder='search country...' className='w-full outline-none' value={searchedCountry} onChange={(e) => setSearchedCountry(e.target.value)} onKeyDown={handleInputChange} />

            </div>
            <select className=' block  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-transparent' value={selectedValue} onChange={(e) => handleChange(e)}>
                {regions.map((r, index) => (
                    <option className='p-2' value={r} key={r + index}>{r}</option>
                ))}
            </select>
        </div>
    )
}

export default Search