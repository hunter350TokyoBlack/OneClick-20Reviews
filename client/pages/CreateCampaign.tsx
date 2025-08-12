import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Star,
  Upload,
  Users,
  MessageSquare,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function CreateCampaign() {
  const [campaignData, setCampaignData] = useState({
    name: "",
    type: "sms", // "sms", "email", "both"
    message: "",
    scheduledFor: "",
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvError, setCsvError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [manualContact, setManualContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultTemplates = {
    sms: "Hi {{firstName}}, thanks for choosing {{businessName}}! We'd love your feedback. Leave us a review: {{link}}",
    email: `Subject: Share Your Experience with {{businessName}}

Hi {{firstName}},

Thank you for choosing {{businessName}}! Your experience matters to us.

Would you mind taking a moment to share your feedback? It would mean the world to us.

Leave a review: {{link}}

Best regards,
The {{businessName}} Team`,
  };

  const handleInputChange = (field: string, value: string) => {
    setCampaignData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setCsvError("Please upload a CSV file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setCsvError("File size must be less than 5MB");
      return;
    }

    setCsvFile(file);
    setCsvError("");
    parseCSV(file);
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const lines = csvText.split("\n").filter((line) => line.trim());

        if (lines.length < 2) {
          setCsvError(
            "CSV file must contain at least a header row and one data row",
          );
          return;
        }

        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
        const requiredFields = ["first name", "last name", "email", "phone"];

        // Check if all required fields are present
        const missingFields = requiredFields.filter(
          (field) =>
            !headers.some((header) => header.includes(field.replace(" ", ""))),
        );

        if (missingFields.length > 0) {
          setCsvError(`Missing required columns: ${missingFields.join(", ")}`);
          return;
        }

        // Parse contacts
        const parsedContacts: Contact[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i]
            .split(",")
            .map((v) => v.trim().replace(/"/g, ""));

          if (values.length >= 4) {
            const contact: Contact = {
              firstName:
                values[headers.findIndex((h) => h.includes("first"))] || "",
              lastName:
                values[headers.findIndex((h) => h.includes("last"))] || "",
              email:
                values[headers.findIndex((h) => h.includes("email"))] || "",
              phone:
                values[headers.findIndex((h) => h.includes("phone"))] || "",
            };

            // Basic validation
            if (
              contact.firstName &&
              contact.lastName &&
              (contact.email || contact.phone)
            ) {
              parsedContacts.push(contact);
            }
          }
        }

        if (parsedContacts.length === 0) {
          setCsvError("No valid contacts found in CSV file");
          return;
        }

        setContacts(parsedContacts);
        setCsvError("");
        setActiveTab("contacts");
      } catch (error) {
        setCsvError("Error parsing CSV file. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  const addManualContact = () => {
    if (
      !manualContact.firstName ||
      !manualContact.lastName ||
      (!manualContact.email && !manualContact.phone)
    ) {
      return;
    }

    setContacts((prev) => [...prev, manualContact]);
    setManualContact({ firstName: "", lastName: "", email: "", phone: "" });
  };

  const removeContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  const downloadCSVTemplate = () => {
    const csvContent =
      "First Name,Last Name,Email,Phone\nJohn,Doe,john@example.com,(555) 123-4567\nJane,Smith,jane@example.com,(555) 987-6543";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts-template.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (!campaignData.name || !campaignData.message || contacts.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Save campaign to backend
      console.log("Creating campaign:", {
        ...campaignData,
        contacts,
        contactCount: contacts.length,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to campaigns page or dashboard
      window.location.href = "/campaigns";
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
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
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Campaign
          </h1>
          <p className="text-gray-600">
            Set up a review request campaign to send to your customers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${activeTab === "details" ? "text-indigo-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === "details" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="font-medium">Campaign Details</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div
              className={`flex items-center space-x-2 ${activeTab === "contacts" ? "text-indigo-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === "contacts" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="font-medium">Add Contacts</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div
              className={`flex items-center space-x-2 ${activeTab === "review" ? "text-indigo-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === "review" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="font-medium">Review & Send</span>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="hidden">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          {/* Campaign Details */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                  Campaign Details
                </CardTitle>
                <CardDescription>
                  Configure your review request campaign settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Campaign Name */}
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name *</Label>
                  <Input
                    id="campaignName"
                    value={campaignData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Holiday Review Campaign 2024"
                  />
                </div>

                {/* Campaign Type */}
                <div className="space-y-3">
                  <Label>Campaign Type *</Label>
                  <RadioGroup
                    value={campaignData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="sms" />
                      <Label
                        htmlFor="sms"
                        className="flex items-center cursor-pointer"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        SMS Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label
                        htmlFor="email"
                        className="flex items-center cursor-pointer"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label
                        htmlFor="both"
                        className="flex items-center cursor-pointer"
                      >
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          <Mail className="w-4 h-4 mr-2" />
                        </div>
                        SMS + Email
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Message Template */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message">Message Template *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const template =
                          campaignData.type === "email"
                            ? defaultTemplates.email
                            : defaultTemplates.sms;
                        handleInputChange("message", template);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                  <Textarea
                    id="message"
                    value={campaignData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Enter your message..."
                    rows={campaignData.type === "email" ? 8 : 4}
                    className="resize-none"
                  />
                  <div className="text-sm text-gray-500">
                    <p className="mb-1">Available placeholders:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "{{firstName}}",
                        "{{lastName}}",
                        "{{businessName}}",
                        "{{link}}",
                      ].map((placeholder) => (
                        <Badge
                          key={placeholder}
                          variant="outline"
                          className="text-xs"
                        >
                          {placeholder}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <Label htmlFor="schedule">Send Time</Label>
                  <RadioGroup
                    defaultValue="now"
                    onValueChange={(value) => {
                      if (value === "now") {
                        handleInputChange("scheduledFor", "");
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="now" id="now" />
                      <Label htmlFor="now">Send immediately</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="later" id="later" />
                      <Label htmlFor="later">Schedule for later</Label>
                    </div>
                  </RadioGroup>
                  <Input
                    type="datetime-local"
                    value={campaignData.scheduledFor}
                    onChange={(e) =>
                      handleInputChange("scheduledFor", e.target.value)
                    }
                    className="mt-2"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setActiveTab("contacts")}
                    disabled={!campaignData.name || !campaignData.message}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Next: Add Contacts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts */}
          <TabsContent value="contacts">
            <div className="space-y-6">
              {/* CSV Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-indigo-600" />
                    Upload Contacts
                  </CardTitle>
                  <CardDescription>
                    Upload a CSV file with your customer contacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {csvError && (
                    <Alert className="mb-4 border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        {csvError}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={downloadCSVTemplate}
                        className="flex items-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Template
                      </Button>
                      <div className="text-sm text-gray-500">
                        Required: First Name, Last Name, Email, Phone
                      </div>
                    </div>

                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {csvFile ? csvFile.name : "Drop your CSV file here"}
                      </p>
                      <p className="text-gray-500">or click to browse files</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manual Contact Entry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-indigo-600" />
                    Add Contact Manually
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="manualFirstName">First Name</Label>
                      <Input
                        id="manualFirstName"
                        value={manualContact.firstName}
                        onChange={(e) =>
                          setManualContact((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manualLastName">Last Name</Label>
                      <Input
                        id="manualLastName"
                        value={manualContact.lastName}
                        onChange={(e) =>
                          setManualContact((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manualEmail">Email</Label>
                      <Input
                        id="manualEmail"
                        type="email"
                        value={manualContact.email}
                        onChange={(e) =>
                          setManualContact((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manualPhone">Phone</Label>
                      <Input
                        id="manualPhone"
                        type="tel"
                        value={manualContact.phone}
                        onChange={(e) =>
                          setManualContact((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={addManualContact}
                    disabled={
                      !manualContact.firstName ||
                      !manualContact.lastName ||
                      (!manualContact.email && !manualContact.phone)
                    }
                    className="mt-4"
                  >
                    Add Contact
                  </Button>
                </CardContent>
              </Card>

              {/* Contacts List */}
              {contacts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-indigo-600" />
                        Contacts ({contacts.length})
                      </div>
                      <Badge variant="secondary">
                        {contacts.length} contacts
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {contacts.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {contact.firstName} {contact.lastName}
                            </div>
                            <div className="text-sm text-gray-500 space-x-4">
                              {contact.email && <span>{contact.email}</span>}
                              {contact.phone && <span>{contact.phone}</span>}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContact(index)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("details")}
                >
                  Back
                </Button>
                <Button
                  onClick={() => setActiveTab("review")}
                  disabled={contacts.length === 0}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Next: Review & Send
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Review */}
          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                  Review Campaign
                </CardTitle>
                <CardDescription>
                  Review your campaign details before sending
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Campaign Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Campaign Name
                      </Label>
                      <p className="text-gray-900">{campaignData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Type
                      </Label>
                      <div className="flex items-center space-x-2">
                        {campaignData.type === "sms" && (
                          <Phone className="w-4 h-4" />
                        )}
                        {campaignData.type === "email" && (
                          <Mail className="w-4 h-4" />
                        )}
                        {campaignData.type === "both" && (
                          <>
                            <Phone className="w-4 h-4" />
                            <Mail className="w-4 h-4" />
                          </>
                        )}
                        <span className="capitalize">
                          {campaignData.type === "both"
                            ? "SMS + Email"
                            : campaignData.type}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Contacts
                      </Label>
                      <p className="text-gray-900">
                        {contacts.length} recipients
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Message Preview
                      </Label>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        {campaignData.message
                          .replace(/\{\{firstName\}\}/g, "John")
                          .replace(/\{\{lastName\}\}/g, "Doe")
                          .replace(/\{\{businessName\}\}/g, "Your Business")
                          .replace(
                            /\{\{link\}\}/g,
                            "https://oneclick.reviews/r/abc123",
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("contacts")}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {isLoading
                      ? "Creating Campaign..."
                      : "Create & Send Campaign"}
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
