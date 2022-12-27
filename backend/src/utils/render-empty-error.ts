export function renderEmpyError(field: string, message?: string) {
  return {
    message: message ?? `Field ${field} cannot be empty`,
  };
}
