export function getLastReadFormatted(date: Date) {
    return date.getDate().toString().padStart(2, "0") + "/" +
           (date.getMonth() + 1).toString().padStart(2, "0") + "/" +
           date.getFullYear().toString() + " " +
           date.getHours().toString().padStart(2, "0") + ":" +
           date.getMinutes().toString().padStart(2, "0") + ":" +
           date.getSeconds().toString().padStart(2, "0");
}

export function getScheduleFormatted(date: Date) {
    return date.getDate().toString().padStart(2, "0") + "/" +
           (date.getMonth() + 1).toString().padStart(2, "0") + " " +
           getHourFormatted(date);
}

export function isDSTDate(date: Date) {
    const month = date.getMonth() + 1;
    return 4 <= month && month <= 10;
}

export function getHourFormatted(date: Date) {
    return (date.getHours() + (isDSTDate(date)? 1 : 0)).toString().padStart(2, "0") + ":" +
           date.getMinutes().toString().padStart(2, "0");
}

export function dayDifference(a : Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function hourDifference(a : Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function isInBetweenDates(a: Date, b: Date, c: Date) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());
    const utc3 = Date.UTC(c.getFullYear(), c.getMonth(), c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds());

    return utc2 <= utc1 && utc1 < utc3;
}