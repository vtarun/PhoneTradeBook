import React, { useState } from 'react'
import Input from '../components/Input';


const SearchPage = () => {
  const [search, setSearch] = useState('');
  const[responseData, setResponseData] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:3000/search/:imei");
      if(response.ok){
        const responseData = await response.json();
        console.log(responseData);
        setResponseData(responseData);
      }
    } catch(e){
      console.log(e.message);
    }
  }
  
  return (
    <div className='w-full md:w-2/3 mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center mt-12 w-full gap-2">
          <label htmlFor="search" className='flex items-center px-1 text-sm font-medium text-white'>
            Enter IMEI Number
          </label>
          <input
            id="search"
            type="text"
            name="search"
            className='rounded-md border-2 border-gray-400 py-1 px-3 shadow-sm bg-gray-400'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 rounded-md h-9 px-4 border-2 text-sm font-semibold text-black">
              Search
          </button>
        </div>
      </form>

      <div className='container'>
        {/* Keep response data in tabular format */}
        <table className='min-w-full mt-10'>
          <thead className='border'>
            <tr> 
              <th className='border text-white'>IMEI</th>
              <th className='border text-white'>Name</th>
              <th className='border text-white'>Contact</th>
              <th className='border text-white'>PDF Path</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((item,index)=>
             <tr key={item.name} className='border text-center'>
              <td className='border text-white'>{item.IMEI}</td>
              <td className='border text-white'>{item.name}</td>
              <td className='border text-white'>{item.contact}</td>
              <td className='border text-white'>{item.pdfPath}</td>
             </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SearchPage
