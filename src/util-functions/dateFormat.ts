export function dateFormat(inputDate: string) {
    const date = new Date(inputDate);

    const year = date.getFullYear();

    let month: string | number = date.getMonth() + 1;
    month < 10 ? (month = `0${month}`) : month;

    let day: string | number = date.getDate();
    day < 10 ? (day = `0${day}`) : day;

    return `${year}-${month}-${day}`;
}
