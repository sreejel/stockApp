import React from 'react';

const PortfolioCard = (props) => {
    const { stock, handleViewClick } = props;

    return (
        <div className="flex flex-col rounded-lg bg-white max-w-[250px]  min-w-[200px] min-h-[150px] shadow-lg border border-[#006ce6] sm:mr-4 mb-4 p-4 text-[#1A191C]">
            <div className="my-2 text-lg font-bold text-center">
                {stock}
            </div>
            <button type="button" onClick={handleViewClick} className="bg-[#006ce6] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full sm:ml-4 sm:mt-2">
                View Stock
            </button>
        </div>
    );
}

export default PortfolioCard;
