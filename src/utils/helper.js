export function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value) {
  return typeof value == 'number' && !isNaN(value)
}

export function isBoolean(value) {
  return value === true || value === false
}

export function isNil(value) {
  return typeof value === 'undefined' || value === null
}
export function toLower(value) {
  if (isString(value)) {
    return value.toLowerCase()
  }
  return value
}
export function filterRows(rows, filters) {
  if (isEmpty(filters)) return rows

  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      const value = row[accessor]
      const searchValue = filters[accessor]

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue))
      }

      if (isBoolean(value)) {
        return (
          (searchValue === 'true' && value) ||
          (searchValue === 'false' && !value)
        )
      }

      if (isNumber(value)) {
        return value == searchValue
      }

      return false
    })
  })
}

export function sortRows(rows, sort) {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort

    if (isNil(a[orderBy])) return 1
    if (isNil(b[orderBy])) return -1

    const aLocale = convertType(a[orderBy])
    const bLocale = convertType(b[orderBy])

    if (order === 'asc') {
      return aLocale.localeCompare(bLocale, 'en', {
        numeric: isNumber(b[orderBy]),
      })
    } else {
      return bLocale.localeCompare(aLocale, 'en', {
        numeric: isNumber(a[orderBy]),
      })
    }
  })
}

export function paginateRows(sortedRows, activePage, rowsPerPage) {
  return [...sortedRows]
    .reverse()
    .slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
}
