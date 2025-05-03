import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-500 top-0'>
        <div className='flex justify-between items-center mycontainer'>
          <h1 className='text-white text-3xl font-bold'>
            <span className='text-teal-950'>&le;</span>
            CipherOpera
            <span className='text-teal-950'>/&ge;</span>
            </h1>
            <div className='flex text-white'>
              <ul className='flex right-0 px-3 gap-4'>
                <li><a className='hover:text-teal-500' href="#">Home</a></li>
                <li><a className='hover:text-teal-500' href="#">About</a></li>
                <li><a className='hover:text-teal-500' href="#">Contact</a></li>
              </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
