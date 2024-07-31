/**
 * 
 * @param {*} value 
 * @returns 
 */
export function ucwords(value) {
    return (value + '').replace(/^(.)|\s+(.)/g, function ($1) {
        return $1.toUpperCase()
    })
}