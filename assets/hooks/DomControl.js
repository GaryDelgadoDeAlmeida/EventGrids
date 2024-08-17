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

/**
 * Find a parent by class name
 * 
 * @param {*} element 
 * @param {*} className 
 * @returns 
 */
export function findParent(element, className) {

    if(className === undefined) {
        return null
    }

    let e = null
    let elements = []

    while(element) {
        elements.unshift(element)
        element = element.parentNode
        
        if(element !== null && element.classList.contains(className)) {
            e = element
            break
        }
    }

    return e
}