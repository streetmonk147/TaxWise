"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, CheckCircle, Info, Lightbulb, AlertCircle } from "lucide-react"
import Link from "next/link"

const taxTips = [
  {
    category: "Allowances",
    title: "Maximize Your Allowances",
    description: "Ensure your employer properly structures your salary with tax-free allowances",
    tips: [
      "Housing allowance (up to 30% of basic salary)",
      "Transport allowance (up to ₦200,000 annually)",
      "Meal allowance (up to ₦200,000 annually)",
      "Utility allowance (up to 20% of basic salary)",
    ],
  },
  {
    category: "Deductions",
    title: "Claim All Eligible Deductions",
    description: "Reduce your taxable income with these legal deductions",
    tips: [
      "Pension contributions (8% of salary)",
      "National Housing Fund (2.5% of salary)",
      "Life insurance premiums",
      "Health insurance premiums",
      "Contributions to approved pension schemes",
    ],
  },
  {
    category: "Investments",
    title: "Tax-Efficient Investments",
    description: "Invest in tax-advantaged products to reduce your tax burden",
    tips: [
      "Retirement savings accounts (RSA)",
      "Life insurance policies",
      "Real estate investments",
      "Government bonds",
      "Mutual funds with tax benefits",
    ],
  },
  {
    category: "Business",
    title: "Business Expense Deductions",
    description: "If you have business income, deduct legitimate business expenses",
    tips: [
      "Office rent and utilities",
      "Business equipment and supplies",
      "Professional development and training",
      "Business travel expenses",
      "Professional fees and subscriptions",
    ],
  },
]

export default function TaxOptimizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/taxpadi" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to TaxPadi
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Lightbulb className="h-4 w-4" />
              Tax Optimization Tips
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Legal Ways to Reduce Your Tax
            </h1>
            <p className="text-gray-600">
              Discover tax deductions and strategies to minimize your tax legally
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">About Tax Optimization</p>
                <p>
                  Tax optimization is about legally reducing your tax burden through deductions, allowances, 
                  and smart financial planning. These strategies are completely legal and encouraged by FIRS.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {taxTips.map((tip, index) => (
            <Card key={index} className="shadow-lg border-green-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">{tip.category}</div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{tip.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tip.tips.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calculator CTA */}
        <Card className="mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Calculate Your Potential Savings</h3>
              <p className="text-green-100 mb-6">
                Use our tax calculator to see how these optimizations can reduce your tax
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/taxpadi/calculator">
                  <Button className="bg-white text-green-600 hover:bg-gray-100">
                    Try Tax Calculator
                  </Button>
                </Link>
                <Link href="/taxpadi/filing">
                  <Button variant="outline" className="border-white text-white hover:bg-green-800">
                    Start Filing
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="mt-6 bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Important Notes</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Keep Records</p>
                  <p>Always keep receipts and documentation for all deductions and expenses you claim.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Consult a Professional</p>
                  <p>For complex situations, consider consulting a tax professional or accountant.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Stay Updated</p>
                  <p>Tax laws change. Make sure you're aware of the latest regulations and updates from FIRS.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
