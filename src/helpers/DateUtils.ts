export function GetMonthCode(month: number, getCodeForShort: boolean = false) : string {
    switch(month){
        case 0:
            if(!getCodeForShort) return "JanuaryName";
            else return "JanuaryShort";
        case 1:
            if(!getCodeForShort) return "FebruaryName";
            else return "FebruaryShort";
        case 2:
            if(!getCodeForShort) return "MarchName";
            else return "MarchShort";
        case 3:
            if(!getCodeForShort) return "AprilName";
            else return "AprilShort";
        case 4:
            if(!getCodeForShort) return "MayName";
            else return "MayShort";
        case 5:
            if(!getCodeForShort) return "JuneName";
            else return "JuneShort";
        case 6:
            if(!getCodeForShort) return "JulyName";
            else return "JulyShort";
        case 7:
            if(!getCodeForShort) return "AugustName";
            else return "AugustShort";
        case 8:
            if(!getCodeForShort) return "SeptemberName";
            else return "SeptemberShort";
        case 9:
            if(!getCodeForShort) return "OctoberName";
            else return "OctoberShort";
        case 10:
            if(!getCodeForShort) return "NovemberName";
            else return "NovemberShort";
        case 11:
            if(!getCodeForShort) return "DecemberName";
            else return "DecemberShort";
        default:
            return "GetMonthCodeError";
    }
}

export function IsDatesEqual(first: Date | undefined, second: Date | undefined) : boolean {
    if(!first || !second) return false;

    return first.getDate() === second.getDate() &&
        first.getMonth() === second.getMonth() &&
        first.getFullYear() === second.getFullYear();
}

export const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

export function daysBetweenDates(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
}