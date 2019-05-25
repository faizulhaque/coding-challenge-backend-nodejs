export enum UserRoles {
  ADMIN = 'admin',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  COMPANY = 'company',
  COMPANY_ADMIN = 'company-admin'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISABLED = 'disabled'
}

export enum StatusReason {
  By_ADMIN = 'By_ADMIN',
  By_COMPANY = 'By_COMPANY',
  By_SIGN_UP = 'By_SIGN_UP',
  By_UPDATE = 'By_UPDATE'
}
