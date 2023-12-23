import { DEFAULT_PAGE_NO } from '../../utils/apiPath'

export const INITIAL_STATE = {
  isLoading: false,
  page: DEFAULT_PAGE_NO,
  results: [],
  next: true,
  showAddPopup: false,
  actionLoading: false,
  selectedEditUser: null,
  selectedDeleteUser: null,
}

export const tableColumnValues = {
  userName: 'username',
  name: 'name',
  email: 'email',
  contact: 'contact',
  edit: 'edit',
  delete: 'delete',
}

export const columns = [
  { title: 'Name', value: tableColumnValues.name },
  { title: 'Username', value: tableColumnValues.userName },
  { title: 'Email', value: tableColumnValues.email },
  { title: 'Contact', value: tableColumnValues.contact },
  { title: '', value: tableColumnValues.edit },
  { title: '', value: tableColumnValues.delete },
]
