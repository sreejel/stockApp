import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StockChart from '../../components/chart/StockChart';

function Stock() {
  const router = useRouter();
  const finnhub = require('finnhub');
  const { stockId } = router.query;

  const [apiData, setApiData] = useState();
  const [chartData, setChartData] = useState();
  const [timeInterval, setTimeInterval] = useState('D');

  const handleTimeIntervalChange = (e) => {
    setTimeInterval(e.target.value);
  };

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('userAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
    }

    const getChartData = async () => {
      const { api_key } = finnhub.ApiClient.instance.authentications;
      api_key.apiKey = "cf8e5faad3i8qmbtof20cf8e5faad3i8qmbtof2g";
      const finnhubClient = new finnhub.DefaultApi();

      stockId && finnhubClient.stockCandles(stockId, timeInterval, 1590988249, 1591852249, (error, data, response) => {
        setApiData(data);
      });
    };

    function wrapper(fn) {
      fn();
      return setInterval(fn, 10000);
    }

    let recall = wrapper(getChartData);
    return () => {
      clearInterval(recall);
    }
  }, [stockId, timeInterval]);

  const transformData = (data) => {
    console.log(data, 'data');
    if (data && data !== undefined) {
      if (data.c) {
        const length = data.c.length;
        let result = [];
        let i = 0;
        while (i < length) {
          result.push({
            open: data.o[i],
            high: data.h[i],
            low: data.l[i],
            close: data.c[i]
          })
          i += 1;
        }
        return result;
      }
    }
  };

  useEffect(() => {
    setChartData(transformData(apiData))
  }, [apiData]);

  const handleAddToPortfolioClick = () => {
    const updatedPortfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
    console.log(updatedPortfolio);
    if (!updatedPortfolio.includes(stockId)) {
      updatedPortfolio.push(stockId);
    }
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
    alert('Stock added to portfolio');
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
          <div className='my-5 flex flex-wrap'>
            <span className='text-base font-semibold mr-2'>Select Time Interval</span>
            <select value={timeInterval} onChange={handleTimeIntervalChange} className="bg-[#006ce6] text-white p-2 rounded-md">
              <option value="1">1 Min</option>
              <option value="5">5 Min</option>
              <option value="15">15 Min</option>
              <option value="30">30 Min</option>
              <option value="60">60 Min</option>
              <option value="D">1 Day</option>
              <option value="W">1 Week</option>
              <option value="M">1 Month</option>
            </select>
          </div>
        </div>
        {(apiData && apiData.c) ?
          <div className='flex flex-col sm:px-20'>
            <div className='flex flex-row'>
              <div className='mr-2'>Price</div>
              <div className='flex w-full flex-start border-l border-b overflow-x-scroll'>
                <StockChart data={chartData} />
              </div>
            </div>
            <div className='w-full text-right mt-2'>Time</div>
          </div>
          :
          <div>
            <div className='text-[#006ce6] font-bold text-2xl my-2 mr-2'>
              No data available for this Stock. Please try a different stock
            </div>
            <div> You can try Symbol:AAPL to view chart as some symbol data are not available in free plan</div>
          </div>
        }
      </div>
    </div>
  );
}

export default Stock;
