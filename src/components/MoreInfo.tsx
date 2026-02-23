import { useEffect, useState } from 'react'
import style from './MoreInfo.module.css'
import axios from 'axios'

type MoreInfoProps = {
    timezone: string
} 


export function MoreInfo ({timezone}: MoreInfoProps) {

    const [weekNumber, setWeekNumber] = useState<string>()
    const [dayOfWeek, setDayOfWeek] = useState<string>()
    const [dayOfYear, setDayOfYear] = useState<string>()

    useEffect(() => {
        if (!timezone) return;
        
        axios.get(`https://time.now/developer/api/timezone/${timezone}`)
            .then(res => {
                setWeekNumber(res.data.week_number)
                setDayOfWeek(res.data.day_of_week)
                setDayOfYear(res.data.day_of_year)
            })
    }, [timezone])

    return (
        <div className={style.moreInfo__wrapper}>
            <div className={style.moreInfo__wrapper_item}>
                <div>
                    <div className={style.moreInfo__descr}>CURRENT TIMEZONE</div>
                    <div className={style.moreInfo__text}>{timezone}</div>
                </div>
                <div>
                    <div className={style.moreInfo__descr}>Day of the year</div>
                    <div className={style.moreInfo__text}>{dayOfYear}</div>
                </div>
            </div>
            <span className={style.line}></span>
            <div className={style.moreInfo__wrapper_item}>
                <div>
                    <div className={style.moreInfo__descr}>Day of the week</div>
                    <div className={style.moreInfo__text}>{dayOfWeek}</div>
                </div>
                <div>
                    <div className={style.moreInfo__descr}>Week number</div>
                    <div className={style.moreInfo__text}>{weekNumber}</div>
                </div>
            </div>
        </div>
    )
}