import { useTestSupabaseConnection } from '@/hooks/useTestSupabaseConnection';

export const ConnectionStatus = () => {
  const isConnected = useTestSupabaseConnection();

  if (isConnected === null) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-lg">
        Testing Supabase connection...
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isConnected ? (
        'Connected to Supabase successfully!'
      ) : (
        'Failed to connect to Supabase'
      )}
    </div>
  );
};