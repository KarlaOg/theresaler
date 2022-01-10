import jwt_decode from 'jwt-decode';

export function getAdminRole() {
  const token = localStorage.getItem('user');
  if (token) {
    const decoded = jwt_decode(token);
    const roles = decoded.roles;
    const admin = roles.find((role) => role === 'ROLE_ADMIN');
    if (admin) return true;
  }
  return false;
}
