import { createContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Session } from '@supabase/supabase-js'

interface SessionContextType {
  session: Session | null
  user: any | null
  isAdmin: boolean
  isLoading: boolean
  isDemo: boolean
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
  isAdmin: false,
  isLoading: true,
  isDemo: false
})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SessionContextType>({
    session: null,
    user: null,
    isAdmin: false,
    isLoading: true,
    isDemo: false
  })

  useEffect(() => {
    // Demo-Modus aktivieren wenn URL Parameter ?demo=true
    const urlParams = new URLSearchParams(window.location.search)
    const demoMode = urlParams.get('demo') === 'true'

    if (demoMode) {
      setState({
        session: null,
        user: {
          id: 'demo-user-id',
          email: 'demo@nikolai-transport.de',
          user_metadata: { name: 'Demo Admin' }
        },
        isAdmin: true,
        isLoading: false,
        isDemo: true
      })
      return
    }

    // Normale Authentifizierung
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session error:', error)
        return setState(prev => ({ ...prev, isLoading: false }))
      }

      const user = session?.user ?? null
      let isAdmin = false

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        isAdmin = profile?.role === 'admin'
      }

      setState({
        session,
        user,
        isAdmin,
        isLoading: false,
        isDemo: false
      })
    }

    fetchSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      setState(prev => ({
        ...prev,
        session,
        user,
        isLoading: false
      }))
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <SessionContext.Provider value={state}>
      {children}
    </SessionContext.Provider>
  )
}