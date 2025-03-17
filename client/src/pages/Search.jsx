import React, { useState } from 'react';
import downloadIcon from '../assets/downarrow.png';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [responseData, setResponseData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/search/${search}`);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setResponseData(responseData);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className='w-full md:w-2/3 mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-center items-center mt-12 w-full gap-2">
          <label htmlFor="search" className='flex md:items-center justify-center w-full md:w-auto px-1 text-sm font-medium text-white text-center'>
            Enter IMEI Number
          </label>
          <input
            id="search"
            type="text"
            name="search"
            className='rounded-md border-2 border-gray-400 py-1 px-3 shadow-sm bg-gray-200 focus:border-yellow-400 focus:outline-none w-3/4 md:w-auto'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-yellow-400 hover:bg-yellow-600 rounded-md h-9 px-4 border-2 text-sm font-semibold text-black w-3/4 md:w-auto">
            Search
          </button>
        </div>
      </form>

      <div className='container'>
        {/* Keep response data in tabular format */}
        <table className='min-w-full mt-10'>
          <thead className='bg-gray-900'>
            <tr>
              <th className='text-yellow-400'>IMEI</th>
              <th className='text-yellow-400 hidden md:table-cell'>Name</th>
              <th className='text-yellow-400 hidden md:table-cell'>Contact</th>
              <th className='text-yellow-400'>PDF</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-600 text-center">
                <td className='text-white'>{item.IMEI}</td>
                <td className='text-white hidden md:table-cell'>{item.name}</td>
                <td className='text-white hidden md:table-cell'>{item.contact}</td>
                <td className='text-white'>
                  <a
                    href={`http://localhost:3000/${item.pdfPath}`}
                    target="_blank"
                    className="text-white hover:underline"
                  >
                    <img src={downloadIcon} alt='Download' className='inline-block w-12 h-6' />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchPage;
