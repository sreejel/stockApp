import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import PortfolioCard from '@/components/PortfolioCard';

function Portfolio() {
  const router = useRouter();
  const [portfolioData, setPorfolioData] = useState([]);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('userAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
    }
    setPorfolioData(JSON.parse(localStorage.getItem('portfolio')));
  }, []);

  const handleStockViewClick = (stockId) => {
    router.push(`/stock/${stockId}`);
  };

  const handleAddStockClick = () => {
    router.push('/home');
  };

  return (
    <div className='w-full h-full min-h-[100vh] p-5 sm:p-10 bg-white '>
      <div className='flex flex-wrap items-center my-2'>
        <div className='text-[#006ce6] font-bold text-2xl my-2 mr-2'>My Portfolio</div>
        <button type="button" onClick={handleAddStockClick} className="bg-[#006ce6] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full sm:ml-4 sm:mt-2">
          Add Stock
        </button>
      </div>
      <div className='flex flex-wrap mt-[20px] justify-center sm:justify-start'>
        {portfolioData ?
          portfolioData?.map((stock) => (
            <PortfolioCard stock={stock} handleViewClick={() => handleStockViewClick(stock)} />
          )) :
          <div className='mt-[50px]'>
            <div className='animate-bounce w-full h-full flex justify-center items-center'>
              <img src={'https://shopr.imgix.net/web/shopr_logo_big.png?w=256&auto=format'} />
            </div>
            <div className='text-[#006ce6] font-bold text-base text-center '>
              You do not have any Stocks in your Portfolio. Please add stocks
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Portfolio;
