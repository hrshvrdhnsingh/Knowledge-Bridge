// Here date could be in numeric format or a timestamp and this converts it to July 14 2025
// accroding to the en-US standards. 
export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}