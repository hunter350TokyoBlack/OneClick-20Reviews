import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Star, 
  Settings as SettingsIcon, 
  Key, 
  Bell, 
  User, 
  Building, 
  CreditCard,
  Shield,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showTwilioKey, setShowTwilioKey] = useState(false);
  const [showSendGridKey, setShowSendGridKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
  });

  const [businessData, setBusinessData] = useState({
    businessName: "Joe's Restaurant",
    googlePlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    businessAddress: "123 Main St, Anytown, ST 12345",
    businessPhone: "(555) 123-4567",
    businessWebsite: "https://joesrestaurant.com",
  });

  const [apiKeys, setApiKeys] = useState({
    twilioAccountSid: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    twilioAuthToken: "••••••••••••••••••••••••••••••••",
    twilioPhoneNumber: "+15551234567",
    sendGridApiKey: "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••",
    sendGridFromEmail: "noreply@joesrestaurant.com",
    sendGridFromName: "Joe's Restaurant",
  });

  const [notifications, setNotifications] = useState({
    emailCampaignResults: true,
    emailNewReviews: true,
    emailWeeklyReport: false,
    smsDeliveryFailures: true,
    smsCampaignComplete: false,
  });

  const handleSave = async (section: string) => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // TODO: Save to backend
      console.log(`Saving ${section}:`, { profileData, businessData, apiKeys, notifications });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const testTwilioConnection = async () => {
    // TODO: Test Twilio API connection
    console.log("Testing Twilio connection...");
  };

  const testSendGridConnection = async () => {
    // TODO: Test SendGrid API connection
    console.log("Testing SendGrid connection...");
  };

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
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3 text-indigo-600" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your account, business, and integration settings</p>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Business
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center">
              <Key className="w-4 h-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave("profile")}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Settings */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Manage your business details and Google Business Profile connection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessData.businessName}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googlePlaceId">Google Place ID</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="googlePlaceId"
                      value={businessData.googlePlaceId}
                      onChange={(e) => setBusinessData(prev => ({ ...prev, googlePlaceId: e.target.value }))}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => window.open(`https://www.google.com/maps/place/?q=place_id:${businessData.googlePlaceId}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    This links your campaigns to your Google Business Profile review page
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input
                    id="businessAddress"
                    value={businessData.businessAddress}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, businessAddress: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business Phone</Label>
                    <Input
                      id="businessPhone"
                      type="tel"
                      value={businessData.businessPhone}
                      onChange={(e) => setBusinessData(prev => ({ ...prev, businessPhone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessWebsite">Website</Label>
                    <Input
                      id="businessWebsite"
                      type="url"
                      value={businessData.businessWebsite}
                      onChange={(e) => setBusinessData(prev => ({ ...prev, businessWebsite: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave("business")}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys & Integrations */}
          <TabsContent value="integrations">
            <div className="space-y-6">
              {/* Twilio Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold text-sm">T</span>
                      </div>
                      Twilio (SMS)
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </CardTitle>
                  <CardDescription>
                    Configure your Twilio credentials for SMS campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twilioSid">Account SID</Label>
                    <Input
                      id="twilioSid"
                      value={apiKeys.twilioAccountSid}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, twilioAccountSid: e.target.value }))}
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twilioToken">Auth Token</Label>
                    <div className="relative">
                      <Input
                        id="twilioToken"
                        type={showTwilioKey ? "text" : "password"}
                        value={apiKeys.twilioAuthToken}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, twilioAuthToken: e.target.value }))}
                        placeholder="Your Twilio Auth Token"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowTwilioKey(!showTwilioKey)}
                      >
                        {showTwilioKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twilioPhone">Phone Number</Label>
                    <Input
                      id="twilioPhone"
                      value={apiKeys.twilioPhoneNumber}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, twilioPhoneNumber: e.target.value }))}
                      placeholder="+15551234567"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={testTwilioConnection}>
                      Test Connection
                    </Button>
                    <Button 
                      onClick={() => handleSave("twilio")}
                      disabled={isSaving}
                    >
                      Save Twilio Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* SendGrid Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold text-sm">S</span>
                      </div>
                      SendGrid (Email)
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </CardTitle>
                  <CardDescription>
                    Configure your SendGrid credentials for email campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sendGridKey">API Key</Label>
                    <div className="relative">
                      <Input
                        id="sendGridKey"
                        type={showSendGridKey ? "text" : "password"}
                        value={apiKeys.sendGridApiKey}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, sendGridApiKey: e.target.value }))}
                        placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowSendGridKey(!showSendGridKey)}
                      >
                        {showSendGridKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={apiKeys.sendGridFromEmail}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, sendGridFromEmail: e.target.value }))}
                        placeholder="noreply@yourbusiness.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={apiKeys.sendGridFromName}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, sendGridFromName: e.target.value }))}
                        placeholder="Your Business Name"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={testSendGridConnection}>
                      Test Connection
                    </Button>
                    <Button 
                      onClick={() => handleSave("sendgrid")}
                      disabled={isSaving}
                    >
                      Save SendGrid Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about campaign activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Campaign Results</Label>
                      <p className="text-sm text-gray-500">Get notified when campaigns complete</p>
                    </div>
                    <Switch
                      checked={notifications.emailCampaignResults}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailCampaignResults: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Reviews</Label>
                      <p className="text-sm text-gray-500">Get notified when you receive new reviews</p>
                    </div>
                    <Switch
                      checked={notifications.emailNewReviews}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailNewReviews: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                    </div>
                    <Switch
                      checked={notifications.emailWeeklyReport}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailWeeklyReport: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Delivery Failures</Label>
                      <p className="text-sm text-gray-500">Get notified about failed SMS deliveries</p>
                    </div>
                    <Switch
                      checked={notifications.smsDeliveryFailures}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, smsDeliveryFailures: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Campaign Completion (SMS)</Label>
                      <p className="text-sm text-gray-500">Get SMS when campaigns complete</p>
                    </div>
                    <Switch
                      checked={notifications.smsCampaignComplete}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, smsCampaignComplete: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave("notifications")}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isSaving ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Pro Plan</h3>
                      <p className="text-gray-600">$49/month - Unlimited campaigns</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">$49</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Payment Method</h4>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Usage This Month</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-indigo-600">1,429</p>
                      <p className="text-sm text-gray-500">Messages Sent</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-gray-500">Active Campaigns</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">∞</p>
                      <p className="text-sm text-gray-500">Remaining</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline">
                    View Invoices
                  </Button>
                  <Button variant="outline">
                    Update Billing
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
