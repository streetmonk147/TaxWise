import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, FileText, Shield, TrendingUp, HelpCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function TaxPadiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" />
              Your Personal Tax Friend
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              Meet <span className="text-green-600">TaxPadi</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Taxes shouldn't be scary. We make them simple. Get help with filing, refunds, and everything tax-related—all in one friendly place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/taxpadi/calculator">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                  Calculate Your Tax
                </Button>
              </Link>
              <Link href="/taxpadi/filing">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-green-600 text-green-600 hover:bg-green-50">
                  Start Filing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need for Your Taxes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple tools to help you navigate Nigerian taxes with confidence
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-100">
              <Link href="/taxpadi/calculator">
                <CardHeader>
                  <Calculator className="h-10 w-10 text-green-600 mb-4" />
                  <CardTitle>Tax Calculator</CardTitle>
                  <CardDescription>
                    Calculate your PAYE tax under Nigeria's 2026 tax law. Free and instant.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-600 font-medium">
                    Try it now <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-100">
              <Link href="/taxpadi/filing">
                <CardHeader>
                  <FileText className="h-10 w-10 text-orange-600 mb-4" />
                  <CardTitle>Tax Filing Assistant</CardTitle>
                  <CardDescription>
                    Step-by-step guide to file your personal income tax returns. We make it easy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-600 font-medium">
                    Get started <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-100">
              <Link href="/taxpadi/tin">
                <CardHeader>
                  <Shield className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>TIN Registration</CardTitle>
                  <CardDescription>
                    Get your Tax Identification Number (TIN) with our guided process. Quick and simple.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-600 font-medium">
                    Register now <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-100">
              <Link href="/taxpadi/side-hustle">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-purple-600 mb-4" />
                  <CardTitle>Side Hustle Tax</CardTitle>
                  <CardDescription>
                    Calculate tax on freelance income and multiple income sources. Perfect for gig workers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-600 font-medium">
                    Calculate <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-100">
              <Link href="/taxpadi/refund">
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-yellow-600 mb-4" />
                  <CardTitle>Tax Refund Helper</CardTitle>
                  <CardDescription>
                    Find out if you're owed a tax refund and claim it easily. We only charge when you get paid.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-600 font-medium">
                    Check refund <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-100">
              <Link href="/taxpadi/optimization">
                <CardHeader>
                  <HelpCircle className="h-10 w-10 text-indigo-600 mb-4" />
                  <CardTitle>Tax Optimization</CardTitle>
                  <CardDescription>
                    Discover legal tax deductions you're missing. Save money on your taxes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-600 font-medium">
                    Learn more <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      {/* Why TaxPadi Section */}
      <div className="bg-gradient-to-r from-green-50 to-orange-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose TaxPadi?</h2>
            <p className="mt-4 text-lg text-gray-600">We're different from other tax services</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600 mb-4">
                🇳🇬
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Nigerian-First</h3>
              <p className="mt-2 text-gray-600">
                Built specifically for Nigerian tax laws. We understand your local context.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-600 mb-4">
                💬
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Friendly Approach</h3>
              <p className="mt-2 text-gray-600">
                No intimidating jargon. We explain everything like you're talking to a friend.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 mb-4">
                💰
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Affordable</h3>
              <p className="mt-2 text-gray-600">
                Free tools to start, affordable premium services. No hidden fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Simplify Your Taxes?</h2>
          <p className="mt-4 text-xl text-green-100">
            Join thousands of Nigerians using TaxPadi to manage their taxes
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/taxpadi/calculator">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Start Free Calculator
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700 px-8 py-6 text-lg">
                Business Owner? Try PayrollNG Pro
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
              <Link href="/taxpadi/calculator" className="text-gray-400 hover:text-white">
                Calculator
              </Link>
              <Link href="/taxpadi/filing" className="text-gray-400 hover:text-white">
                Tax Filing
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white">
                For Businesses
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
