import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { countryCodes } from '../countryData';


interface InitialCountry {
    cca3: string;
    name: {
        common: string;
    };
    borders?: string[]
    population: number;
    region: string;
    capital?: string[];
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    nativeName: {
        eng?: {
            official: string,
            common: string
        }
    }
    subregion?: string;
}
type Props = {
    theme: boolean
}

const Country = ({ theme }: Props) => {
    const { country } = useParams();
    const [Mycountry, setMyCountry] = useState<InitialCountry[]>([]);
    const [borders, setBorders] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCountry() {
            const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
            const data = await res.json();
            if (data.length > 0) {
                const updateMyCountry = data.filter((item: { name: { common: string | undefined; }; }) => item.name.common === country);
                setMyCountry(updateMyCountry);
                updateMyCountry[0].borders !== undefined && updateMyCountry[0].borders.map((border: string) => setBorders(prevBorders => {
                    const borderName = countryCodes[border];
                    if (prevBorders.includes(borderName)) {
                        return prevBorders;
                    } else {
                        return [...prevBorders, borderName];
                    }

                }));
            }

        }
        fetchCountry();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (Mycountry.length > 0) {
        return (<div className={` ${theme ? 'bg-white text-black' : 'bg-[#222121] text-white'} px-5 md:px-0 min-h-screen`}>
            <button className={`md:mx-10 xl:mx-[60px] my-5 border-[2px] border-black rounded-lg px-3 py-2 font-semibold `} onClick={() => navigate("..")}> <span className='text-xl'>⬅</span> Go Back</button>
            <div className={`w-full flex  md:px-10 xl:px-[60px] py-5 gap-[4rem] mt-[60px flex-col items-start  md:flex-row`} >
                <div className='flex-[1] flex items-center justify-center '>
                    <img className='lg:w-[600px] lg:h-[400px] object-cover' src={Mycountry[0].flags.svg} alt={Mycountry[0].flags.alt} />
                </div>
                <div className='flex-[1] flex items-start flex-col ' >
                    <h1 className='font-extrabold text-[28px] mb-[2rem] md:mb-[4rem]'>{Mycountry[0].name.common}</h1>
                    <div className='flex md:flex-row flex-col lg:gap-[4rem] xl:gap-[10rem]'>
                        <div className='flex flex-col gap-2'>
                            <p><span className='font-bold'>Native Name: </span>{Mycountry[0].name.common}</p>
                            <p><span className='font-bold'>Population: </span>{Mycountry[0].population}</p>
                            <p><span className='font-bold'>Region: </span>{Mycountry[0].region}</p>
                            <p><span className='font-bold'>Sub-Region: </span>East Asia</p>
                            <p><span className='font-bold'>Capital: </span>{Mycountry[0].capital}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p><span className='font-bold'>Top Level Domain: </span>ai</p>
                            <p><span className='font-bold'>Currencies: </span>dollar</p>
                            <p><span className='font-bold'>language: </span>english</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-[1rem] mt-[2rem] md:mt-[4rem] flex-wrap'>
                        <strong>Border Country:</strong>
                        {borders.length > 0 && borders.map((border, index) => (
                            border !== undefined && <button className={`border  rounded px-2 py-1 transition duration-100 ease-in-out ${theme ? 'hover:bg-black hover:text-white  text-black' : 'hover:bg-white hover:text-black'}`} key={border + index} onClick={() => { navigate(`..`); setTimeout(() => navigate(`/${border}`), 10) }}>{border}</button>
                        ))}

                    </div>
                </div>
            </div>
        </div >
        )
    } else {
        return (<div className={`h-screen ${theme ? 'bg-white text-black' : 'bg-[#222121] text-white'}`}> <h1 className='font-serif text-center'>loading...</h1></div>)
    }

}
// {loading ?  : Mycountry.length > 0 && Mycountry[0].name.common}
export default Country