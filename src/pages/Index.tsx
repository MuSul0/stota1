// ... existing imports ...
import ParallaxSection from '@/components/ParallaxSection';

const Index = () => {
  // ... existing code ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <Hero />

      {/* Services Section */}
      <ParallaxSection speed={0.1}>
        <section ref={serviceRef} className="py-20">
          {/* ... existing services content ... */}
        </section>
      </ParallaxSection>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        {/* ... existing stats content ... */}
      </section>

      {/* Values Section */}
      <ParallaxSection speed={0.05}>
        <section className="py-20 bg-gray-50">
          {/* ... existing values content ... */}
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {/* ... existing CTA content ... */}
      </section>

      <Footer />
    </div>
  );
};

export default Index;