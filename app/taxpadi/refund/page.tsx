"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, AlertCircle, Info, DollarSign } from "lucide-react"
import Link from "next/link"

export default function TaxRefundPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    tin: "",
    year: new Date().getFullYear() - 1,
    annualIncome: "",
    taxPaid: "",
    hasOverpaid: false,
  })

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const checkRefund = () => {
    const income = parseFloat(formData.annualIncome) || 0
    const taxPaid = parseFloat(formData.taxPaid) || 0
    
    // Simple calculation - in real app, would use actual tax calculation
    const estimatedTax = income * 0.15 // Rough estimate
    const overpaid = taxPaid - estimatedTax
    
    if (overpaid > 0) {
      setFormData((prev) => ({ ...prev, hasOverpaid: true }))
      setStep(2)
    } else {
      setStep(3)
    }
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
              <DollarSign className="h-4 w-4" />
              Tax Refund Helper
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Check if You're Owed a Tax Refund
            </h1>
            <p className="text-gray-600">
              Find out if you've overpaid taxes and claim your refund
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">How It Works</p>
                <p>
                  We'll check if you've overpaid taxes. If you're eligible for a refund, we'll help you claim it. 
                  We only charge 15% commission when you successfully receive your refund—no upfront fees.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {step === 1 && (
          <Card className="shadow-xl border-green-100">
            <CardHeader>
              <CardTitle>Check Your Refund Eligibility</CardTitle>
              <CardDescription>
                Enter your tax information to see if you're owed a refund
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                <Input
                  id="tin"
                  placeholder="Enter your 10-digit TIN"
                  value={formData.tin}
                  onChange={(e) => handleInputChange("tin", e.target.value)}
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Tax Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2023"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-500">
                  Enter the year you want to check for refunds (usually previous year)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Gross Income for {formData.year} (₦)</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  placeholder="Enter your annual income"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxPaid">Total Tax Paid in {formData.year} (₦)</Label>
                <Input
                  id="taxPaid"
                  type="number"
                  placeholder="Enter total tax you paid"
                  value={formData.taxPaid}
                  onChange={(e) => handleInputChange("taxPaid", e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Check your payslips or tax certificates for this amount
                </p>
              </div>
              <Button
                onClick={checkRefund}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!formData.tin || !formData.annualIncome || !formData.taxPaid}
              >
                Check Refund Eligibility
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-xl border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">You May Be Eligible for a Refund!</CardTitle>
              <CardDescription>
                Based on your information, you may have overpaid taxes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 mb-1">Potential Refund Detected</p>
                    <p className="text-sm text-green-800">
                      Our analysis suggests you may have overpaid taxes. However, a detailed review is needed 
                      to confirm the exact refund amount.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Next Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Submit Your Documents</p>
                      <p className="text-sm text-gray-600">
                        We'll need your payslips, tax certificates, and other relevant documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                      2
                    </div>
                    <div>
                      <p className="font-medium">We Review & Prepare Claim</p>
                      <p className="text-sm text-gray-600">
                        Our team reviews your case and prepares the refund claim documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Submit to FIRS</p>
                      <p className="text-sm text-gray-600">
                        We submit your refund claim to FIRS on your behalf
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                      4
                    </div>
                    <div>
                      <p className="font-medium">You Get Your Refund</p>
                      <p className="text-sm text-gray-600">
                        Once FIRS processes your refund, you receive it. We charge 15% commission only on successful refunds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>No Risk:</strong> You only pay us if you successfully receive your refund. 
                  No upfront fees or hidden charges.
                </p>
              </div>

              <Button
                onClick={() => {
                  alert("Refund claim service coming soon! We're building the full refund assistance platform.")
                }}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Start Refund Claim Process
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="shadow-xl border-gray-200">
            <CardHeader>
              <CardTitle>No Refund Detected</CardTitle>
              <CardDescription>
                Based on your information, you don't appear to be eligible for a refund
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Tax Payment Looks Correct</p>
                    <p className="text-sm text-gray-700">
                      Based on the information provided, your tax payments appear to be correct. 
                      However, if you believe there's an error, you can still contact us for a detailed review.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Why You Might Not See a Refund</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Your tax payments match your tax liability</li>
                  <li>You may have underpaid and owe additional tax</li>
                  <li>Some deductions or allowances weren't accounted for</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Check Again
                </Button>
                <Link href="/taxpadi" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Back to TaxPadi
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Common Reasons for Tax Refunds</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Overpayment due to incorrect tax calculations by employer</li>
              <li>Changes in tax brackets during the year</li>
              <li>Eligible deductions not claimed</li>
              <li>Tax paid on income that was later exempted</li>
              <li>Multiple employers in the same tax year</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
