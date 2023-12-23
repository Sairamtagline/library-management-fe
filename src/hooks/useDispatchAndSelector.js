import { useDispatch, useSelector } from 'react-redux'

const useDispatchAndSelector = () => {
  const dispatch = useDispatch()
  const cusDispatch = params => {
    dispatch(params)
  }
  const cusSelector = params => useSelector(params)

  return { cusDispatch, cusSelector }
}

export default useDispatchAndSelector
