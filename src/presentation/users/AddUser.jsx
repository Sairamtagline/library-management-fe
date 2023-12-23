import { FormLabel } from '@mui/material'
import { values } from 'ramda'
import React, { Fragment, memo } from 'react'

import addUserContainer from '../../container/users/addUser.container'
import { fields } from '../../description/users/addUser.description'
import MButton from '../../shared/MButton'
import MInput from '../../shared/MInput'
import MLoader from '../../shared/MLoader'
import MModal from '../../shared/MModal'
import MStack from '../../shared/MStack'
import { ADD, CANCEL, EDIT } from '../../utils/constant'
import { areEqualProps, ternary } from '../../utils/javascript'

const AddUser = ({ onClose, title, data }) => {
  const { addUser, actionLoading, onInputChange, onAdd, onEdit } =
    addUserContainer(data)

  return (
    <MModal open={true} handleClose={onClose} title={title}>
      <form onSubmit={ternary(data, onEdit, onAdd)}>
        {fields.map((field, index) =>
          ternary(
            !data || (!field.hideOnEdit && data),
            <Fragment key={index}>
              <FormLabel sx={{ color: 'white.main', mb: 1, display: 'block' }}>
                {field.label}
              </FormLabel>
              <MInput
                variant={'filled'}
                placeholder={field.placeholder}
                name={field.name}
                sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: 15 } }}
                value={addUser.form[field.name]}
                onChange={e => onInputChange(e, field.pattern)}
                error={ternary(addUser.errors?.[field.name], true, false)}
                helperText={addUser.errors?.[field.name]}
                type={field.type}
              />
            </Fragment>,
            null,
          ),
        )}

        <MStack direction="row" spacing={2}>
          <MButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              values(addUser.errors).some(value => value) || actionLoading
            }
            onClick={ternary(data, onEdit, onAdd)}
          >
            {ternary(
              actionLoading,
              <>
                {ternary(data, EDIT, ADD)}
                <MLoader sx={{ ml: 1 }} size={20} color="secondary" />
              </>,
              ternary(data, EDIT, ADD),
            )}
          </MButton>
          <MButton
            variant="outlined"
            color="primary"
            onClick={onClose}
            disabled={actionLoading}
          >
            {CANCEL}
          </MButton>
        </MStack>
      </form>
    </MModal>
  )
}

export default memo(AddUser, areEqualProps)
