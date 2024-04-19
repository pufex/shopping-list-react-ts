export const getSetting = (option: string, defaultValue: boolean): boolean => {
    const setting = localStorage.getItem(option);
    if(!setting)
        return defaultValue;
    else
        return JSON.parse(setting);
}