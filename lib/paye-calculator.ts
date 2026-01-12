/**
 * 2026 Nigeria PAYE Tax Calculator
 * Implements the progressive tax brackets for 2026
 */

export interface PAYEResult {
  annual_gross: number
  annual_tax: number
  monthly_tax: number
  effective_rate: number
  breakdown: TaxBreakdown[]
}

export interface TaxBreakdown {
  bracket: string
  taxable_amount: number
  rate: number
  tax: number
}

/**
 * Calculate PAYE tax based on 2026 Nigeria tax brackets
 * @param annualGross - Annual gross salary in Naira
 * @returns PAYE calculation result
 */
export function calculatePAYE(annualGross: number): PAYEResult {
  if (annualGross <= 0) {
    return {
      annual_gross: 0,
      annual_tax: 0,
      monthly_tax: 0,
      effective_rate: 0,
      breakdown: [],
    }
  }

  let annualTax = 0
  const breakdown: TaxBreakdown[] = []
  let remaining = annualGross

  // Bracket 1: First ₦800,000 - 0% tax
  if (remaining <= 800000) {
    breakdown.push({
      bracket: "First ₦800,000",
      taxable_amount: remaining,
      rate: 0,
      tax: 0,
    })
    annualTax = 0
  } else {
    breakdown.push({
      bracket: "First ₦800,000",
      taxable_amount: 800000,
      rate: 0,
      tax: 0,
    })
    remaining -= 800000

    // Bracket 2: ₦800,001 - ₦2,200,000 → 7%
    if (remaining > 0) {
      const bracket2Amount = Math.min(remaining, 1400000) // 2,200,000 - 800,000
      const bracket2Tax = bracket2Amount * 0.07
      annualTax += bracket2Tax
      breakdown.push({
        bracket: "₦800,001 - ₦2,200,000",
        taxable_amount: bracket2Amount,
        rate: 7,
        tax: bracket2Tax,
      })
      remaining -= bracket2Amount
    }

    // Bracket 3: ₦2,200,001 - ₦8,999,000 → ₦98,000 + 15% on excess
    if (remaining > 0) {
      const bracket3Amount = Math.min(remaining, 6799000) // 8,999,000 - 2,200,000
      const bracket3Tax = bracket3Amount * 0.15
      annualTax += bracket3Tax
      breakdown.push({
        bracket: "₦2,200,001 - ₦8,999,000",
        taxable_amount: bracket3Amount,
        rate: 15,
        tax: bracket3Tax,
      })
      remaining -= bracket3Amount
    }

    // Bracket 4: ₦9,000,000 - ₦12,999,000 → ₦1,117,850 + 18% on excess
    if (remaining > 0) {
      const bracket4Amount = Math.min(remaining, 3999000) // 12,999,000 - 9,000,000
      const bracket4Tax = bracket4Amount * 0.18
      annualTax += bracket4Tax
      breakdown.push({
        bracket: "₦9,000,000 - ₦12,999,000",
        taxable_amount: bracket4Amount,
        rate: 18,
        tax: bracket4Tax,
      })
      remaining -= bracket4Amount
    }

    // Bracket 5: ₦13,000,000 - ₦24,999,000 → ₦1,837,820 + 21% on excess
    if (remaining > 0) {
      const bracket5Amount = Math.min(remaining, 11999000) // 24,999,000 - 13,000,000
      const bracket5Tax = bracket5Amount * 0.21
      annualTax += bracket5Tax
      breakdown.push({
        bracket: "₦13,000,000 - ₦24,999,000",
        taxable_amount: bracket5Amount,
        rate: 21,
        tax: bracket5Tax,
      })
      remaining -= bracket5Amount
    }

    // Bracket 6: ₦25,000,000 - ₦49,999,000 → ₦4,357,790 + 23% on excess
    if (remaining > 0) {
      const bracket6Amount = Math.min(remaining, 24999000) // 49,999,000 - 25,000,000
      const bracket6Tax = bracket6Amount * 0.23
      annualTax += bracket6Tax
      breakdown.push({
        bracket: "₦25,000,000 - ₦49,999,000",
        taxable_amount: bracket6Amount,
        rate: 23,
        tax: bracket6Tax,
      })
      remaining -= bracket6Amount
    }

    // Bracket 7: ₦50,000,000+ → ₦10,107,710 + 25% on excess
    if (remaining > 0) {
      const bracket7Tax = remaining * 0.25
      annualTax += bracket7Tax
      breakdown.push({
        bracket: "₦50,000,000+",
        taxable_amount: remaining,
        rate: 25,
        tax: bracket7Tax,
      })
    }
  }

  const monthlyTax = annualTax / 12
  const effectiveRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0

  return {
    annual_gross: annualGross,
    annual_tax: Math.round(annualTax * 100) / 100,
    monthly_tax: Math.round(monthlyTax * 100) / 100,
    effective_rate: Math.round(effectiveRate * 100) / 100,
    breakdown,
  }
}

/**
 * Test cases for validation
 */
export const testCases = [
  { annual: 500000, expectedTax: 0 },
  { annual: 1000000, expectedTax: 14000 }, // (1,000,000 - 800,000) * 0.07 = 14,000
  { annual: 5000000, expectedTax: 518000 }, // Approximate
  { annual: 10000000, expectedTax: 1297850 }, // Approximate
  { annual: 50000000, expectedTax: 10107710 }, // Approximate
]
