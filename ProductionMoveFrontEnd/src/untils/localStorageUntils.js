

export const saveItem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item))
    return {
        name: item
    }
}

export const getItem = (name) => {
    if (localStorage[name]) {
        return JSON.parse(localStorage[name])
    }
    return null
}

export const dropItem = (name) => {
    localStorage.removeItem(name)
}