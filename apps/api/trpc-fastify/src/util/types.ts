export type Role = 'admin' | 'manager' | 'user'

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
