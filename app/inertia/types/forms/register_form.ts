export interface RegisterFormData {
  login: string
  last_name: string
  first_name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
}

export interface RegisterFormErrors {
  login?: string
  last_name?: string
  first_name?: string
  email?: string
  phone?: string
  password?: string
  password_confirmation?: string
}

export const defaultRegisterFormDatas = {
  login: 'test',
  last_name: 'test',
  first_name: 'test',
  email: 'test@test.test',
  phone: '685222333',
  password: '123456789',
  password_confirmation: '123456789',
}

export const defaultRegisterFormErrors = {
  login: '',
  last_name: '',
  first_name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
}
