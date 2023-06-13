type Props = {
    theme: boolean;
    setTheme: (s: boolean) => void;
}

const NavBar = ({ theme, setTheme }: Props) => {
    function handleWhere() {
        console.log("currently this feature is unavailable");
    }
    return (
        <nav className='w-full shadow-md bg-white sticky top-0 z-10'>
            <div className='w-full flex justify-between items-center md:px-10 xl:px-[60px] py-5 disable-select'>
                <h1 className='font-[600] text-xl' onClick={handleWhere}>Where in the world?</h1>
                <button className='flex items-center justify-around' onClick={() => setTheme(!theme)}> <img className='w-[24px] h-[24px] mr-2' src={`/${theme ? 'light' : 'dark'}-icon.svg`} alt="" /> {theme ? "Light Mode" : "Dark Mode"}</button>
            </div>
        </nav>
    )
}

export default NavBar