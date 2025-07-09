import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold">Willkommen auf der Startseite!</h1>
        <p className="mt-4 text-lg text-gray-700">Dies ist eine temporäre Startseite zur Fehlerbehebung.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Index;