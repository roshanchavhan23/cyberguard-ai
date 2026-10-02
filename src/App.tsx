import { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import EmergencyHeader from '@/components/EmergencyHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatDrawer from '@/components/ChatDrawer';
import HomePage from '@/pages/HomePage';
import DetectorPage from '@/pages/DetectorPage';
import HarassmentHubPage from '@/pages/HarassmentHubPage';
import GuiderPage from '@/pages/GuiderPage';
import HelplinesPage from '@/pages/HelplinesPage';
import LawsPage from '@/pages/LawsPage';
import GuidelinesPage from '@/pages/GuidelinesPage';
import FormGuidePage from '@/pages/FormGuidePage';
import VideosPage from '@/pages/VideosPage';
import StoriesPage from '@/pages/StoriesPage';
import PortalsPage from '@/pages/PortalsPage';
import type { PageId } from '@/types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  const handleNavigate = (page: PageId) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'detector':
        return <DetectorPage />;
      case 'harassment':
        return <HarassmentHubPage />;
      case 'guider':
        return <GuiderPage />;
      case 'helplines':
        return <HelplinesPage />;
      case 'laws':
        return <LawsPage />;
      case 'guidelines':
        return <GuidelinesPage />;
      case 'formguide':
        return <FormGuidePage />;
      case 'videos':
        return <VideosPage />;
      case 'stories':
        return <StoriesPage />;
      case 'portals':
        return <PortalsPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-cyber-bg flex flex-col">
        <EmergencyHeader />
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1">{renderPage()}</main>
        <Footer onNavigate={handleNavigate} />
        <ChatDrawer />
      </div>
    </LanguageProvider>
  );
}

export default App;
