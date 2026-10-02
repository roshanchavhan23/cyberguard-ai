import { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import EmergencyHeader from '@/components/EmergencyHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatDrawer from '@/components/ChatDrawer';
import HomePage from '@/pages/HomePage';
import DetectorPage from '@/pages/DetectorPage';
import GuidelinesPage from '@/pages/GuidelinesPage';
import GuiderPage from '@/pages/GuiderPage';
import FormGuidePage from '@/pages/FormGuidePage';
import VideosPage from '@/pages/VideosPage';
import StoriesPage from '@/pages/StoriesPage';
import LawsPage from '@/pages/LawsPage';
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
      case 'guidelines':
        return <GuidelinesPage />;
      case 'guider':
        return <GuiderPage />;
      case 'formguide':
        return <FormGuidePage />;
      case 'videos':
        return <VideosPage />;
      case 'stories':
        return <StoriesPage />;
      case 'laws':
        return <LawsPage />;
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
