import { roles } from "./constant"

const isSold = (products) => {
    return products.every(product =>{
        const holders = product.holders
        return Boolean(holders.customer)
    })
}

// product can maintain or recall: is sold (exist customer) & now at agency (??????)
const canMaintainOrRecall = (products) => {
    console.log("products")
    console.log(products)
    return products.every((product) => {
        const holders = product.holders
        console.log(product)
        console.log(holders.customer)
        console.log(holders.nowAt)
        console.log(holders.willAt)
        // return !holders.nowAt && !holders.willAt
        return holders.customer && !holders.willAt
    })
}

export const canMaintain = (products) => {
    if (products.length === 0) return false
    return products.every((product) => {
        const holders = product.holders
        return !holders.nowAt && !holders.willAt
    })
}

export const canRecall = (products) => {
    if (products.length === 0) return false
    return products.every((product) => {
        const holders = product.holders
        return !holders.nowAt && !holders.willAt
    })
}

export const canReturn = (products, account) => {
    if (products.length === 0) return false
    return products.every((product) => {
        const holders = product.holders
        const isSold = holders.customer
        const isIn = holders?.nowAt && holders?.nowAt.id === account.id
        const isShipping = holders?.nowAt && holders?.willAt
        return isSold && isIn && !isShipping
    })
}

export const canPurchase = (products, account) => {
    if (products.length === 0 || products.length > 1) return false
    return products.every((product) => {
        const holders = product.holders
        const isSold = holders.customer
        const isIn = holders?.nowAt && holders?.nowAt.id === account.id
        const isShipping = holders?.nowAt && holders?.willAt
        return !isSold && isIn && !isShipping
    })
}

// // product can export: is sold (exist customer) & now at factory (?: làm sao biết holders.nowAt là factory hay ko?)
// const canExport = (products) => {
//     console.log("products")
//     console.log(products)
//     return products.every((product) => {
//         console.log("product")
//         console.log(product)
//         const holders = product.holders
//         console.log(holders.customer)
//         console.log(holders.nowAt)
//         console.log(Boolean(holders.customer && holders.nowAt))
//         return holders.customer && !holders.nowAt
//     })
// }
export const canExport = (products, account) => {
    if (products.length === 0) return false
    return products.every((product) => {
        const holders = product.holders
        // Product already sold and now at factory due to error or recall
        const isEndLife = holders?.nowAt && holders?.nowAt.role === roles.FACTORY && holders?.customer

        // Product can be now shipping and not in partner
        const isShipping = holders?.nowAt && holders?.willAt

        // Product is now at partner
        const isIn = holders?.nowAt && holders?.nowAt.id === account.id

        return !isEndLife && !isShipping && isIn
    })
}

export const canConfirm = (products, account) => {
    if (products.length === 0) return false
    return products.every((product) => {
        const holders = product.holders
        return holders?.willAt && holders.willAt.id === account.id
    })
}