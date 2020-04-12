import { reduce, isEmpty, filter } from 'lodash'

function filterObjectValues(
  object,
  predicate,
  { keepEmptyOptions = false } = {}
) {
  return reduce(
    object,
    (acc, values, key) => {
      const filteredValues = filter(values, predicate)
      if (!keepEmptyOptions && isEmpty(filteredValues)) return acc

      acc[key] = filteredValues
      return acc
    },
    {}
  )
}

export default filterObjectValues
