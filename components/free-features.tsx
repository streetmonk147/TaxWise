import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calculator, FileText, Shield, Users, TrendingUp, Gift } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FreeFeatures() {
  const freeFeatures = [
    {
      icon: Calculator,
      title: "Free Tax Calculator",
      description: "Calculate PAYE tax instantly. No signup required. Use as many times as you want.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/taxpadi/calculator",
    },
    {
      icon: FileText,
      title: "Free Tax Filing Assistant",
      description: "Step-by-step guide to file your personal income tax returns. Completely free.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/taxpadi/filing",
    },
    {
      icon: Shield,
      title: "Free Payroll (Up to 5 Employees)",
      description: "Run payroll for up to 5 employees forever free. No credit card, no trial expiration.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/register",
    },
    {
      icon: TrendingUp,
      title: "Free FIRS Reports",
      description: "Generate and export FIRS-ready PAYE schedules and annual returns. No cost.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "/register",
    },
    {
      icon: Users,
      title: "Free Employee Self-Service",
      description: "Employees can access payslips and year-to-date summaries. Always free.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      link: "/register",
    },
    {
      icon: Gift,
      title: "Free TIN Registration Help",
      description: "Guided process to get your Tax Identification Number. No fees.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      link: "/taxpadi/tin",
    },
  ]

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Gift className="h-4 w-4" />
            <span>100% Free Features</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features, <span className="text-green-600">Completely Free</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe everyone should have access to quality tax and payroll tools. 
            That's why we offer these powerful features at no cost—forever.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {freeFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-200">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={feature.link}>
                    <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
                      Get Started Free
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Hidden Fees, No Credit Card Required
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Start using these features right now. No signup required for calculators. 
              Free payroll for small teams. Upgrade only when you need more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/taxpadi/calculator">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  Try Free Calculator
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8">
                  Start Free Payroll
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
