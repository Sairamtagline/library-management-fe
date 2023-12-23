import {
  contact,
  email,
  EMPTY_VALUE,
  name,
  notEmptyOrNull,
  number,
  password,
  userName,
} from '../../utils/constant'

export const addUserTitle = 'Add User'

export const editUserTitle = 'Edit User'

export const INITIAL_STATE = {
  form: {
    [email]: EMPTY_VALUE,
    [password]: EMPTY_VALUE,
    [name]: EMPTY_VALUE,
    [userName]: EMPTY_VALUE,
    [contact]: EMPTY_VALUE,
  },
  errors: {},
}

export const fields = [
  {
    label: 'User Name',
    placeholder: 'Enter username',
    pattern: notEmptyOrNull,
    name: userName,
  },
  {
    label: 'Name',
    placeholder: 'Enter name',
    pattern: notEmptyOrNull,
    name: name,
  },
  {
    label: 'Email',
    placeholder: 'Enter email',
    pattern: email,
    name: email,
  },
  {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    pattern: number,
    name: contact,
  },
  {
    label: 'Password',
    placeholder: 'Enter password',
    pattern: password,
    name: password,
    type: password,
    hideOnEdit: true,
  },
]

export const userAdded = 'User added successfully'

export const userUpdated = 'User updated successfully'

export const userRemoved = 'User removed successfully'
