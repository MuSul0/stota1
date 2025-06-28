import { useTestSupabaseConnection } from '@/utils/testSupabaseConnection';

export const ConnectionStatus = () => {
  const isConnected = useTestSupabaseConnection();

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      {isConnected === undefined ? (
        <p className="text-yellow-600">Testing Supabase connection...</p>
      ) : isConnected ? (
        <p className="text-green-600">Connected to Supabase successfully!</p>
      ) : (
        <p className="text-red-600">Failed to connect to Supabase</p>
      )}
    </div>
  );
};