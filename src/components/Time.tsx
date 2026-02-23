import axios from "axios"
import { useEffect, useRef, useState } from "react"

import style from './Time.module.css'
import sunIcon from '../assets/desktop/icon-sun.svg'; 
import moonIcon from '../assets/desktop/icon-moon.svg'; 
import { Button } from "./Button";

type TimeProps = {
    getInfo: (timeZone: string) => void
    toggleMoreInfo: () => void;  
    isMoreOpen: boolean;  
}

export function Time (props: TimeProps) {
    const hasFetched = useRef(false);
    
    
    const [greeting, setGreeting] = useState<string>();
    const [time, setTime] = useState('');
    const [timezone, setTimezone] = useState<string>()
    const [img, setImg] = useState<string>()

    const [country, setCountry] = useState<string>()
    const [city, setCity] = useState<string>()

    const [isNight, setIsNight] = useState(false);


    function getLocation () {
        axios.get('http://ip-api.com/json/')
            .then(res => {

                setCountry(res.data.country)
                setCity(res.data.city)
                setTimezone(res.data.timezone)
            }) 
    }

    useEffect(() => {
        if (!timezone) return;
        props.getInfo(timezone)

        function updateTimeAndGreeting () {
            const now = new Date()

            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone: timezone,
                hour: '2-digit',    
                minute: '2-digit',
                hour12: false   
            }

            setTime(now.toLocaleTimeString('en-US', timeOptions))

            const hour = parseInt(now.toLocaleTimeString('en-US', {
                timeZone: timezone, 
                hour: '2-digit',    
                hour12: false   
            }))

            const isNightTime = hour >= 18 || hour < 5;
            setIsNight(isNightTime);

            if(hour >= 5 && hour < 12) {
                setGreeting('Good morning')
                setImg(sunIcon)
            } else if (hour >= 12 && hour < 18) {
                setGreeting('Good afternoon')
                setImg(sunIcon)
            } else {
                setGreeting('Good evening')
                setImg(moonIcon)
            }
        }

        updateTimeAndGreeting()

        const timer = setInterval(updateTimeAndGreeting, 1000)
        return () => clearInterval(timer)

    }, [timezone])

    useEffect(() => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        getLocation()
    }, [])

    useEffect(() => {
        if (isNight) {
            document.body.classList.add('night');
            document.body.classList.remove('day');
        } else {
            document.body.classList.add('day');
            document.body.classList.remove('night');
        }

        return () => {
            document.body.classList.remove('day', 'night');
        };
    }, [isNight]);

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.time__wrapper}>
                    <div className={style.greeting__wrapper}>
                        <img className={style.img} src={img} alt="" />
                        <div className={style.greeting}>{greeting}, IT’S CURRENTLY</div>
                    </div>
                    <div className={style.time}>{time}</div>
                    <div className={style.location}>IN {country}, {city}</div>
                </div>
                <Button onClick={props.toggleMoreInfo} isExpanded={props.isMoreOpen} />
            </div>
        </>

    )
}

