import { useNavigate } from "react-router-dom"
type Props = {
    theme: boolean;
    setTheme: (s: boolean) => void;
}

const NavBar = ({ theme, setTheme }: Props) => {
    const navigate = useNavigate();
    function handleWhere() {
        navigate("/")
    }
    return (
        <nav className={`w-full shadow-md  sticky top-0 z-10 ${theme ? 'bg-white text-black' : 'bg-[#222121] text-white'}`}>
            <div className='w-full flex justify-between items-center px-5 md:px-10 xl:px-[60px] py-5 disable-select'>
                <h1 className='font-[600] text-xl cursor-pointer' onClick={handleWhere}>Where in the world?</h1>
                <button className='flex items-center justify-around' onClick={() => setTheme(!theme)}> <img className='w-[24px] h-[24px] mr-2 ' src={`/${theme ? 'light' : 'dark'}-icon.svg`} alt="" /> {theme ? "Light Mode" : "Dark Mode"}</button>
            </div>
        </nav>
    )
}

export default NavBar