import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Plus, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  TrendingUp,
  Eye,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                OneClick Reviews
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, John! Here's how your campaigns are performing.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">12</div>
              <p className="text-xs text-blue-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +2 this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Messages Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">1,429</div>
              <p className="text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Click Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">24.8%</div>
              <p className="text-xs text-purple-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Reviews Gained</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">87</div>
              <p className="text-xs text-orange-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +12 this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Campaigns */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Your latest review request campaigns</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Holiday Special Campaign",
                  status: "Active",
                  sent: 245,
                  clicks: 62,
                  rate: "25.3%",
                  type: "SMS + Email"
                },
                {
                  name: "New Customer Outreach",
                  status: "Completed",
                  sent: 189,
                  clicks: 43,
                  rate: "22.8%",
                  type: "Email"
                },
                {
                  name: "Follow-up Campaign #3",
                  status: "Draft",
                  sent: 0,
                  clicks: 0,
                  rate: "-",
                  type: "SMS"
                }
              ].map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={campaign.status === "Active" ? "default" : 
                                  campaign.status === "Completed" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {campaign.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{campaign.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{campaign.sent}</div>
                      <div>Sent</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{campaign.clicks}</div>
                      <div>Clicks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{campaign.rate}</div>
                      <div>CTR</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Create Campaign</CardTitle>
              <CardDescription>
                Set up a new SMS or email campaign to request reviews from your customers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Manage Contacts</CardTitle>
              <CardDescription>
                Upload customer lists via CSV or add individual contacts to your database.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle>View Analytics</CardTitle>
              <CardDescription>
                Deep dive into your campaign performance with detailed analytics and insights.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🚀 Full Dashboard Coming Soon!
              </h3>
              <p className="text-gray-600">
                This is a preview of your OneClick Reviews dashboard. The complete functionality with campaign creation, 
                contact management, template editor, SMS/Email sending, and detailed analytics will be available soon.
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="ml-4">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
