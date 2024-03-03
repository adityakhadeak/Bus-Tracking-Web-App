import React, { useEffect, useState } from 'react'
import '../Styles/Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";


const NavBar=()=> {
    const [menu, setMenu] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width > 768) {
                setMenu(false)
            }
            
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        // window.addEventListener('scroll', handleScroll);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
            // window.removeEventListener('scroll', handleScroll);

        };
        // eslint-disable-next-line
    }, [menu]);
   
    
    const showMenu=()=>{
        if(menu){
        setMenu(false)
        }
        else{
        setMenu(true)
        }
    }
    return (
        <div className={`bg-[#ffffff] text-[rgb(26, 32, 44)] border-b-[1px] ${menu?"-left-[0px] back":"-left-[300px]"} flex font-[Raleway] h-[70px] px-3 justify-between md:justify-evenly items-center w-[100%] flex-row`}>
            <div className='text-[30px] font-bold '>
                <Link to={'/'}>BusWay</Link>
            </div>
            <div className='hidden md:flex'>
                <ul className='text-[16px]  font-[Raleway] font-semibold flex flex-row gap-5'>
                    <li><NavLink to={'/'} className='onHover relative  p-1 mx-2 m-1'>Home</NavLink></li>
                    <li><NavLink to={'/timetable'} className='onHover relative  p-1 m-1'>Time-Table</NavLink></li>
                    <li><NavLink to={'/livelocation'} className='onHover relative  p-1 m-1'>Live Location</NavLink></li>
                </ul>
               
            </div>
            <div className='hidden md:flex'>
                <Link to={'/timetable'}> <button className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[150px] rounded-[15px] text-white'>Share Location</button></Link>
            </div>
            <div className='flex md:hidden'>
                <GiHamburgerMenu onClick={showMenu} className='text-[20px]' />
            </div>

            <div className={`flex z-[1400] bg-[#ffffff] ${menu?"-left-[0px]":"-left-[300px]"} top-0 h-full w-[300px] max-w-[400px] flex-col md:hidden duration-500 absolute`}>
                <div className=' border-b-[1px]  border-[#333333]'>
                    <div className='flex h-[70px] flex-row justify-between items-center p-2 mx-2'>
                        <div className='text-2xl font-bold'><Link to={'/'}>BusWay</Link></div>
                        <div><IoMdClose onClick={showMenu}/></div>
                    </div>
                </div>
                <div className='my-3 ml-3  ' >
                    <ul className='text-[16px]  font-[Raleway] font-semibold flex flex-col gap-3'>
                        <li><NavLink to={'/'} className='onHover relative  p-1 mx-2 m-1'>Home</NavLink></li>
                        <li><NavLink to={'/timetable'} className='onHover relative  p-1 m-1'>Time-Table</NavLink></li>
                        <li><NavLink to={'/livelocation'} className='onHover relative  p-1 m-1'>Live Location</NavLink></li>
                    </ul>
                </div>
                <div className='px-1 ml-3'>
                    <Link to={'/timetable'}> <button className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[150px] rounded-[15px]  text-white'>Share Location</button></Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar
