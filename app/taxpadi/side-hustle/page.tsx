"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculatePAYE } from "@/lib/paye-calculator"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, ArrowLeft, Plus, Minus, Info } from "lucide-react"
import Link from "next/link"

interface IncomeSource {
  id: string
  type: string
  amount: string
  frequency: "monthly" | "quarterly" | "annually"
}

export default function SideHustleTaxPage() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
    { id: "1", type: "Salary", amount: "", frequency: "monthly" },
  ])
  const [results, setResults] = useState<any>(null)

  const addIncomeSource = () => {
    setIncomeSources([
      ...incomeSources,
      {
        id: Date.now().toString(),
        type: "Freelance",
        amount: "",
        frequency: "monthly",
      },
    ])
  }

  const removeIncomeSource = (id: string) => {
    if (incomeSources.length > 1) {
      setIncomeSources(incomeSources.filter((source) => source.id !== id))
    }
  }

  const updateIncomeSource = (id: string, field: string, value: string) => {
    setIncomeSources(
      incomeSources.map((source) =>
        source.id === id ? { ...source, [field]: value } : source
      )
    )
  }

  const calculateTotalTax = () => {
    let totalAnnual = 0

    incomeSources.forEach((source) => {
      const amount = parseFloat(source.amount) || 0
      let annual = 0

      switch (source.frequency) {
        case "monthly":
          annual = amount * 12
          break
        case "quarterly":
          annual = amount * 4
          break
        case "annually":
          annual = amount
          break
      }

      totalAnnual += annual
    })

    if (totalAnnual <= 0) {
      return
    }

    const payeResult = calculatePAYE(totalAnnual)

    setResults({
      totalAnnual,
      monthly: totalAnnual / 12,
      paye: payeResult,
      sources: incomeSources.length,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/taxpadi" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to TaxPadi
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Side Hustle Tax Calculator
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Calculate Tax on Multiple Income Sources
            </h1>
            <p className="text-gray-600">
              Perfect for freelancers, gig workers, and people with side businesses
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <Card className="shadow-xl border-green-100">
            <CardHeader>
              <CardTitle>Your Income Sources</CardTitle>
              <CardDescription>
                Add all your income sources to calculate total tax
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {incomeSources.map((source, index) => (
                <div key={source.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Income Source {index + 1}</Label>
                    {incomeSources.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIncomeSource(source.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`type-${source.id}`}>Type</Label>
                    <select
                      id={`type-${source.id}`}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={source.type}
                      onChange={(e) => updateIncomeSource(source.id, "type", e.target.value)}
                    >
                      <option value="Salary">Salary</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Business">Business Income</option>
                      <option value="Rental">Rental Income</option>
                      <option value="Investment">Investment Income</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`amount-${source.id}`}>Amount (₦)</Label>
                    <Input
                      id={`amount-${source.id}`}
                      type="number"
                      placeholder="0"
                      value={source.amount}
                      onChange={(e) => updateIncomeSource(source.id, "amount", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`frequency-${source.id}`}>Frequency</Label>
                    <select
                      id={`frequency-${source.id}`}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={source.frequency}
                      onChange={(e) => updateIncomeSource(source.id, "frequency", e.target.value)}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addIncomeSource}
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Income Source
              </Button>

              <Button
                onClick={calculateTotalTax}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Calculate Total Tax
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {results ? (
            <Card className="shadow-xl border-green-100">
              <CardHeader>
                <CardTitle>Tax Calculation Results</CardTitle>
                <CardDescription>
                  Based on {results.sources} income source{results.sources > 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Total Income</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Gross Income:</span>
                      <span className="font-semibold">{formatCurrency(results.totalAnnual)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Average:</span>
                      <span className="font-semibold">{formatCurrency(results.monthly)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Tax Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual PAYE Tax:</span>
                      <span className="font-semibold text-red-600">
                        {formatCurrency(results.paye.annual_tax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Tax:</span>
                      <span className="font-semibold text-red-600">
                        {formatCurrency(results.paye.monthly_tax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective Tax Rate:</span>
                      <span className="font-semibold">
                        {results.paye.effective_rate.toFixed(2)}%
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Annual Take-Home:</span>
                        <span className="font-bold text-green-600 text-lg">
                          {formatCurrency(results.totalAnnual - results.paye.annual_tax)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Important Note</p>
                      <p>
                        If you have multiple income sources, you may need to file quarterly tax returns. 
                        Consider using our <Link href="/taxpadi/filing" className="underline font-medium">Tax Filing Assistant</Link> for guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl border-dashed border-green-100">
              <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-gray-400">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                  <p>Add your income sources and click "Calculate Total Tax" to see results</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-6 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">About Multiple Income Sources</h3>
            <p className="text-sm text-gray-700 mb-4">
              If you have income from multiple sources (salary + freelance, business + rental, etc.), 
              you need to combine all income for tax calculation:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>All income sources are combined for total annual income</li>
              <li>Tax is calculated on the combined total using progressive brackets</li>
              <li>You may need to file quarterly returns if you have business income</li>
              <li>Keep records of all income sources for tax filing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
