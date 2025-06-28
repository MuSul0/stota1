import { createContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Session } from '@supabase/supabase-js'

interface SessionContextType {
  session: Session | null
  user: any | null
  isAdmin: boolean
  isLoading: boolean
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
  isAdmin: false,
  isLoading: true
})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SessionContextType>({
    session: null,
    user: null,
    isAdmin: false,
    isLoading: true
  })

  useEffect(() => {
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
        isLoading: false
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