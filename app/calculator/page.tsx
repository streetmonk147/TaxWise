"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CalculatorPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/taxpadi/calculator")
  }, [router])
  
  return null
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
      housing_allowance: otherAllowances * 0.4, // Assume 40% housing
      transport_allowance: otherAllowances * 0.3, // Assume 30% transport
      other_allowances: otherAllowances * 0.3, // Remaining 30%
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nigeria PAYE Calculator 2026
          </h1>
          <p className="text-gray-600">
            Calculate your PAYE tax under Nigeria's new 2026 tax law
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Calculator Input */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="h-5 w-5 text-blue-600" />
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
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!annualSalary && !monthlySalary}
              >
                Calculate Tax
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card className="shadow-xl">
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
            <Card className="shadow-xl border-dashed">
              <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-gray-400">
                  <CalcIcon className="h-12 w-12 mx-auto mb-4" />
                  <p>Enter your salary details and click "Calculate Tax" to see results</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
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
