import React, { useState, useEffect, useRef } from "react";
import { MapPin, Star, Phone, Clock, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const SEARCH_RADIUS_METERS = 5000;

// Improved script loading with singleton pattern
const loadGoogleMapsScript = (() => {
  let isLoading = false;
  let isLoaded = false;
  const callbacks = [];

  const executeCallbacks = () => {
    isLoaded = true;
    isLoading = false;
    callbacks.forEach((callback) => callback());
    callbacks.length = 0; // Clear the callbacks
  };

  return (callback) => {
    if (isLoaded && window.google && window.google.maps) {
      callback();
      return;
    }

    // Add to callback queue
    callbacks.push(callback);

    if (isLoading) {
      return;
    }

    // Start loading
    isLoading = true;
    const script = document.createElement("script");

    window.initGoogleMaps = function () {
      console.log("Google Maps API loaded successfully");
      executeCallbacks();
    };

    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      isLoading = false;
      console.error("Failed to load Google Maps API");
      executeCallbacks();
    };

    document.head.appendChild(script);
  };
})();

const NearbyClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript(() => setScriptLoaded(true));
  }, []);

  useEffect(() => {
    if (scriptLoaded) getUserLocation();
  }, [scriptLoaded]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyClinics(latitude, longitude);
        },
        () => setLoading(false),
        { timeout: 10000, maximumAge: 60000 },
      );
    } else {
      setLoading(false);
    }
  };

  const fetchNearbyClinics = async (latitude, longitude) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      setLoading(false);
      return;
    }

    try {
      const { Place, SearchNearbyRankPreference } =
        await google.maps.importLibrary("places");
      const center = new window.google.maps.LatLng(latitude, longitude);

      const request = {
        fields: [
          "displayName",
          "location",
          "businessStatus",
          "formattedAddress",
          "websiteURI",
          "rating",
          "googleMapsURI",
          "photos",
        ],
        locationRestriction: { center, radius: SEARCH_RADIUS_METERS },
        includedPrimaryTypes: ["dentist", "dental_clinic"],
        maxResultCount: 10,
        rankPreference: SearchNearbyRankPreference.DISTANCE,
      };

      const { places } = await Place.searchNearby(request);

      const formattedResult = await Promise.all(
        places.map((place) => getPlaceDetails(place, latitude, longitude)),
      );

      setClinics(formattedResult);
    } catch (err) {
      console.error("Error fetching clinics:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceDetails = async (place, userLat, userLng) => {
    const fallbackImage =
      "https://plus.unsplash.com/premium_vector-1682270082955-4c1770867a88?q=80&w=2226&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const image =
      place.photos?.[0]?.getURI && typeof place.photos[0].getURI() === "string"
        ? place.photos[0].getURI()
        : fallbackImage;

    return {
      id: place.id,
      name: place.displayName || "Unnamed Location",
      address: place.formattedAddress || "Address unavailable",
      distance: "0.0", // update this if needed
      rating: place.rating || 0,
      website: place.websiteURI || "",
      googleMapURI: place.googleMapsURI || "",
      image: image,
    };
  };

  return (
    <div className="mt-2 mb-4 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Nearby Dental Clinics
        </h3>
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        {!loading &&
          clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] bg-white rounded-lg shadow hover:shadow-md border border-gray-100 transition-all"
            >
              <img
                src={clinic.image}
                alt={clinic.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h4 className="font-semibold text-gray-800 mb-1">
                  {clinic.name}
                </h4>
                <div className="text-sm text-gray-500 flex items-start gap-1">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="break-words">{clinic.address}</span>
                </div>

                <div className="mt-2 flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="w-4 h-4" />
                  <span>{clinic.rating}</span>
                </div>
                {clinic.website && (
                  <div className="mt-3">
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-teal-600 hover:underline"
                    >
                      Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}
                <div className="mt-3">
                  <a
                    href={clinic.googleMapURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-teal-600 hover:underline"
                  >
                    See in Google Maps <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NearbyClinics;
