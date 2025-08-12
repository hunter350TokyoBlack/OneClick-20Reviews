import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ExternalLink, CheckCircle, AlertCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessSetup() {
  const [formData, setFormData] = useState({
    businessName: "",
    googlePlaceId: "",
    businessAddress: "",
    businessPhone: "",
    businessWebsite: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const searchGooglePlaces = async () => {
    if (!formData.businessName.trim()) {
      setError("Please enter your business name first");
      return;
    }

    setIsSearching(true);
    setError("");
    
    try {
      // Simulate Google Places API search
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock search results
      const mockResults = [
        {
          place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
          name: formData.businessName,
          formatted_address: "123 Main St, Anytown, ST 12345, USA",
          rating: 4.5,
          user_ratings_total: 127,
          types: ["restaurant", "food", "establishment"]
        },
        {
          place_id: "ChIJrTLr-GyuEmsRBfy61i59si0",
          name: `${formData.businessName} - Downtown`,
          formatted_address: "456 Commerce Ave, Anytown, ST 12345, USA", 
          rating: 4.2,
          user_ratings_total: 89,
          types: ["store", "establishment"]
        }
      ];
      
      setSearchResults(mockResults);
    } catch (err) {
      setError("Failed to search Google Places. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const selectPlace = (place: any) => {
    setFormData(prev => ({
      ...prev,
      googlePlaceId: place.place_id,
      businessAddress: place.formatted_address,
      businessName: place.name
    }));
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.businessName || !formData.googlePlaceId) {
      setError("Please fill in all required fields and select your business from Google Places.");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Save business setup to backend
      console.log("Business setup:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
      
    } catch (err) {
      setError("Failed to save business setup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full border-0 shadow-xl bg-white/90 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
            <p className="text-gray-600 mb-4">
              Your business has been successfully configured. Redirecting to dashboard...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                OneClick Reviews
              </span>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">
                Skip Setup
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-indigo-100 text-indigo-700">
            Step 1 of 2
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Set Up Your Business
          </h1>
          <p className="text-lg text-gray-600">
            Connect your Google Business Profile to start collecting reviews
          </p>
        </div>

        {/* Form */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
              Business Information
            </CardTitle>
            <CardDescription>
              We'll use this information to create personalized review links for your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                  Business Name *
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="Enter your business name"
                    className="flex-1"
                    required
                  />
                  <Button 
                    type="button" 
                    onClick={searchGooglePlaces}
                    disabled={isSearching || !formData.businessName.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Click search to find your business on Google Maps
                </p>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Select Your Business
                  </Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {searchResults.map((place, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.googlePlaceId === place.place_id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => selectPlace(place)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{place.name}</h4>
                            <p className="text-sm text-gray-600">{place.formatted_address}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(place.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-gray-600 ml-1">
                                  {place.rating} ({place.user_ratings_total} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          {formData.googlePlaceId === place.place_id && (
                            <CheckCircle className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Google Place ID (shows when selected) */}
              {formData.googlePlaceId && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Google Place ID
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={formData.googlePlaceId}
                      readOnly
                      className="bg-gray-50 text-gray-700"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://www.google.com/maps/place/?q=place_id:${formData.googlePlaceId}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    This ID links your campaigns to your Google Business Profile
                  </p>
                </div>
              )}

              {/* Additional Business Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone" className="text-sm font-medium text-gray-700">
                    Business Phone
                  </Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    value={formData.businessPhone}
                    onChange={(e) => handleInputChange("businessPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessWebsite" className="text-sm font-medium text-gray-700">
                    Website
                  </Label>
                  <Input
                    id="businessWebsite"
                    type="url"
                    value={formData.businessWebsite}
                    onChange={(e) => handleInputChange("businessWebsite", e.target.value)}
                    placeholder="https://yourbusiness.com"
                  />
                </div>
              </div>

              {/* Business Address (auto-filled from Google) */}
              {formData.businessAddress && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Business Address
                  </Label>
                  <Input
                    value={formData.businessAddress}
                    readOnly
                    className="bg-gray-50 text-gray-700"
                  />
                </div>
              )}

              <div className="flex space-x-4">
                <Link to="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Skip for Now
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isLoading || !formData.googlePlaceId}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isLoading ? "Saving..." : "Continue to Dashboard"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Why do we need your Google Place ID?
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                Your Google Place ID allows us to create direct links to your Google Business Profile review page. 
                When customers click your review request links, they'll be taken directly to leave a review for your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
