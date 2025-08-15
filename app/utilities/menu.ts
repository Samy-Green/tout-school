import User from '#models/user'

export function canAccessMenu(_user: User | undefined | null, _menuItem: any): boolean {
  // Logique d'accès — pour l'instant toujours true
  if (_user === undefined || _user === null) {
    return false
  }
  return true
}
