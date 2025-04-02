/**
 * Formats a number as a money amount with comma separators
 * @param amount - The number to format as money
 * @param currency - Currency symbol (default: "$")
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted money string (e.g., "$1,234.56")
 */

export function formatMoney(
  amount: number | string,
  currency: string = '$',
  decimals: number = 2
): string {
  try {
    // Convert to number if string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Check if valid number
    if (isNaN(numAmount)) {
      throw new Error('Invalid amount');
    }

    // Format with proper commas and decimal places
    const formattedAmount = numAmount.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return `${currency}${formattedAmount}`;
  } catch (error) {
    console.error('Error formatting money amount:', error);
    return 'Invalid amount';
  }
}
