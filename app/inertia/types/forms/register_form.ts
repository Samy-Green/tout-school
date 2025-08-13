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
  login: 'kafka',
  last_name: 'Kafka',
  first_name: 'Ibino',
  email: 'superuser@toutschool.cm',
  phone: '685222333',
  password: 'TS_@2025',
  password_confirmation: 'TS_@2025',
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
