import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    const defaultList = ["bitcoin", "ethereum", "ripple", "litecoin"];

    var coinsList = null;

    if (localStorage.getItem("watList") != null) {
        coinsList = localStorage.getItem("watList").split(",");
    } else {
        coinsList = defaultList;
    }

    const [watchList, setWatchList] = useState(coinsList);

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    const deleteCoin = (coin) => {
        setWatchList(
            watchList.filter((el) => {
                return el !== coin;
            })
        );
    };

    const addCoin = (coin) => {
        if (watchList.indexOf(coin) === -1) {
            setWatchList([coin, ...watchList]);
        }
    };

    return (
        <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin }}>
            {props.children}
        </WatchListContext.Provider>
    );
};
