"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export default function TaxFilingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    tin: "",
    fullName: "",
    email: "",
    phone: "",
    employmentType: "",
    annualIncome: "",
    hasOtherIncome: false,
  })

  const steps = [
    { number: 1, title: "Personal Information", description: "Enter your basic details" },
    { number: 2, title: "Income Details", description: "Tell us about your income sources" },
    { number: 3, title: "Review & Submit", description: "Review your information" },
  ]

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
              <FileText className="h-4 w-4" />
              Tax Filing Assistant
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Personal Tax Filing Assistant
            </h1>
            <p className="text-gray-600">
              Step-by-step guide to file your personal income tax returns
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s.number
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > s.number ? <CheckCircle className="h-6 w-6" /> : s.number}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${step >= s.number ? "text-green-600" : "text-gray-500"}`}>
                      {s.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${step > s.number ? "bg-green-600" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-xl border-green-100">
          <CardHeader>
            <CardTitle>{steps[step - 1].title}</CardTitle>
            <CardDescription>{steps[step - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Don't have a TIN?</p>
                    <p>You'll need a Tax Identification Number (TIN) to file. <Link href="/taxpadi/tin" className="underline font-medium">Get your TIN here</Link> first.</p>
                  </div>
                </div>
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
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name as it appears on your TIN"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <select
                    id="employmentType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.employmentType}
                    onChange={(e) => handleInputChange("employmentType", e.target.value)}
                  >
                    <option value="">Select employment type</option>
                    <option value="full-time">Full-time Employee</option>
                    <option value="contract">Contract Worker</option>
                    <option value="freelance">Freelancer</option>
                    <option value="business">Business Owner</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Gross Income (₦)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="Enter your annual income"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Use our <Link href="/taxpadi/calculator" className="text-green-600 underline">tax calculator</Link> if you're not sure
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Do you have other sources of income?</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasOtherIncome"
                        checked={formData.hasOtherIncome === true}
                        onChange={() => handleInputChange("hasOtherIncome", true)}
                        className="h-4 w-4"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasOtherIncome"
                        checked={formData.hasOtherIncome === false}
                        onChange={() => handleInputChange("hasOtherIncome", false)}
                        className="h-4 w-4"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Review Your Information</h3>
                  <div className="space-y-2 text-sm text-green-800">
                    <p><span className="font-medium">TIN:</span> {formData.tin || "Not provided"}</p>
                    <p><span className="font-medium">Name:</span> {formData.fullName || "Not provided"}</p>
                    <p><span className="font-medium">Email:</span> {formData.email || "Not provided"}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone || "Not provided"}</p>
                    <p><span className="font-medium">Employment:</span> {formData.employmentType || "Not provided"}</p>
                    <p><span className="font-medium">Annual Income:</span> ₦{formData.annualIncome || "Not provided"}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Next Steps</p>
                    <p>We'll generate your tax filing documents and guide you through submitting them to FIRS. This is a free service to help you get started.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    alert("This feature is coming soon! We're building the full filing assistant.")
                  }}
                >
                  Generate Filing Documents
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Our tax filing assistant is designed to make the process simple. If you need additional support:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Check our <Link href="/taxpadi" className="text-green-600 underline">TaxPadi resources</Link></li>
              <li>Use our <Link href="/taxpadi/calculator" className="text-green-600 underline">free tax calculator</Link> first</li>
              <li>Ensure you have your TIN ready</li>
              <li>Gather your payslips and income documents</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
