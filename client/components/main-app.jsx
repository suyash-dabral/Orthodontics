"use client";

import { useState } from "react";
import { Upload, FileUp, CheckCircle, AlertCircle, Info } from "lucide-react";
import Image from "next/image";
import NearbyClinics from "./nearby-clinics";
import axios from "axios";
import { conditionsData } from "./conditionsData.js";

export default function MainApp() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showClinics, setShowClinics] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    setShowClinics(false);
    // API call to model
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        image: preview.split(",")[1],
      });
      if (!response) {
        throw new Error("Failed to analyze image");
        return;
      }
      const condition = response.data.prediction;
      const conditionRecommendation = conditionsData.find(
        (item) => item.condition === condition,
      );
      setPrediction({
        condition: condition,
        confidence: 92,
        recommendations: conditionRecommendation.recommendations,
      });

      setIsAnalyzing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setPreview(null);
    setPrediction(null);
    setShowClinics(false);
  };

  const toggleClinics = () => {
    setShowClinics(!showClinics);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                  fill="currentColor"
                />
                <path
                  d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                  fill="currentColor"
                />
                <path
                  d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                  fill="currentColor"
                />
                <path
                  d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
                  fill="currentColor"
                />
                <path
                  d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent">
              DentalDiagnose
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Advanced Orthodontic Analysis
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Upload a dental image and our AI will analyze and identify potential
            issues with high accuracy.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-8 rounded-xl shadow-md">
              {!preview ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-teal-500 bg-teal-50" : "border-gray-300 hover:border-teal-400"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  <Upload className="w-16 h-16 text-teal-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Upload Dental Image
                  </h3>
                  <p className="text-gray-500 text-center mb-4">
                    Drag and drop your image here or click to browse
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPG, PNG, JPEG
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative h-64 w-full rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt="Dental image preview"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={resetAnalysis}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Remove
                    </button>
                    {!prediction && (
                      <button
                        onClick={analyzeImage}
                        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition-colors flex items-center gap-2"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <FileUp className="w-4 h-4" />
                            Analyze Image
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md h-full">
              {prediction ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-teal-500 w-8 h-8" />
                    <h3 className="text-2xl font-bold text-gray-800">
                      Analysis Complete
                    </h3>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">
                        Detected Condition:
                      </h4>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-4">
                      {prediction.condition}
                    </p>

                    <h4 className="font-semibold text-gray-700 mb-2">
                      Recommendations:
                    </h4>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="text-teal-500 mt-1">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={toggleClinics}
                    className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {showClinics
                      ? "Hide Nearby Clinics"
                      : "Find Nearby Dental Clinics"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${showClinics ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                    <Info className="w-5 h-5 text-blue-500" />
                    <p>
                      This is an AI-assisted analysis. Always consult with a
                      dental professional for accurate diagnosis.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-500">
                    Upload a dental image and click "Analyze Image" to get
                    started
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {showClinics && <NearbyClinics />}

        <section className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-8">
              <h3 className="text-2xl font-bold mb-4">
                Why Choose Our Technology?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1" />
                  <div>
                    <span className="font-semibold">High Accuracy</span>
                    <p className="text-teal-100 text-sm mt-1">
                      Our AI model has been trained on thousands of dental
                      images for precise diagnosis
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1" />
                  <div>
                    <span className="font-semibold">Fast Results</span>
                    <p className="text-teal-100 text-sm mt-1">
                      Get instant analysis without waiting for appointments
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1" />
                  <div>
                    <span className="font-semibold">Expert Validated</span>
                    <p className="text-teal-100 text-sm mt-1">
                      Our system is developed in collaboration with leading
                      orthodontists
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1" />
                  <div>
                    <span className="font-semibold">Secure & Private</span>
                    <p className="text-teal-100 text-sm mt-1">
                      Your dental images and data are encrypted and never shared
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                How It Works
              </h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-teal-100 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Upload Your Dental Image
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Take a clear photo of your teeth or upload an existing
                      dental X-ray
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-teal-100 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI Analysis</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Our advanced AI model analyzes the image for potential
                      issues
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-teal-100 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Get Detailed Results
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Receive a comprehensive report with potential conditions
                      and recommendations
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-teal-100 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Consult a Professional
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Share your results with your dentist for professional
                      confirmation
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DentalDiagnose</h3>
              <p className="text-gray-300">
                Advanced AI-powered dental analysis for early detection and
                prevention of orthodontic issues.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-300 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-300 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-300 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-300 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-300 space-y-2">
                <p>123 Dental Avenue</p>
                <p>Dehradun, 248001</p>
                <p>Email: info@dentaldiagnose.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} DentalDiagnose. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
