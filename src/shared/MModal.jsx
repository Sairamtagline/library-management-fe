import { Modal, Typography } from '@mui/material'

import { MUIStyled } from '../utils/muiStyled'
import MBox from './MBox'
import MTypography from './MTypography'

const ModalWrapper = MUIStyled(MBox)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  margin: 'auto',
  backgroundColor: theme.palette.primary.blue,
  boxShadow: 20,
  padding: 20,
  borderRadius: 10,
}))
const ModalHeading = MUIStyled(MTypography)(({ theme }) => ({
  fontSize: 24,
  lineHeight: '28px',
  fontWeight: '700',
  color: theme.palette.black.main,
}))

const MModal = ({ open, handleClose, title, children }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgb(69 69 73 / 62%)',
            },
          },
        }}
      >
        <ModalWrapper>
          <ModalHeading
            sx={{ color: 'white.main' }}
            id="modal-modal-title"
            variant="h4"
          >
            {title}
          </ModalHeading>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export default MModal
