import { MapPin } from "lucide-react";

interface MapProps {
  latitude?: string;
  longitude?: string;
  title?: string;
  className?: string;
}

export default function Map({ latitude, longitude, title, className = "h-64" }: MapProps) {
  // This is a placeholder for map integration
  // In a real app, you would use Google Maps, OpenStreetMap, or another mapping service
  
  return (
    <div className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}>
      <div className="text-center">
        <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
        <p className="text-gray-600 font-medium">Interactive Map</p>
        {title && <p className="text-sm text-gray-500">{title}</p>}
        {latitude && longitude && (
          <p className="text-xs text-gray-400 mt-1">
            {latitude}, {longitude}
          </p>
        )}
      </div>
    </div>
  );
}
