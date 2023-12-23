import { useLocation as reactUseLocation } from 'react-router-dom'

export const useLocation = () => {
  const location = reactUseLocation()

  return { location, currentPath: location.pathname }
}
