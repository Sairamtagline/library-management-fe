import { useNavigate as reactUseNavigate } from 'react-router-dom'

export const useNavigate = () => {
  const navigate = reactUseNavigate()

  return { navigate }
}
