export function renderRequiredError(field: string) {
  return {
    required_error: `Field ${field} is required`,
  };
}
