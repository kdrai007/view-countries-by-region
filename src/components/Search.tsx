//Search countries and search by region
import { ChangeEvent } from 'react'
import { regions } from '../countryData'

interface Props {
    searchedCountry: string;
    setSearchedCountry: (s: string) => void;
    selectedValue: string;
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleInputChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    theme: boolean
}

const Search = ({ searchedCountry, setSearchedCountry, selectedValue, handleChange, handleInputChange, theme }: Props) => {

    return (
        <div className={`flex items-start gap-8 md:gap-0 md:items-center justify-between flex-col md:flex-row px-5  md:px-10 xl:px-[60px] py-10 ${theme ? ' text-black' : ' text-white'}`}>
            <div className={`flex  items-center px-2 py-3 w-full md:w-[20rem] rounded-sm ${theme ? 'bg-white text-black' : 'bg-[#222121] text-white'}`} >
                <img src={theme ? '/search-dark.svg' : '/search-light.svg'} className="w-[24px] h-[24px] mr-2" />
                <input type="text" placeholder='search country...' className={`${theme ? 'bg-white text-black' : 'bg-[#222121] text-white'} w-full outline-none`} value={searchedCountry} onChange={(e) => setSearchedCountry(e.target.value)} onKeyDown={handleInputChange} />

            </div>
            <select className={`block  px-4 py-2 border border-gray-300 rounded-md focus:outline-none  active:outline-none w-[50%] md:w-[10rem] ${theme ? 'bg-white text-black' : 'bg-[#222121] text-white'}`} value={selectedValue} onChange={(e) => handleChange(e)}>
                {regions.map((r, index) => (
                    <option className='p-2' value={r} key={r + index}>{r}</option>
                ))}
            </select>
        </div>
    )
}

export default Search