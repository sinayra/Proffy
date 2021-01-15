export function convertTimeStringToMinute(value: string){
    const timeArr = value.split(':');

    return (+timeArr[0] * 60 + (+timeArr[1]));
}