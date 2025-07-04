const LoginButton = ({ onClick }: { onClick?: () => void }) => (
  <Button asChild variant="outline" className="gap-2">
    <Link to="/login" onClick={onClick}>
      <LogIn className="h-4 w-4" />
      Anmelden
    </Link>
  </Button>
);