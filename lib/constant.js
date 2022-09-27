'use strict';

module.exports = {
  API: {
    BASE_PATH: '/api'
  },
  JWT: {
    ISSUER: 'deedmed',
    AUDIENCE: 'deedmed',
    EXPIRES_IN: '30d'
  },
  LOGGER: {
    INFO: 'info',
    ERROR: 'error'
  },
  HTTP_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500
  },
  ERRORS: {
    SERVER_ERROR: 'ServerError',
    VALIDATION_ERROR: 'ValidationError',
    AUTHENTICATION_ERROR: 'AuthenticationFailError',
    AUTHORIZATION_ERROR: 'AuthorizationFailError',
    NOT_FOUND_ERROR: 'NotFoundError',
  },
  MESSAGES: {
    SOMETHING_WENT_WRONG: 'Something went wrong',
    USER_CREATED: 'User created successfully',
    PHARMACY_REGISTERED: 'Pharmacy registered successfully',
    AUTHENTICATION_FAILED: 'Authentication failed',
    AUTHENTICATION_TOKEN_REQUIRED: 'Authentication token is required',
    AUTHENTICATION_TOKEN_EXPIRED: 'Authentication token has expired',
    AUTHORIZATION_FAILED: 'Authorization failed',
    SEND_OTP_SUCCESS: 'OTP sent successfully',
    SEND_OTP_FAILED: 'OTP sending failed',
    INVALID_OTP: 'Invalid OTP',
    EXPIRED_OTP: 'Expired OTP',
    INVALID_CREDENTIALS: 'Invalid credentials',
    INVALID_EMAIL_VERIFICATION_CODE: 'Invalid email verification code',
    EXPIRED_EMAIL_VERIFICATION_CODE: 'Expired email verification code',
    INVALID_FILE_FORMAT_IMAGE: 'File extension not allowed',
    ADMIN_SIGN_IN_SUCCESS: 'Admin signed in successfully',
    DOCTOR_SIGN_IN_SUCCESS: 'Doctor signed in successfully',
    PATIENT_SIGN_IN_SUCCESS: 'Patient signed in successfully',
    PHARMACY_SIGN_IN_SUCCESS: 'Pharmacy signed in successfully',
    GOOGLE_SIGN_IN_SUCCESS: 'Google sign in success',
    GOOGLE_SIGN_UP_SUCCESS: 'Google sign up success',
    GOOGLE_SIGN_UP_FAILED: 'Google sign up failed',
    FACEBOOK_SIGN_IN_SUCCESS: 'Facebook sign in success',
    FACEBOOK_SIGN_UP_SUCCESS: 'Facebook sign up success',
    FACEBOOK_SIGN_UP_FAILED: 'Facebook sign up failed',
    PATH_PARAMETER_MISSING_DOCTOR_ID: 'Doctor id path parameter is required',
    PATH_PARAMETER_MISSING_PATIENT_ID: 'Patient id path parameter is required',
    PATH_PARAMETER_MISSING_PHARMACY_ID: 'Pharmacy id path parameter is required',
    PATH_PARAMETER_MISSING_APPOINTMENT_ID: 'Appointment id path parameter is required',
    PATH_PARAMETER_MISSING_PHARMACY_ORDER_ID: 'Pharmacy order id path parameter is required',
    PATH_PARAMETER_MISSING_DATE: 'Date path parameter is required',
    ADMIN_NOT_FOUND: 'Admin not found',
    USER_NOT_FOUND: 'User not found',
    DOCTOR_NOT_FOUND: 'Doctor not found',
    PATIENT_NOT_FOUND: 'Patient not found',
    PHARMACY_NOT_FOUND: 'Pharmacy not found',
    PHARMACY_ORDER_NOT_FOUND: 'Pharmacy order not found',
    PATIENT_FAVOURITE_DOCTOR_NOT_FOUND: 'Favourite doctor not found',
    PATIENT_FAVOURITE_PHARMACY_NOT_FOUND: 'Favourite pharmacy not found',
    DOCTORS_GET_SUCCESS: 'Doctors retrieved successfully',
    PATIENTS_GET_SUCCESS: 'Patients retrieved successfully',
    PHARMACIES_GET_SUCCESS: 'Pharmacies retrieved successfully',
    DOCTOR_GET_BY_ID_SUCCESS: 'Doctor retrieved by id successfully',
    PATIENT_GET_BY_ID_SUCCESS: 'Patient retrieved by id successfully',
    PHARMACY_GET_BY_ID_SUCCESS: 'Pharmacy retrieved by id successfully',
    DOCTOR_GET_PROFILE_SUCCESS: 'Doctor profile retrieved successfully',
    PATIENT_GET_PROFILE_SUCCESS: 'Patient profile retrieved successfully',
    PHARMACY_GET_PROFILE_SUCCESS: 'Pharmacy profile retrieved successfully',
    PATIENT_UPDATE_PROFILE_SUCCESS: 'Patient profile updated successfully',
    DOCTOR_UPDATE_PROFILE_SUCCESS: 'Doctor profile updated successfully',
    DOCTOR_UPDATE_SUCCESS: 'Doctor details updated successfully',
    PHARMACY_UPDATE_PROFILE_SUCCESS: 'Pharmacy profile updated successfully',
    AVAILABILITY_ADD_SUCCESS: 'Availability added successfully',
    AVAILABILITY_GET_SUCCESS: 'Availability retrieved successfully',
    APPOINTMENT_CREATE_SUCCESS: 'Appointment created successfully',
    APPOINTMENT_UPDATE_SUCCESS: 'Appointment updated successfully',
    APPOINTMENT_GET_BY_PATIENT_ID_SUCCESS: 'Appointment retrieved by patient id successfully',
    APPOINTMENT_GET_BY_DOCTOR_ID_SUCCESS: 'Appointment retrieved by doctor id successfully',
    APPOINTMENT_GET_BY_ID_SUCCESS: 'Appointment retrieved by id successfully',
    CATEGORY_ICON_IS_REQUIRED: 'Category icon is required',
    CATEGORY_CREATE_SUCCESS: 'Category created successfully',
    CATEGORIES_GET_SUCCESS: 'Categories retrieved successfully',
    PHARMACY_ORDER_CREATE_SUCCESS: 'Pharmacy order created successfully',
    PHARMACY_ORDERS_GET_BY_PATIENT_ID_SUCCESS: 'Pharmacy orders retrieved by patient id successfully',
    PHARMACY_ORDERS_GET_SUCCESS: 'Pharmacy orders retrieved successfully',
    PHARMACY_ORDERS_GET_BY_PHARMACY_ID_SUCCESS: 'Pharmacy orders retrieved by pharmacy id successfully',
    PHARMACY_ORDER_GET_BY_ID_SUCCESS: 'Pharmacy orders retrieved by id successfully',
    PHARMACY_ORDER_UPDATE_SUCCESS: 'Pharmacy orders updated successfully',
    VALIDATING_EXISTING_USERS_SUCCESS: 'Existing users validated successfully',
    VALIDATING_EXISTING_DOCTORS_SUCCESS: 'Existing doctors validated successfully',
    VALIDATING_EXISTING_PATIENTS_SUCCESS: 'Existing patients validated successfully',
    VALIDATING_EXISTING_PHARMACIES_SUCCESS: 'Existing pharmacies validated successfully',
    PATIENT_FAVOURITE_DOCTOR_ADD_SUCCESS: 'Favourite doctor added successfully',
    PATIENT_FAVOURITE_DOCTOR_REMOVE_SUCCESS: 'Favourite doctor removed successfully',
    PATIENT_FAVOURITE_DOCTOR_NOT_FOUND_SUCCESS: 'Favourite doctor not found',
    PATIENT_FAVOURITE_DOCTOR_GET_SUCCESS: 'Favourite doctors retrieved successfully',
    PATIENT_FAVOURITE_PHARMACY_ADD_SUCCESS: 'Favourite pharmacy added successfully',
    PATIENT_FAVOURITE_PHARMACY_REMOVE_SUCCESS: 'Favourite pharmacy removed successfully',
    PATIENT_FAVOURITE_PHARMACY_GET_SUCCESS: 'Favourite pharmacies retrieved successfully',
    TEST_ORDER_CREATE_SUCCESS: 'Test order created successfully',
    TEST_ORDER_GET_SUCCESS: 'Test order retrieved successfully',
    MEDICAL_CERTIFICATE_CREATE_SUCCESS: 'Medical certificate created successfully',
    REFERRAL_CREATE_SUCCESS: 'Referral created successfully',
    PRESCRIPTIONS_CREATE_SUCCESS: 'Prescriptions created successfully',
    EMAIL_VERIFICATION_CODE_SEND_SUCCESS: 'Email verification code sent successfully',
    EMAIL_VERIFICATION_CODE_VERIFY_SUCCESS: 'Email verification code verified successfully',
    UPDATE_PASSWORD_SUCCESS: 'Password updated successfully',
    NO_PROFILE_IMAGE_TO_UPLOAD: 'No profile image to upload',
    PROFILE_IMAGE_UPLOAD_SUCCESS: 'Profile image uploaded successfully',
    DOCTOR_ADDED_SUCCESS: 'Doctor added successfully',
    PATIENT_ADDED_SUCCESS: 'Patient added successfully',
    APPOINTMENTS_GET_SUCCESS: 'Appointments retrieved successfully',
    PHARMACY_ADDED_SUCCESS: 'Pharmacy added successfully',
    PHARMACY_UPDATED_SUCCESS: 'Pharmacy updated successfully',
    CANNOT_CANCEL_NON_FUTURE_APPOINTMENTS: 'You can only cancel the future appointments only',
    // Notification Messages
    NOTIFICATION_CREATE_SUCCESS: 'Notification Saved to DB',
    NOTIFICATION_CREATE_FAILED: 'Notification Not Saved to DB',
    // Payment Messages
    PAYMENT_CREATE_SUCCESS: 'Payment Created',
    PAYMENT_CREATE_FAILED: 'Payment Not Created',
    PAYMENT_UPDATE_SUCCESS: 'Payment updated',
    PAYMENT_UPDATE_FAILED: 'Payment not updated',
  },
  ENVS: {
    LOCAL: 'local',
    DEV: 'dev',
    STG: 'stg',
    PROD: 'prod',
  },
  USER_TYPES: {
    ADMIN: 'ADMIN',
    GUARDIAN: 'GUARDIAN',
    PATIENT: 'PATIENT',
    GUARDIAN_PATIENT: 'GUARDIAN_PATIENT',
    DOCTOR: 'DOCTOR',
    PHARMACY: 'PHARMACY'
  },
  GENDER: {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
  },
  SERVICE_AREAS_DOCTOR: {
    ONLINE: 'ONLINE',
    PRIVATE_CLINIC: 'PRIVATE_CLINIC',
    HOME_VISITING: 'HOME_VISITING',
  },
  SERVICE_AREAS_PHARMACY: {
    HOME_DELIVERY: 'HOME_DELIVERY',
    ON_SIGHT: 'ON_SIGHT',
    BOTH: 'BOTH',
  },
  SPECIAL_AVAILABILITY_TYPES: {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE'
  },
  SLOT_TYPES: {
    MORNING: 'MORNING',
    EVENING: 'EVENING'
  },
  APPOINTMENT_TYPES: {
    ONLINE: 'ONLINE',
    PHYSICAL: 'PHYSICAL'
  },
  APPOINTMENT_STATUS: {
    PENDING: 'PENDING',
    ONGOING: 'ONGOING',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
  },
  AWS_S3_EXPIRES: {
    SYSTEM_FILES: 86400,
    PATIENT_APPOINTMENT_ATTACHMENT: 3600,
    PATIENT_APPOINTMENT_PRESCRIPTION: 3600,
    PATIENT_PHARMACY_ORDER_ATTACHMENT: 3600,
    USER_PROFILE_IMAGE: 604800,
  },
  FIELDS: {
    EMAIL: 'EMAIL',
    PHONE_NUMBER: 'PHONE_NUMBER',
  },
  PHARMACY_ORDER_STATUS: {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    SHIPPING: 'SHIPPING',
    DELIVERED: 'DELIVERED',
  },
  NOTIFICATION_STATUS: {
    NOTIFICATION_CREATED: '1',
    NOTIFICATION_QUEUED: '2',
    NOTIFICATION_SENT_TO_GW: '3',
  },
  NOTIFICATION_TEMPALTE_STATUS: {
    ACTIVE: '1',
    INACTIVE: '0',
  },
  NOTIFICATION_GROUP_STATUS: {
    ACTIVE: '1',
    INACTIVE: '0',
  },
  NOTIFICATION_CHANNEL: {
    ACTIVE: '1',
    INACTIVE: '0',
  },
  PRESCRIPTION_TYPE: {
    TABLET: 'TABLET',
    SYRUP: 'SYRUP',
    TOPICAL: 'TOPICAL',
  },
  AUTH_PROVIDER: {
    EMAIL_PASSWORD: 'EMAIL_PASSWORD',
    GOOGLE: 'GOOGLE',
    FACEBOOK: 'FACEBOOK',
  },
  PAYMENT_TYPE: {
    FULL: 'FP',
    PARTIAL: 'PP',
  },
  PAYMENT_MEDIA: {
    PAYHERE: 'PAYHERE'
  },
  PAYMENT_TXN_STATUS: {
    SUCCESS: 'Y',
    FAILED: 'N'
  },
  PAYMENT_CATEGORY: {
    APPOINMENT: 'APPOINMENT'
  },
  PAYMENT_STATUS: {
    ACTIVE: '1',
    INACTIVE: '0'
  },
  TIME_FILTER: {
    ALL: 'ALL',
    FUTURE: 'FUTURE',
    PRESENT: 'PRESENT',
    PAST: 'PAST',
  }
};
