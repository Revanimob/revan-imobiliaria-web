
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import FeaturedProperties from '@/components/FeaturedProperties';
import Services from '@/components/Services';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import { PropertyProvider } from '@/contexts/PropertyContext';

const Index = () => {
  return (
    <PropertyProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroBanner />
          <SearchBar />
          <FeaturedProperties />
          <Services />
          <AboutUs />
        </main>
        <Footer />
      </div>
    </PropertyProvider>
  );
};

export default Index;
