export function fieldRequired(field: string, message?: string) {
  const correctMessage = message ?? 'is required';
  return {
    required_error: `Field ${field} ${correctMessage}`,
  };
}
