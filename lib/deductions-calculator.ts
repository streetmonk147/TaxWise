/**
 * Statutory Deductions Calculator
 * Calculates Pension, NHF, and PAYE for Nigerian payroll
 */

import { calculatePAYE } from "./paye-calculator"

export interface DeductionsInput {
  basic_salary: number
  housing_allowance: number
  transport_allowance: number
  other_allowances: number
}

export interface DeductionsResult {
  gross_pay: number
  paye: number
  pension_employee: number
  pension_employer: number
  nhf: number
  net_pay: number
  total_employer_cost: number
  breakdown: {
    earnings: {
      basic_salary: number
      housing_allowance: number
      transport_allowance: number
      other_allowances: number
    }
    deductions: {
      paye: number
      pension_employee: number
      nhf: number
      total_deductions: number
    }
  }
}

/**
 * Calculate all statutory deductions for an employee
 * @param input - Employee salary components
 * @returns Complete deductions calculation
 */
export function calculateDeductions(input: DeductionsInput): DeductionsResult {
  const {
    basic_salary,
    housing_allowance,
    transport_allowance,
    other_allowances,
  } = input

  // Calculate gross pay
  const gross_pay =
    basic_salary + housing_allowance + transport_allowance + other_allowances

  // Calculate pension (based on basic salary only)
  const pension_employee = basic_salary * 0.08 // 8% employee contribution
  const pension_employer = basic_salary * 0.1 // 10% employer contribution

  // Calculate NHF (based on basic salary only)
  const nhf = basic_salary * 0.025 // 2.5%

  // Calculate annual gross for PAYE calculation
  const annual_gross = gross_pay * 12

  // Calculate PAYE using the PAYE calculator
  const payeResult = calculatePAYE(annual_gross)
  const monthly_paye = payeResult.monthly_tax

  // Calculate net pay
  const total_deductions = monthly_paye + pension_employee + nhf
  const net_pay = gross_pay - total_deductions

  // Calculate total employer cost
  const total_employer_cost = gross_pay + pension_employer

  return {
    gross_pay: Math.round(gross_pay * 100) / 100,
    paye: Math.round(monthly_paye * 100) / 100,
    pension_employee: Math.round(pension_employee * 100) / 100,
    pension_employer: Math.round(pension_employer * 100) / 100,
    nhf: Math.round(nhf * 100) / 100,
    net_pay: Math.round(net_pay * 100) / 100,
    total_employer_cost: Math.round(total_employer_cost * 100) / 100,
    breakdown: {
      earnings: {
        basic_salary: Math.round(basic_salary * 100) / 100,
        housing_allowance: Math.round(housing_allowance * 100) / 100,
        transport_allowance: Math.round(transport_allowance * 100) / 100,
        other_allowances: Math.round(other_allowances * 100) / 100,
      },
      deductions: {
        paye: Math.round(monthly_paye * 100) / 100,
        pension_employee: Math.round(pension_employee * 100) / 100,
        nhf: Math.round(nhf * 100) / 100,
        total_deductions: Math.round(total_deductions * 100) / 100,
      },
    },
  }
}
