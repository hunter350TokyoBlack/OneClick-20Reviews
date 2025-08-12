import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Plus,
  MessageSquare,
  BarChart3,
  Users,
  Eye,
  Download,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Campaign {
  id: string;
  name: string;
  type: "sms" | "email" | "both";
  status: "draft" | "active" | "completed" | "paused";
  createdAt: string;
  scheduledFor?: string;
  sentCount: number;
  deliveredCount: number;
  clickedCount: number;
  reviewsReceived: number;
  totalContacts: number;
  clickRate: number;
  conversionRate: number;
  lastActivity: string;
}

export default function Campaigns() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Holiday Special Campaign",
      type: "both",
      status: "active",
      createdAt: "2024-01-15",
      sentCount: 245,
      deliveredCount: 237,
      clickedCount: 62,
      reviewsReceived: 18,
      totalContacts: 250,
      clickRate: 26.2,
      conversionRate: 7.6,
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      name: "New Customer Welcome",
      type: "email",
      status: "completed",
      createdAt: "2024-01-10",
      sentCount: 189,
      deliveredCount: 184,
      clickedCount: 43,
      reviewsReceived: 12,
      totalContacts: 189,
      clickRate: 23.4,
      conversionRate: 6.5,
      lastActivity: "1 day ago",
    },
    {
      id: "3",
      name: "VIP Customer Outreach",
      type: "sms",
      status: "completed",
      createdAt: "2024-01-05",
      sentCount: 89,
      deliveredCount: 87,
      clickedCount: 31,
      reviewsReceived: 9,
      totalContacts: 89,
      clickRate: 35.6,
      conversionRate: 10.3,
      lastActivity: "3 days ago",
    },
    {
      id: "4",
      name: "Q1 Review Drive",
      type: "both",
      status: "draft",
      createdAt: "2024-01-20",
      sentCount: 0,
      deliveredCount: 0,
      clickedCount: 0,
      reviewsReceived: 0,
      totalContacts: 150,
      clickRate: 0,
      conversionRate: 0,
      lastActivity: "Just now",
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
    }
  };

  const getTypeIcon = (type: Campaign["type"]) => {
    switch (type) {
      case "sms":
        return <Phone className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "both":
        return (
          <div className="flex">
            <Phone className="w-4 h-4 mr-1" />
            <Mail className="w-4 h-4" />
          </div>
        );
    }
  };

  const totalSent = campaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clickedCount, 0);
  const totalReviews = campaigns.reduce((sum, c) => sum + c.reviewsReceived, 0);
  const avgClickRate =
    campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.clickRate, 0) / campaigns.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                OneClick Reviews
              </span>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1">
              Track and manage your review request campaigns
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Link to="/create-campaign">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Sent
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalSent.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  +12% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Clicks
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalClicks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  +8% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Click Rate
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {avgClickRate.toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  +3.2% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Reviews Gained
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalReviews}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600 fill-current" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5 this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      {getTypeIcon(campaign.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Created{" "}
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {campaign.lastActivity}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(campaign.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress and Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Sent
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {campaign.sentCount}/{campaign.totalContacts}
                      </span>
                    </div>
                    <Progress
                      value={
                        (campaign.sentCount / campaign.totalContacts) * 100
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Delivered
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {campaign.deliveredCount}/{campaign.sentCount}
                      </span>
                    </div>
                    <Progress
                      value={
                        campaign.sentCount > 0
                          ? (campaign.deliveredCount / campaign.sentCount) * 100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Clicked
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {campaign.clickedCount} ({campaign.clickRate}%)
                      </span>
                    </div>
                    <Progress value={campaign.clickRate} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Reviews
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {campaign.reviewsReceived} ({campaign.conversionRate}%)
                      </span>
                    </div>
                    <Progress value={campaign.conversionRate} className="h-2" />
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-4 gap-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-indigo-600">
                        {campaign.deliveredCount}
                      </p>
                      <p className="text-xs text-gray-500">Delivered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {campaign.clickedCount}
                      </p>
                      <p className="text-xs text-gray-500">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {campaign.clickRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500">CTR</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">
                        {campaign.reviewsReceived}
                      </p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {campaigns.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No campaigns yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first review request campaign to start collecting
                more Google reviews.
              </p>
              <Link to="/create-campaign">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Campaign
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
