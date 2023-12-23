import { toast } from 'react-toastify'

export const useHandleToast = () => {
  const errorMsg = toast.error
  const successMsg = toast.success

  return { errorMsg, successMsg }
}
