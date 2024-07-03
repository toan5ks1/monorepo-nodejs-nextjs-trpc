export type Role = 'admin' | 'manager'

export interface Result<T> {
  success: boolean
  data?: T
  code?: number
  message?: string
}

export enum AuthProviderType {
  GOOGLE,
  CREDENTIALS,
}
