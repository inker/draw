const date = new Date()
const fullYear = date.getFullYear()
const month = date.getMonth()

export default month < 5 ? fullYear - 1 : fullYear
