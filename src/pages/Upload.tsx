import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Upload as UploadIcon, 
  FileText, 
  IndianRupee, 
  CheckCircle,
  AlertCircle,
  Image
} from "lucide-react";
import { toast } from "sonner";
import { uploadSchema, validatePdfFile, validateImageFile, type UploadFormData } from "@/lib/validation";

const categories = [
  "Engineering",
  "Science",
  "Medical",
  "Law",
  "Business",
  "Arts",
  "Competitive Exams",
  "Other",
];

const Upload = () => {
  const [formData, setFormData] = useState<UploadFormData>({
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
    pages: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof UploadFormData, string>>>({});
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverError, setCoverError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof UploadFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPdfError("");
    
    const validation = validatePdfFile(file);
    if (!validation.valid && validation.error) {
      setPdfError(validation.error);
      setPdfFile(null);
      toast.error(validation.error);
      return;
    }
    
    setPdfFile(file);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCoverError("");
    
    const validation = validateImageFile(file);
    if (!validation.valid && validation.error) {
      setCoverError(validation.error);
      setCoverImage(null);
      toast.error(validation.error);
      return;
    }
    
    setCoverImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setPdfError("");
    setCoverError("");
    
    // Validate form data with zod
    const result = uploadSchema.safeParse(formData);
    
    if (!result.success) {
      const errors: Partial<Record<keyof UploadFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof UploadFormData;
        errors[field] = err.message;
      });
      setFormErrors(errors);
      toast.error("Please fix the form errors");
      return;
    }
    
    // Validate PDF file
    const pdfValidation = validatePdfFile(pdfFile);
    if (!pdfValidation.valid) {
      setPdfError(pdfValidation.error || "PDF file is required");
      toast.error(pdfValidation.error || "PDF file is required");
      return;
    }
    
    // Validate cover image (optional but must be valid if provided)
    const coverValidation = validateImageFile(coverImage);
    if (!coverValidation.valid) {
      setCoverError(coverValidation.error || "Invalid cover image");
      toast.error(coverValidation.error || "Invalid cover image");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate upload (would be replaced with actual backend call)
    setTimeout(() => {
      toast.success("Your book has been uploaded successfully!");
      setIsSubmitting(false);
      setFormData({
        title: "",
        author: "",
        category: "",
        price: "",
        description: "",
        pages: "",
      });
      setPdfFile(null);
      setCoverImage(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Sell Your Study Materials
            </h1>
            <p className="text-muted-foreground">
              Help fellow students while earning from your hard work
            </p>
          </div>
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="shadow-soft text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <UploadIcon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Easy Upload</p>
                <p className="text-xs text-muted-foreground">PDF format supported</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-2">
                  <IndianRupee className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-sm font-medium">Set Your Price</p>
                <p className="text-xs text-muted-foreground">You decide the value</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium">Instant Publish</p>
                <p className="text-xs text-muted-foreground">Go live immediately</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Upload Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-serif">Upload Details</CardTitle>
              <CardDescription>
                Fill in the details about your study material
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Data Structures Complete Notes"
                    className={formErrors.title ? "border-destructive" : ""}
                    maxLength={200}
                  />
                  {formErrors.title && (
                    <p className="text-sm text-destructive">{formErrors.title}</p>
                  )}
                </div>
                
                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author">Author / Source</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="e.g., Prof. Sharma or Self-made"
                    className={formErrors.author ? "border-destructive" : ""}
                    maxLength={100}
                  />
                  {formErrors.author && (
                    <p className="text-sm text-destructive">{formErrors.author}</p>
                  )}
                </div>
                
                {/* Category & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full h-10 rounded-lg border ${formErrors.category ? "border-destructive" : "border-input"} bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring`}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {formErrors.category && (
                      <p className="text-sm text-destructive">{formErrors.category}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        max="10000"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="49"
                        className={`pl-8 ${formErrors.price ? "border-destructive" : ""}`}
                      />
                    </div>
                    {formErrors.price && (
                      <p className="text-sm text-destructive">{formErrors.price}</p>
                    )}
                  </div>
                </div>
                
                {/* Pages */}
                <div className="space-y-2">
                  <Label htmlFor="pages">Number of Pages</Label>
                  <Input
                    id="pages"
                    name="pages"
                    type="number"
                    min="1"
                    max="10000"
                    value={formData.pages}
                    onChange={handleInputChange}
                    placeholder="e.g., 150"
                    className={formErrors.pages ? "border-destructive" : ""}
                  />
                  {formErrors.pages && (
                    <p className="text-sm text-destructive">{formErrors.pages}</p>
                  )}
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what's included in your study material..."
                    rows={4}
                    className={formErrors.description ? "border-destructive" : ""}
                    maxLength={2000}
                  />
                  {formErrors.description && (
                    <p className="text-sm text-destructive">{formErrors.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/2000 characters (minimum 20)
                  </p>
                </div>
                
                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PDF Upload */}
                  <div className="space-y-2">
                    <Label>PDF File * (max 50MB)</Label>
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${pdfError ? "border-destructive" : "border-border"} rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {pdfFile ? (
                          <>
                            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                            <p className="text-sm text-foreground font-medium">{pdfFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-primary">Click to upload</span> PDF
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={handlePdfChange}
                      />
                    </label>
                    {pdfError && (
                      <p className="text-sm text-destructive">{pdfError}</p>
                    )}
                  </div>
                  
                  {/* Cover Image Upload */}
                  <div className="space-y-2">
                    <Label>Cover Image (optional, max 5MB)</Label>
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${coverError ? "border-destructive" : "border-border"} rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {coverImage ? (
                          <>
                            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                            <p className="text-sm text-foreground font-medium">{coverImage.name}</p>
                          </>
                        ) : (
                          <>
                            <Image className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-primary">Click to upload</span> image
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        onChange={handleCoverChange}
                      />
                    </label>
                    {coverError && (
                      <p className="text-sm text-destructive">{coverError}</p>
                    )}
                  </div>
                </div>
                
                {/* Terms Notice */}
                <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    By uploading, you confirm that you have the rights to share this material 
                    and it doesn't violate any copyright.
                  </p>
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Uploading..."
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5 mr-2" />
                      Publish Material
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
