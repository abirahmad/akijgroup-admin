export const numberValidation = (number: any) => {
    let isValid = false;
    if (typeof number !== "undefined" && number !== null) {

        if (/^[0-9]+$/.test(number) && number.length >= 11) {
            isValid = true;
            console.log("This is valid number")
        }
        // if (number && number.length >= 11) {
        //     isValid = true;
        // }
    }
    return isValid;
}