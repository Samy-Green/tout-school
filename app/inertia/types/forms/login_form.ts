export interface LoginFormData {
  login: string
  password: string
}

export interface LoginFormErrors {
  login?: string
  password?: string
}

export const defaultLoginFormDatas = {
  login: 'kafka',
  password: 'TS_@2025',
}
export const defaultLoginFormErrors = {
  login: '',
  password: '',
}
