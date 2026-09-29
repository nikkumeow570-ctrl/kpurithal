import { useEffect, useState } from 'react'
export const useLS = (k, init) => {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(k)) ?? init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }, [k, v])
  return [v, setV]
}
