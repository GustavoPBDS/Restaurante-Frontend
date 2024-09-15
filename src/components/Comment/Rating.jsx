import styles from './Rating.module.scss'
import StarSvg from '../Icons/StarSvg';
import StarHalf from '../Icons/StarHalf'

const Rating = ({value, setRating}) => {
    const handleClick = (event, rating)=>{
        const { left, width } = event.target.getBoundingClientRect(),
            clickX = event.clientX - left,
            percentage = clickX / width

        if (percentage <= 0.5) {
            setRating(rating - 0.5); 
        } else {
            setRating(rating);
        }
    }

    return (
        <div className={styles.rating_container}>
            {[...Array(5)].map((_, i) => {
                const currentValue = i + 1;
                const isHalfStar = value >= currentValue - 0.5 && value < currentValue;
                const isFullStar = value >= currentValue;

                return (
                    <span key={i} onClick={(e) => handleClick(e,currentValue)} style={{ cursor: 'pointer' }}>
                        {isFullStar 
                            ? <StarSvg full={true}/> 
                            : (isHalfStar 
                                ? <StarHalf/> 
                                : <StarSvg full={false}/>
                            )
                        }
                    </span>
                );
            })}
        </div>
    )
}

export default Rating