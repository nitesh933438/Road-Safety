/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MOCK_SERVICES, MOCK_BLACK_SPOTS, EmergencyService, AccidentReport } from '../data/mapData';
import { MapControlsOverlay } from '../components/map/MapControlsOverlay';
import { AccidentReportModal } from '../components/map/AccidentReportModal';
import { EmergencyShareModal } from '../components/map/EmergencyShareModal';
import { ServicePopup } from '../components/map/ServicePopup';
import { EmergencyMap } from '../components/map/EmergencyMap';

export const SmartEmergencyMapPage: React.FC = () => {
  const [filters, setFilters] = useState({
    hospitals: true,
    trauma: true,
    police: true,
    ambulance: true,
    blood: true,
    fire: true,
    petrol: true,
    reports: true,
    blackSpots: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState<AccidentReport[]>(() => {
    const saved = localStorage.getItem('roadguard_accident_reports');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rep1',
        lat: 28.6150,
        lng: 77.2100,
        address: 'NH-48 Mile Marker 142',
        dateTime: 'Today, 10:30 AM',
        accidentType: 'Car Collision',
        severity: 'High',
        injuredCount: 2,
        vehicleType: 'Sedan & SUV',
        description: 'Multi-vehicle bumper collision blocking fast lane.',
        aiRecommendation: 'Dispatch Level-1 Trauma Ambulance immediately.',
      }
    ];
  });

  const [activePopupItem, setActivePopupItem] = useState<{ item: EmergencyService | AccidentReport; type: 'service' | 'report' } | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const weather = {
    temp: '32°C',
    rain: '0% Rain',
    visibility: '10 km (Clear)',
    roadCondition: 'Dry & Safe',
  };

  useEffect(() => {
    localStorage.setItem('roadguard_accident_reports', JSON.stringify(reports));
  }, [reports]);

  const handleNewReportSubmit = (newReport: AccidentReport) => {
    setReports([newReport, ...reports]);
  };

  const handleNavigateToItem = (item: EmergencyService | AccidentReport) => {
    const itemName = 'name' in item ? item.name : item.accidentType;
    alert(`GPS Navigation initialized to ${itemName}. Estimated travel time: 4 mins.`);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
      {/* Reusable Smart Emergency Map */}
      <EmergencyMap
        services={MOCK_SERVICES}
        reports={reports}
        blackSpots={MOCK_BLACK_SPOTS}
        filters={filters}
        searchQuery={searchQuery}
        onSelectService={(service) => setActivePopupItem({ item: service, type: 'service' })}
        onSelectReport={(rep) => setActivePopupItem({ item: rep, type: 'report' })}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Floating Controls & Search Overlay */}
      <MapControlsOverlay
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        weather={weather}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenShareCard={() => setIsShareModalOpen(true)}
      />

      {/* Popup Dialog card overlay if marker selected */}
      {activePopupItem && (
        <div className="absolute bottom-6 left-6 z-[1000]">
          <ServicePopup
            item={activePopupItem.item}
            onNavigate={() => handleNavigateToItem(activePopupItem.item)}
            onClose={() => setActivePopupItem(null)}
          />
        </div>
      )}

      {/* Accident Report Modal */}
      <AccidentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleNewReportSubmit}
      />

      {/* Emergency Share Modal */}
      <EmergencyShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

