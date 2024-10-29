import { monthNames } from "../constants/appInfos";

export class HandleDateTime {
    static DateString = (date: Date) => {

        return `${monthNames[date.getMonth()]} ${date.getDate()}`;
    };

    static GetHour = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();

        // Determine AM/PM suffix
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert hours from 24-hour format to 12-hour format
        hours = hours % 12; // convert to 12-hour format
        hours = hours ? hours : 12; // the hour '0' should be '12'

        return `${hours} ${ampm}`;
    }
}