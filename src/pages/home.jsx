import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import StockListing from '@/components/StockListing';
const finnhub = require('finnhub');

function Home({ resp }) {
  const router = useRouter();
  
  const [searchValue, setSearchValue] = useState('');
  const [apiData, setApiData] = useState();
  const [userName, setUserName] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [toggleSearch, setToggleSearch] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      const { api_key } = finnhub.ApiClient.instance.authentications;
      api_key.apiKey = 'cf8e5faad3i8qmbtof20cf8e5faad3i8qmbtof2g';
      const finnhubClient = new finnhub.DefaultApi();

      finnhubClient.symbolSearch(searchValue, (error, data, response) => {
        setApiData(JSON.parse(JSON.stringify({ ...data.result })));
      });
    };

    apiCall();
  }, [toggleSearch]);

  useEffect(() => {
    setUserName(sessionStorage.getItem('userName'));
    setUserPhoto(sessionStorage.getItem('photo'));
  }, []);

  const handleStockClick = (stock) => {
    router.push(`/stock/${stock[2]}`);
  };

  const handleViewPortfolioClick = () => {
    router.push('/Portfolio');
  };

  const handleSearchValueChange = (searchValue) => {
    setSearchValue(searchValue);
  };

  const handleSearchClick = () => {
    setToggleSearch(currState => !currState);
  };
  
  return (
    <div className='w-full h-full min-h-[100vh] p-5 sm:p-10 bg-white '>
      <div className='min-h-[90vh] shadow-lg border border-[#006ce6] p-5 rounded-md'>
        <div className='flex flex-row justify-between items-center'>
          <span className='text-xl'>Welcome <span className='text-[#006ce6] font-bold'> {userName}</span></span>
          <div className='flex flex-wrap'>
            <button type="button" onClick={handleViewPortfolioClick} className="bg-[#006ce6] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full sm:ml-4 sm:mt-2 mt-7">
              View My Portfolio
            </button>
            <div className='rounded-full w-12 h-12 overflow-hidden ml-2 invisible sm:visible'>
              <img src={userPhoto} className="w-auto h-auto" alt="userPhoto" />
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <div className=" flex flex-row items-stretch w-full mb-4">
            <input
              className=" flex-auto min-w-0 max-w-[350px] block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded m-0
                         focus:text-gray-900 focus:bg-white focus:border-[#006ce6] focus:border-[2px] focus:outline-none"
              placeholder="Enter Symbol or Name to search"
              value={searchValue}
              onChange={e => handleSearchValueChange(e.target.value)} />
            <button type="button" onClick={handleSearchClick} className="bg-[#006ce6] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ml-2 sm:ml-4 sm:mt-2">
              Search
            </button>
          </div>
        </div>
        <StockListing listingData={apiData} handleStockClick={(stock) => handleStockClick(stock)} />
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const { api_key } = finnhub.ApiClient.instance.authentications;
//   api_key.apiKey = 'cf8e5faad3i8qmbtof20cf8e5faad3i8qmbtof2g';
//   const finnhubClient = new finnhub.DefaultApi();

//  finnhubClient.symbolSearch('goog', (error, data, response) => console.log(data));

//   return { props: { } };
// }

export default Home;
