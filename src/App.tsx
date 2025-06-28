import { SessionProvider } from '@/context/SessionContext';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <SessionProvider>
      {/* Ihre bestehenden Routen */}
      <Toaster position="top-center" />
    </SessionProvider>
  );
}

export default App;