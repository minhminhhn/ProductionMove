

export const parseMonths = (products) => {
    const times = []
    products.forEach((product) => {
        const date = new Date(product.purchase.date)
        const index = times.findIndex((time) => time.month == date.getMonth() + 1 && time.year == date.getFullYear())
        if (index != -1) {
            times[index].count += 1
        } else {
            times.push({
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                count: 1
            })
        }
    })

    times.sort((time1, time2) => {
        if (time1.year < time2.year) return -1
        return time1.month - time2.month
    })

    const dataStatistic = []
    times.forEach((time) => {
        dataStatistic.push({
            name: `${time.month}/${time.year}`,
            total: time.count
        })
    })
    return dataStatistic
}


export const parseModels = (products) => {
    const models = []
    products.forEach((product) => {
        const index = models.findIndex((model) => model.name == product.model.name)
        if (index !== -1) {
            models[index].count += 1
        } else {
            models.push({
                name: product.model.name,
                count: 1
            })
        }
    })
    const parseData = [['Model', 'Total']]
    models.forEach((model) => {
        parseData.push([model.name, model.count])
    })
    return parseData
}

export const statisAgency = (products) => {
    const agencies = []
    products.forEach((product) => {
        const index = agencies.findIndex((agency) => agency.name == product.purchase.dealer.name)
        if (index !== -1) {
            agencies[index].count += 1
        } else {
            agencies.push({
                name: product.purchase.dealer.name,
                count: 1
            })
        }
    })
    const parseData = [['Agency', 'Total']]
    agencies.forEach((agency) => {
        parseData.push([agency.name, agency.count])
    })
    return parseData
}