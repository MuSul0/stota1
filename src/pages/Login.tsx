import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Anmeldung</h1>
      <div className="space-y-4 w-full max-w-xs">
        <Button asChild className="w-full">
          <Link to="/admin?demo=true">Demo Admin Modus starten</Link>
        </Button>
        {/* Normale Login-Optionen hier */}
      </div>
    </div>
  )
}