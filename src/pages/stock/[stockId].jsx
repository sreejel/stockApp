import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as d3 from 'd3';
// import { CandlestickChart } from './chart';
// import Chart from '../../components/chart/StockChart';
import StockChart from '../../components/chart/StockChart';

function Stock() {
  const router = useRouter();
  const finnhub = require('finnhub');
  const { stockId } = router.query;

  useEffect(() => {
    const getChartData = async () => {
      const { api_key } = finnhub.ApiClient.instance.authentications;
      api_key.apiKey = 'cf8e5faad3i8qmbtof20cf8e5faad3i8qmbtof2g';
      const finnhubClient = new finnhub.DefaultApi();

      finnhubClient.stockCandles(`${stockId}`, 'D', 1590988249, 1591852249, (error, data, response) => {
        console.log(data);
      });
    };
    setInterval(getChartData, 10000);
    getChartData();
  }, []);

  const handleAddToPortfolioClick = () => {
    const updatedPortfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
    updatedPortfolio.push(stockId);
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
  };

  const handleViewPortfolioClick = () => {
    router.push('/Portfolio');
  };

  return (
    <div className='w-full h-full min-h-[100vh] p-5 sm:p-10 bg-white '>
      <div className='min-h-[90vh] shadow-lg border border-[#006ce6] p-5 rounded-md'>
        <div className='my-5 flex flex-wrap justify-between items-center'>
          <div>
            <span className='text-xl font-semibold'>Stock:</span>
            <span className='text-[#006ce6] font-bold text-2xl my-2 mr-2'>  {stockId}</span>
          </div>
          <div className='flex flex-wrap'>
            <button type="button" onClick={handleAddToPortfolioClick} className="bg-[#006ce6] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full sm:ml-4 sm:mt-2 my-2">
              Add Stock To Portfolio
            </button>
            <button type="button" onClick={handleViewPortfolioClick} className="bg-[#006ce6] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full sm:ml-4 sm:mt-2 my-2">
              View My Portfolio
            </button>
          </div>
        </div>
        <div>
          Choose Interval
        </div>
        <div>
          <StockChart />
        </div>
      </div>
    </div>
  );
}

export default Stock;
