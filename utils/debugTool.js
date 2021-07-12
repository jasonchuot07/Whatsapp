const printBug = (...args) => {
    const newArgs = args.forEach(arg => {
        if (typeof arg === 'object') {
            console.dir(arg)
        } else {
            console.table({args})
        }
    })
}

export {printBug}