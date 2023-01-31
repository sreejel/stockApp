import React from 'react';
import { FixedSizeList } from 'react-window';

const StockListing = (
    props
) => {
    const { listingData, handleStockClick } = props;
    const data = listingData ? Object.values(listingData) : {};

    if (!listingData) {
        return (
            <div className='animate-bounce w-full h-full flex justify-center items-center'>
                <img src={'https://shopr.imgix.net/web/shopr_logo_big.png?w=256&auto=format'} />
            </div>)
    }

    const Row = ({ index }) => {
        const displayData = Object.values(data[index]);
        return (
            <button className='w-full text-sm flex flex-col border shadow-lg my-2 p-2 pl-4'
                onClick={() => handleStockClick(displayData)}>
                <div>
                    <span className='text-sm font-semibold mr-2'>Symbol:</span>
                    <span className='text-[#006ce6]'>{displayData[2]}</span>
                </div>
                <div>
                    <span className='text-sm font-semibold mr-2'>Description</span>
                    <span className='text-[#006ce6]' >{displayData[0]}</span>
                </div>
            </button>
        )
    };

    return (
        <div className='w-full h-full'>
            <div className='overflow-x-scroll sm:overflow-hidden'>
                {data &&
                    <FixedSizeList
                        className="List"
                        height={600}
                        width={2000}
                        itemSize={20}
                        itemCount={data?.length}
                        itemData={{ data }}
                    >
                        {Row}
                    </FixedSizeList>
                }
            </div>
        </div>
    )
};

export default StockListing;