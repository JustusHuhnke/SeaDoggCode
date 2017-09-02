export const capitalize = (value: string): string => {
    return value && value[0].toUpperCase() + value.slice(1).toLowerCase();
};

export const clear = (value: string): string => {
    return value && value.replace(/\W/ig, "");
};