export const getTimeObject = (timing)=>{
    let miliseconds = Math.floor(Math.floor(timing % 1000)/10),
        seconds = Math.floor((timing / 1000) % 60),
        minutes = Math.floor((timing / (1000 * 60))% 60),
        hours =  Math.floor(timing / (1000 * 60 * 60))


    return {hours, minutes, seconds, miliseconds}
}
export const getTimeString = (timing)=>{
    const {hours, minutes, seconds, miliseconds} = getTimeObject(timing)
        
    let time = '00:00:00'
    if (hours > 0) {
        time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(miliseconds).padStart(2, '0')}`
    }
    else {
        time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(miliseconds).padStart(2, '0')}`
    }
    return time
}
export const getTimeSinceDate = (timing)=>{
    const now = Date.now(),
        time = new Date(timing).getTime(),
        secondsSinceDate = Math.floor((now - time) / 1000)
        
    switch (true) {
        case (secondsSinceDate < 60):
            return `${secondsSinceDate} secs atras`
        case (secondsSinceDate < 3600):
            const minutes = Math.floor(secondsSinceDate / 60)
            return `${minutes} mins atras`
        case (secondsSinceDate < 86400):
            const hours = Math.floor(secondsSinceDate / 3600)
            return `${hours} horas atras`
        case (secondsSinceDate < 604800):
            const days = Math.floor(secondsSinceDate / 86400)
            return `${days} dias atras`
        case (secondsSinceDate < 2628000):
            const weeks = Math.floor(secondsSinceDate / 604800)
            return `${weeks} semanas atras`
        case (secondsSinceDate < 31536000):
            const months = Math.floor(secondsSinceDate / 2628000)
            return `${months} meses atras`
    
        default:
            const years = Math.floor(secondsSinceDate / 31536000)
            return `${years} anos atras`
    }
}