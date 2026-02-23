import arrowUp from '../assets/desktop/icon-arrow-up.svg'
import style from './Button.module.css'

type ButtonProps = {
    onClick: () => void;      
    isExpanded: boolean;      
}

export function Button (props: ButtonProps) {

    function onClick () {
        props.onClick()
    }

    return (
        <button className={style.button} onClick={() => onClick()}>
            {props.isExpanded ? 'LESS' : 'MORE'}
            <img src={arrowUp} alt="arrowUp" className={`${props.isExpanded ? style.button__icon_rotated : ''}`}/>
        </button>
    )
}