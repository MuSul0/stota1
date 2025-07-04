import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <h1 className="text-4xl font-bold text-center mt-8">Willkommen bei Nikolai Transport</h1>
      </main>
      <Footer />
    </div>
  );
}