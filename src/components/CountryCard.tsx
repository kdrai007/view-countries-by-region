import { useNavigate } from 'react-router-dom';

type Props = {
    country: string;
    population: number;
    region: string;
    capital?: string[];
    imgUrl?: string;
    theme: boolean;
}

const CountryCard = ({ country, population, region, capital, imgUrl, theme }: Props) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/${country}`)
    }

    return (
        <div className={`grid grid-rows-2 shadow-md text-start rounded-md cursor-pointer overflow-hidden max-h-[25rem] ${theme ? 'bg-white text-black' : 'bg-[#222121] text-white'}`} onClick={handleClick}>
            <div className=''>
                <img src={imgUrl} alt={country} className='w-full h-full object-cover' />
            </div>
            <div className='px-5 py-4 basis-[50%]'>
                <h3 className='font-bold mb-3'>{country}</h3>
                <p><span className='font-semibold'>population: </span>{population}</p>
                <p><span className='font-semibold'>Region: </span>{region}</p>
                <p><span className='font-semibold'>Capital: </span>{capital ? capital : 'no capital'}</p>
            </div>
        </div>
    )
}

export default CountryCard