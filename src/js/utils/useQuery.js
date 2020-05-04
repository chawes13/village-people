import { useMemo } from 'react'
import { parse } from 'query-string'

function useQuery() {
  const parsedQuery = useMemo(() => {
    return parse(location.search)
  }, [location.search])
  return parsedQuery
}

export default useQuery
