import { useState } from "react";
import { Reorder } from "framer-motion";
import { MapPin, Edit2, Trash2 } from "lucide-react";
import mockData from "../asserts/mockData";
    
const mockItinerary = mockData();

export default function ItineraryApp() {
  const [itinerary, setItinerary] = useState(mockItinerary);
  const [selected, setSelected] = useState(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Itinerary List */}
      <div className="w-full md:w-1/2 overflow-y-auto p-4 bg-white">
        <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
        <Reorder.Group axis="y" values={itinerary} onReorder={setItinerary}>
          {itinerary.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              onClick={() => setSelected(item)}
              className="flex items-start bg-gray-100 rounded-lg p-3 mb-4 gap-3 cursor-pointer hover:bg-gray-200 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">{item.title}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>{item.rating} ⭐ ({item.reviews})</span>
                </div>
              </div>
              <div className="hidden md:flex flex-col gap-2 items-center">
                <MapPin className="text-blue-600 hover:scale-110" size={18} />
                <Edit2 className="text-gray-600" size={18} />
                <Trash2 className="text-red-500" size={18} />
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* Right Map Display */}
      {selected && (
        <div className="hidden md:block w-1/2 h-full">
          <iframe
            title="map"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${selected.location.lat},${selected.location.lng}&z=15&output=embed`}
          ></iframe>
        </div>
      )}

      {/* Mobile Bottom Map Icon */}
      {isMobile && selected && (
        <a
          href={`https://maps.google.com/maps?q=${selected.location.lat},${selected.location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          <MapPin />
        </a>
      )}
    </div>
  );
}
