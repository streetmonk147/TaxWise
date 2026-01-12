"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield, CheckCircle, AlertCircle, Info, FileText } from "lucide-react"
import Link from "next/link"

export default function TINRegistrationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    stateOfOrigin: "",
    address: "",
    occupation: "",
  })

  const steps = [
    { number: 1, title: "Personal Details", description: "Enter your personal information" },
    { number: 2, title: "Contact Information", description: "Provide your contact details" },
    { number: 3, title: "Review", description: "Review and submit" },
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

  const handleInputChange = (field: string, value: string) => {
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
              <Shield className="h-4 w-4" />
              TIN Registration Helper
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Get Your Tax Identification Number (TIN)
            </h1>
            <p className="text-gray-600">
              Guided process to register for your TIN with FIRS
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">What is a TIN?</p>
                <p>A Tax Identification Number (TIN) is a unique 10-digit number issued by FIRS. It's required for tax filing, opening bank accounts, and many financial transactions in Nigeria.</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name as it appears on your ID"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateOfOrigin">State of Origin</Label>
                  <Input
                    id="stateOfOrigin"
                    placeholder="Enter your state of origin"
                    value={formData.stateOfOrigin}
                    onChange={(e) => handleInputChange("stateOfOrigin", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="e.g., Software Developer, Accountant"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
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
                <div className="space-y-2">
                  <Label htmlFor="address">Residential Address</Label>
                  <textarea
                    id="address"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your complete residential address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Review Your Information</h3>
                  <div className="space-y-2 text-sm text-green-800">
                    <p><span className="font-medium">Name:</span> {formData.fullName || "Not provided"}</p>
                    <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth || "Not provided"}</p>
                    <p><span className="font-medium">State of Origin:</span> {formData.stateOfOrigin || "Not provided"}</p>
                    <p><span className="font-medium">Occupation:</span> {formData.occupation || "Not provided"}</p>
                    <p><span className="font-medium">Email:</span> {formData.email || "Not provided"}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone || "Not provided"}</p>
                    <p><span className="font-medium">Address:</span> {formData.address || "Not provided"}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Required Documents</p>
                    <p>You'll need to provide:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Valid means of identification (National ID, Driver's License, or International Passport)</li>
                      <li>Proof of address (utility bill, bank statement)</li>
                      <li>Passport photograph</li>
                    </ul>
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
                    alert("TIN Registration service coming soon! We'll guide you through the FIRS registration process.")
                  }}
                >
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">TIN Registration Process</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                  1
                </div>
                <div>
                  <p className="font-medium">Complete this form</p>
                  <p className="text-gray-600">We'll prepare your application</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                  2
                </div>
                <div>
                  <p className="font-medium">Submit to FIRS</p>
                  <p className="text-gray-600">We'll guide you through the FIRS portal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                  3
                </div>
                <div>
                  <p className="font-medium">Receive your TIN</p>
                  <p className="text-gray-600">Usually within 24-48 hours via email</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
