export default class Utils{
    static getFormatedDataString(dateObj){
        let diff = Math.floor((new Date() - dateObj) / 1000);
        if (diff < 86400){
            if (diff < 60){ // if difference is less than one minute
                let sec = diff;
                return sec + " " + (sec == 1 ? "second" : "seconds") + " ago";
            }else if (diff < 3600){ // if difference is less than an hour
                let min = Math.floor(diff / 60);
                return min + " " + (min == 1 ? "minute" : "minutes") + " ago";
            }else{
                let hour = Math.floor(diff / 3600);
                return hour + " " + (hour == 1 ? "hour" : "hours") + " ago";
            }
        }
        else {
            const months = ["Jan", "Feb", "Mar","April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let current_datetime = dateObj;
            let formatted_date = months[current_datetime.getMonth()] + " " + current_datetime.getDate() + ", " + current_datetime.getFullYear();
            return formatted_date;
        }
    }
}