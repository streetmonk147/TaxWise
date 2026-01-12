import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, CheckCircle, TrendingUp, Shield, FileText, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { FreeFeatures } from "@/components/free-features"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSlideshow />
      <FreeFeatures />

      {/* Problem Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Confused by the new 2026 tax law?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Complex calculations, deadline stress, and penalty fears are things of the past.
            </p>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              TaxWise handles everything automatically
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Accurate 2026 PAYE Calculations</CardTitle>
                <CardDescription>
                  Fully updated with the latest 7-tier progressive tax brackets. No more manual calculations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Automatic Payslip Generation</CardTitle>
                <CardDescription>
                  Generate professional PDF payslips for all employees with one click.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>Compliance Deadline Tracking</CardTitle>
                <CardDescription>
                  Never miss a PAYE, Pension, or NHF remittance deadline. Get alerts 7 days before.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle>FIRS-Ready Reports</CardTitle>
                <CardDescription>
                  Export PAYE schedules and annual returns in Excel and PDF formats.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>Employee Self-Service</CardTitle>
                <CardDescription>
                  Employees can access their payslips and year-to-date summaries anytime.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Free PAYE Calculator</CardTitle>
                <CardDescription>
                  Try our free calculator to see how much tax you'll pay under the 2026 law.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* TaxPadi Section */}
      <div className="bg-gradient-to-r from-green-50 to-orange-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              New: For Individuals
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet <span className="text-green-600">TaxPadi</span> - Your Personal Tax Friend
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Not a business owner? We've got you covered too. TaxPadi helps individuals with tax filing, 
              refunds, TIN registration, and more—all in one friendly place.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Tax Filing Assistant</CardTitle>
                <CardDescription>
                  Step-by-step guide to file your personal income tax returns
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Tax Refund Helper</CardTitle>
                <CardDescription>
                  Check if you're owed a refund and claim it easily
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">TIN Registration</CardTitle>
                <CardDescription>
                  Get your Tax Identification Number with our guided process
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link href="/taxpadi">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                Explore TaxPadi
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Get started in 3 simple steps</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Add Your Employees</h3>
              <p className="mt-2 text-gray-600">
                Import from CSV or add manually. Enter salary details and allowances.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Run Monthly Payroll</h3>
              <p className="mt-2 text-gray-600">
                One click processes all employees. Automatic PAYE, Pension, and NHF calculations.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Download Reports</h3>
              <p className="mt-2 text-gray-600">
                Get payslips, PAYE schedules, and annual returns ready for FIRS filing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-xl text-blue-100">
            Join hundreds of Nigerian businesses using PayrollNG Pro
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">TaxWise</h3>
            <p className="mt-2 text-gray-400">Smart Tax Solutions for Nigeria</p>
            <div className="mt-6 flex justify-center gap-6">
              <Link href="/taxpadi" className="text-gray-400 hover:text-white">
                TaxPadi
              </Link>
              <Link href="/taxpadi/calculator" className="text-gray-400 hover:text-white">
                Calculator
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-white">
                Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
