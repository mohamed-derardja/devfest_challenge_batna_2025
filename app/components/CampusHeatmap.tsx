'use client';

import { MapPin, AlertCircle } from 'lucide-react';

export default function CampusHeatmap() {
  const locations = [
    {
      name: 'Bibliotheque Centrale',
      position: { top: '46%', left: '56%' },
      count: 58,
      color: '#DC2626',
      size: 48,
      details: [
        { label: 'Etage 2 - Laptops', count: 28 },
        { label: 'Etage 1 - Livres', count: 15 },
        { label: 'Etage 3 - Electronics', count: 15 },
      ],
      risk: 'ZONE A HAUT RISQUE'
    },
    {
      name: 'Dept. Computer Science',
      position: { top: '52%', left: '38%' },
      count: 35,
      color: '#EA580C',
      size: 40,
      details: [
        { label: 'Administration - Floor 1', count: 20 },
        { label: 'Right Stairs', count: 15 },
      ],
      risk: 'ZONE A RISQUE ELEVE'
    },
    {
      name: 'Restaurant Universitaire',
      position: { top: '58%', left: '48%' },
      count: 25,
      color: '#CA8A04',
      size: 30,
      details: [],
      risk: 'ZONE A RISQUE MOYEN'
    },
    {
      name: 'Residence Universitaire',
      position: { top: '62%', left: '65%' },
      count: 18,
      color: '#16A34A',
      size: 25,
      details: [],
      risk: 'ZONE A RISQUE FAIBLE'
    },
    {
      name: 'Stade Universitaire',
      position: { top: '42%', left: '70%' },
      count: 14,
      color: '#2563EB',
      size: 22,
      details: [],
      risk: 'ZONE A RISQUE FAIBLE'
    },
  ];

  return (
    <div className="space-y-4">
      {/* Satellite Map */}
      <div className="rounded-xl overflow-hidden border-4 border-gray-300 shadow-2xl mb-6 relative" style={{ height: '600px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.8926447891676!2d6.161187876046743!3d35.558044472604074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f4157f1e6f9c0d%3A0x7c3c5b8c5b8c5b8c!2sUniversity%20Batna%202!5e1!3m2!1sen!2sdz!4v1702919234567!5m2!1sen!2sdz"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="University Batna 2 Satellite Map"
        ></iframe>

        {/* Heatmap Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {locations.map((location, idx) => (
            <div
              key={idx}
              className="absolute pointer-events-auto"
              style={{ top: location.position.top, left: location.position.left }}
            >
              <div className="relative group cursor-pointer">
                {/* Pulsing circles */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div 
                    className="rounded-full animate-pulse"
                    style={{
                      width: `${location.size}px`,
                      height: `${location.size}px`,
                      backgroundColor: location.color,
                      opacity: 0.2
                    }}
                  ></div>
                </div>
                <div className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div 
                    className="rounded-full animate-pulse"
                    style={{
                      width: `${location.size * 0.75}px`,
                      height: `${location.size * 0.75}px`,
                      backgroundColor: location.color,
                      opacity: 0.3
                    }}
                  ></div>
                </div>
                <div className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div 
                    className="rounded-full animate-pulse"
                    style={{
                      width: `${location.size * 0.5}px`,
                      height: `${location.size * 0.5}px`,
                      backgroundColor: location.color,
                      opacity: 0.5
                    }}
                  ></div>
                </div>

                {/* Count badge */}
                <div 
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-white px-3 py-1 rounded-full shadow-2xl border-4 border-white font-bold text-xs whitespace-nowrap group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: location.color }}
                >
                  {location.count}
                </div>

                {/* Hover popup */}
                {location.details.length > 0 && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-xl shadow-2xl p-4 w-72 border-4 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                    style={{ borderColor: location.color }}
                  >
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                      <AlertCircle className="w-5 h-5" style={{ color: location.color }} />
                      {location.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {location.details.map((detail, detailIdx) => (
                        <div key={detailIdx} className="flex justify-between p-2 rounded" style={{ backgroundColor: `${location.color}15` }}>
                          <span className="text-gray-700">{detail.label}:</span>
                          <span className="font-bold" style={{ color: location.color }}>
                            {detail.count} items
                          </span>
                        </div>
                      ))}
                      <div className="mt-3 pt-2 border-t-2" style={{ borderColor: `${location.color}40` }}>
                        <div className="font-bold text-center text-xs" style={{ color: location.color }}>
                          {location.risk}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-md p-4 border-2 border-gray-200">
        <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Niveau de Risque
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full shadow"></div>
            <span className="text-xs text-gray-700 font-medium">Tres Eleve (40+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-600 rounded-full shadow"></div>
            <span className="text-xs text-gray-700 font-medium">Eleve (20-40)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-600 rounded-full shadow"></div>
            <span className="text-xs text-gray-700 font-medium">Moyen (10-20)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full shadow"></div>
            <span className="text-xs text-gray-700 font-medium">Faible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full shadow"></div>
            <span className="text-xs text-gray-700 font-medium">Tres Faible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
