// ... existing code ...

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      toast.error("Bitte alle Felder ausfüllen");
      return;
    }

    setLoading(true);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke("admin-create-employee", {
        body: { email, password, firstName, lastName },
      });

      // Check for invocation errors (e.g., network issues, function not found, timeout)
      if (invokeError) {
        let errorMessage = "Ein unbekannter Fehler bei der Funktionsausführung ist aufgetreten.";
        if (invokeError instanceof Error) {
          errorMessage = invokeError.message;
        }
        // Attempt to get more specific error from context if available
        const functionErrorContext = (invokeError as any).context?.error;
        if (typeof functionErrorContext === 'string') {
          errorMessage = functionErrorContext;
        } else if (functionErrorContext && typeof functionErrorContext.message === 'string') {
          errorMessage = functionErrorContext.message;
        }
        throw new Error(errorMessage);
      }

      // If no invocation error, check the response data for application-level errors
      if (data && data.error) {
        throw new Error(data.error);
      }

      toast.success("Mitarbeiter erfolgreich registriert und Willkommens-E-Mail versandt.");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      fetchEmployees();
    } catch (error) {
      toast.error("Fehler bei der Registrierung: " + (error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

// ... existing code ...