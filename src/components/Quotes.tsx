import axios from "axios";
import { useEffect, useRef, useState } from "react";

import style from './Quotes.module.css'
import refreshIcon from '../assets/desktop/icon-refresh.svg';

type QuotesType = {
    showMoreInfo: boolean
}

export function Quotes ({showMoreInfo}: QuotesType) {
    const [quote, setQuote] = useState<string>();
    const [author, setAuthor] = useState<string>();

    const hasFetched = useRef(false);

    const getQuote = async () => {
        axios.get<QuoteResponse >('https://dummyjson.com/quotes/random')
            .then(res => {
                setQuote(res.data.quote)
                setAuthor(res.data.author)
            })
    }


    useEffect(() => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        getQuote()
    }, [])


    return (
        <div className={showMoreInfo ? style.hidden :style.quote__wrapper}>
            <div className={style.quote__wrapper_text}>
                <div className={style.quote__text}>
                    {quote}
                </div>
                <div className={style.quote__author}>
                    {author}
                </div>
            </div>
            <button onClick={getQuote} className={style.quote__button}>
                <img src={refreshIcon} alt="btn" />
            </button>
        </div>
    )
}

type QuoteResponse  = {
    id: number
    quote: string
    author: string
}