import { useState } from 'react';

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  emailOrPhone?: string;
  oldPassword?: string;
  newPassword?: string;
}

const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (field: keyof ValidationErrors, value: string, otherValues?: Partial<ValidationErrors>) => {
    const newErrors: ValidationErrors = { ...errors };

    switch (field) {
      case 'fullName':
        if (value.trim() === '') {
          newErrors.fullName = 'Full Name is required';
        } else {
          delete newErrors.fullName;
        }
        break;

      case 'email':
        if (value.trim() === '') {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email address is invalid';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phoneNumber':
        if (value.trim() === '') {
          newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(value)) {
          newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      case 'emailOrPhone':
        if (value.trim() === '') {
          newErrors.emailOrPhone = 'Email or Phone Number is required';
        } else if (!/\S+@\S+\.\S+/.test(value) && !/^\d{10}$/.test(value)) {
          newErrors.emailOrPhone = 'Email or Phone Number is invalid';
        } else {
          delete newErrors.emailOrPhone;
        }
        break;

      case 'password':
        if (value.trim() === '') {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value.trim() === '') {
          newErrors.confirmPassword = 'Confirm Password is required';
        } else if (value !== otherValues?.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'oldPassword':
        if (value.trim() === '') {
          newErrors.oldPassword = 'Old Password is required';
        } else {
          delete newErrors.oldPassword;
        }
        break;

      case 'newPassword':
        if (value.trim() === '') {
          newErrors.newPassword = 'New Password is required';
        } else if (value.length < 6) {
          newErrors.newPassword = 'New Password must be at least 6 characters';
        } else if (value === otherValues?.oldPassword) {
          newErrors.newPassword = 'New password cannot be the same as old password';
        } else {
          delete newErrors.newPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return !(field in newErrors);
  };

  const validateForm = (fullName?: string, email?: string, phoneNumber?: string, password?: string, confirmPassword?: string, oldPassword?: string, newPassword?: string, emailOrPhone?: string) => {
    const newErrors: ValidationErrors = {};

    if (fullName !== undefined && fullName.trim() === '') {
      newErrors.fullName = 'Full Name is required';
    }

    if (email !== undefined) {
      if (email.trim() === '') {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email address is invalid';
      }
    }

    if (phoneNumber !== undefined) {
      if (phoneNumber.trim() === '') {
        newErrors.phoneNumber = 'Phone Number is required';
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
      }
    }

    if (emailOrPhone !== undefined) {
      if (emailOrPhone.trim() === '') {
        newErrors.emailOrPhone = 'Email or Phone Number is required';
      } else if (!/\S+@\S+\.\S+/.test(emailOrPhone) && !/^\d{10}$/.test(emailOrPhone)) {
        newErrors.emailOrPhone = 'Email or Phone Number is invalid';
      }
    }

    if (password !== undefined) {
      if (password.trim() === '') {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    if (confirmPassword !== undefined) {
      if (confirmPassword.trim() === '') {
        newErrors.confirmPassword = 'Confirm Password is required';
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (oldPassword !== undefined && oldPassword.trim() === '') {
      newErrors.oldPassword = 'Old Password is required';
    }

    if (newPassword !== undefined) {
      if (newPassword.trim() === '') {
        newErrors.newPassword = 'New Password is required';
      } else if (newPassword.length < 6) {
        newErrors.newPassword = 'New Password must be at least 6 characters';
      } else if (newPassword === oldPassword) {
        newErrors.newPassword = 'New password cannot be the same as old password';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateField, validateForm };
};

export default useFormValidation;
