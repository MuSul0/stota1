// ... (vorheriger Import-Teil bleibt gleich)

const Login = () => {
  // ... (vorheriger Code bleibt gleich bis zum Auth-Component)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        {/* ... (vorheriger Code bleibt gleich) */}
        
        <TabsContent value="employee" className="mt-6">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#10b981',
                    brandAccent: '#059669'
                  }
                }
              }
            }}
            localization={{ 
              variables: {
                ...germanTranslations,
                sign_up: {
                  link_text: '', // Entfernt den Registrierungs-Link
                }
              }
            }}
            onAuthStateChange={handleAuthStateChange}
            showLinks={false} // Deaktiviert alle Links (Passwort vergessen, Registrierung)
          />
          <p className="text-sm text-gray-500 mt-4 text-center">
            Mitarbeiterkonten werden vom Administrator vergeben. Bitte wenden Sie sich an Ihren Vorgesetzten.
          </p>
        </TabsContent>

        {/* ... (restlicher Code bleibt gleich) */}
      </Card>
    </div>
  );
};

export default Login;