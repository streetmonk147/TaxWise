"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calculator, FileText, AlertCircle, TrendingUp, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

export default function DashboardPage() {
  const { data: session } = useSession()

  // Mock data - replace with real data from API
  const stats = {
    totalEmployees: 0,
    monthlyPayroll: 0,
    totalPAYE: 0,
    nextDeadline: "No upcoming deadlines",
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.email?.split("@")[0]}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your payroll, employees, and compliance from one place.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.monthlyPayroll)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PAYE</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalPAYE)}</div>
            <p className="text-xs text-muted-foreground">Tax liability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sm">{stats.nextDeadline}</div>
            <p className="text-xs text-muted-foreground">Compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/employees/new">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Add Employee
              </CardTitle>
              <CardDescription>Add a new employee to your payroll</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/payroll/run">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-600" />
                Run Payroll
              </CardTitle>
              <CardDescription>Process monthly payroll for all employees</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/reports">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                View Reports
              </CardTitle>
              <CardDescription>Generate PAYE schedules and reports</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/compliance">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Compliance
              </CardTitle>
              <CardDescription>Track remittances and deadlines</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Getting Started */}
      {stats.totalEmployees === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Start by adding your first employee to begin processing payroll.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/employees/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Add Your First Employee
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
