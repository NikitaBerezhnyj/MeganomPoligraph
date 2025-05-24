export function checkPasswordStrength(password: string): boolean {
  const lengthCriteria = password.length >= 8;
  const uppercaseCriteria = /[A-Z]/.test(password);
  const lowercaseCriteria = /[a-z]/.test(password);
  const numberCriteria = /\d/.test(password);
  const specialCharCriteria = /[!@#$%^&*()_,.?":{}|<>]/.test(password);

  if (
    lengthCriteria &&
    uppercaseCriteria &&
    lowercaseCriteria &&
    numberCriteria &&
    specialCharCriteria
  ) {
    return true;
  }

  return false;
}
