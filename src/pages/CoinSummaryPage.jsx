import React from 'react';
import AddCoin from '../components/AddCoin';
import CoinList from '../components/CoinList';

class CoinSummaryPage extends React.Component {
    render() { 
        return (
        <div  className="coinsummary shadow border p-2 rounded mt-2 bg-light">
            <AddCoin />
            <CoinList />
        </div>);
    }
}
 
export default CoinSummaryPage;