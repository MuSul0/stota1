<Auth
  supabaseClient={supabase}
  appearance={{ 
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: '#3b82f6',
          brandAccent: '#2563eb'
        }
      }
    }
  }}
  providers={[]}
  theme="light"
/>