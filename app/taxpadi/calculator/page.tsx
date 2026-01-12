"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculatePAYE } from "@/lib/paye-calculator"
import { calculateDeductions } from "@/lib/deductions-calculator"
import { formatCurrency } from "@/lib/utils"
import { Calculator as CalcIcon, Download, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TaxPadiCalculatorPage() {
  const [annualSalary, setAnnualSalary] = useState("")
  const [monthlySalary, setMonthlySalary] = useState("")
  const [basicPercentage, setBasicPercentage] = useState("60")
  const [results, setResults] = useState<any>(null)

  const handleCalculate = () => {
    let annual = 0

    if (annualSalary) {
      annual = parseFloat(annualSalary)
    } else if (monthlySalary) {
      annual = parseFloat(monthlySalary) * 12
    } else {
      return
    }

    if (isNaN(annual) || annual <= 0) {
      return
    }

    const monthly = annual / 12
    const basicPercent = parseFloat(basicPercentage) / 100
    const basicSalary = monthly * basicPercent
    const otherAllowances = monthly * (1 - basicPercent)

    const deductions = calculateDeductions({
      basic_salary: basicSalary,
      housing_allowance: otherAllowances * 0.4,
      transport_allowance: otherAllowances * 0.3,
      other_allowances: otherAllowances * 0.3,
    })

    const payeResult = calculatePAYE(annual)

    setResults({
      monthly,
      annual,
      deductions,
      paye: payeResult,
    })
  }

  const handleMonthlyChange = (value: string) => {
    setMonthlySalary(value)
    if (value) {
      setAnnualSalary("")
    }
  }

  const handleAnnualChange = (value: string) => {
    setAnnualSalary(value)
    if (value) {
      setMonthlySalary("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/taxpadi" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to TaxPadi
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CalcIcon className="h-4 w-4" />
              Free Tax Calculator
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Nigeria PAYE Calculator 2026
            </h1>
            <p className="text-gray-600">
              Calculate your PAYE tax under Nigeria's new 2026 tax law
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Calculator Input */}
          <Card className="shadow-xl border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="h-5 w-5 text-green-600" />
                Enter Your Salary
              </CardTitle>
              <CardDescription>
                Calculate your monthly take-home pay and tax obligations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annual">Annual Gross Salary (₦)</Label>
                <Input
                  id="annual"
                  type="number"
                  placeholder="e.g., 5000000"
                  value={annualSalary}
                  onChange={(e) => handleAnnualChange(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Gross Salary (₦)</Label>
                <Input
                  id="monthly"
                  type="number"
                  placeholder="e.g., 416667"
                  value={monthlySalary}
                  onChange={(e) => handleMonthlyChange(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Will be multiplied by 12 for annual calculation
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="basic">Basic Salary Percentage (%)</Label>
                <Input
                  id="basic"
                  type="number"
                  min="0"
                  max="100"
                  value={basicPercentage}
                  onChange={(e) => setBasicPercentage(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Percentage of salary that is basic (default: 60%)
                </p>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!annualSalary && !monthlySalary}
              >
                Calculate Tax
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card className="shadow-xl border-green-100">
              <CardHeader>
                <CardTitle>Calculation Results</CardTitle>
                <CardDescription>Your monthly breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Monthly Breakdown */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Monthly Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Pay:</span>
                      <span className="font-semibold">{formatCurrency(results.monthly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PAYE Tax:</span>
                      <span className="font-semibold text-red-600">
                        {formatCurrency(results.paye.monthly_tax)} ({results.paye.effective_rate.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pension (8%):</span>
                      <span className="font-semibold">{formatCurrency(results.deductions.pension_employee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NHF (2.5%):</span>
                      <span className="font-semibold">{formatCurrency(results.deductions.nhf)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Net Pay:</span>
                        <span className="font-bold text-green-600 text-lg">
                          {formatCurrency(results.deductions.net_pay)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Annual Summary */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Annual Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Tax:</span>
                      <span className="font-semibold">{formatCurrency(results.paye.annual_tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective Rate:</span>
                      <span className="font-semibold">{results.paye.effective_rate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Take-home:</span>
                      <span className="font-semibold">
                        {formatCurrency(results.deductions.net_pay * 12)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Link href="/register" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Save Calculation
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!results && (
            <Card className="shadow-xl border-green-100 bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
                {/* Illustration */}
                <div className="w-full max-w-xs mb-6">
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-auto"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Calculator illustration */}
                    <rect
                      x="80"
                      y="50"
                      width="240"
                      height="200"
                      rx="12"
                      fill="white"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    {/* Screen */}
                    <rect
                      x="100"
                      y="70"
                      width="200"
                      height="60"
                      rx="6"
                      fill="#f0fdf4"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    {/* Display text */}
                    <text
                      x="200"
                      y="110"
                      textAnchor="middle"
                      fill="#059669"
                      fontSize="20"
                      fontWeight="600"
                      fontFamily="Arial, sans-serif"
                    >
                      ₦0.00
                    </text>
                    {/* Buttons grid */}
                    <g>
                      {/* Row 1 */}
                      <rect x="110" y="150" width="45" height="35" rx="4" fill="#10b981" opacity="0.2" />
                      <rect x="165" y="150" width="45" height="35" rx="4" fill="#10b981" opacity="0.2" />
                      <rect x="220" y="150" width="45" height="35" rx="4" fill="#10b981" opacity="0.2" />
                      <rect x="275" y="150" width="45" height="35" rx="4" fill="#10b981" />
                      {/* Row 2 */}
                      <rect x="110" y="195" width="45" height="35" rx="4" fill="#10b981" opacity="0.2" />
                      <rect x="165" y="195" width="45" height="35" rx="4" fill="#10b981" opacity="0.2" />
                      <rect x="220" y="195" width="45" height="35" rx="4" fill="#10b981" opacity="0.2" />
                      <rect x="275" y="195" width="45" height="35" rx="4" fill="#10b981" />
                      {/* Row 3 */}
                      <rect x="110" y="240" width="110" height="35" rx="4" fill="#10b981" />
                      <rect x="230" y="240" width="90" height="35" rx="4" fill="#10b981" opacity="0.2" />
                    </g>
                    {/* Calculator icon overlay - SVG path for calculator icon */}
                    <circle cx="200" cy="30" r="20" fill="#10b981" opacity="0.15" />
                    <path
                      d="M190 20 L210 20 L210 25 L215 25 L215 35 L210 35 L210 40 L190 40 L190 35 L185 35 L185 25 L190 25 Z"
                      fill="#10b981"
                    />
                    <rect x="193" y="27" width="14" height="8" rx="1" fill="white" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Calculate?</h3>
                  <p className="text-sm text-gray-500">
                    Enter your salary details on the left and click "Calculate Tax" to see your results
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-6 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">About 2026 Tax Brackets</h3>
            <p className="text-sm text-gray-700 mb-4">
              Nigeria's 2026 tax law uses a progressive 7-tier system:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>First ₦800,000: 0% tax</li>
              <li>₦800,001 - ₦2,200,000: 7%</li>
              <li>₦2,200,001 - ₦8,999,000: 15%</li>
              <li>₦9,000,000 - ₦12,999,000: 18%</li>
              <li>₦13,000,000 - ₦24,999,000: 21%</li>
              <li>₦25,000,000 - ₦49,999,000: 23%</li>
              <li>₦50,000,000+: 25%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
