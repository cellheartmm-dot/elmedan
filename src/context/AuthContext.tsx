import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthUser } from '../types';

// ── Demo Accounts ──────────────────────────────────────────────
const DEMO_ACCOUNTS: (AuthUser & { password: string })[] = [
  {
    id: 'u-patient-1',
    full_name: 'محمد محمود المحفوض',
    phone: '01000000001',
    email: 'patient1@elmedanlab.com',
    role: 'patient',
    password: '1234',
  },
  {
    id: 'u-patient-2',
    full_name: 'سارة أحمد إبراهيم',
    phone: '01100000002',
    email: 'sara@elmedanlab.com',
    role: 'patient',
    password: '1234',
  },
  {
    id: 'u-patient-3',
    full_name: 'أحمد عبده الشريف',
    phone: '01200000003',
    role: 'patient',
    password: '1234',
  },
  {
    id: 'u-admin-1',
    full_name: 'د. خالد المدير',
    phone: 'admin',
    email: 'admin@elmedan.com',
    role: 'admin',
    password: 'H@mzafarida123',
  },
  {
    id: 'u-doctor-1',
    full_name: 'د. ريم الطبيبة',
    phone: '01500000010',
    email: 'doctor@elmedan.com',
    role: 'doctor',
    password: 'doctor123',
  },
  {
    id: 'u-recept-1',
    full_name: 'منى الاستقبال',
    phone: '01600000011',
    role: 'receptionist',
    password: 'recept123',
  },
];

// ── Context Types ──────────────────────────────────────────────
interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isPatient: boolean;
  login: (phoneOrEmail: string, password: string) => Promise<{ success: boolean; user?: AuthUser; error?: string }>;
  register: (data: { full_name: string; phone: string; password: string; email?: string }) => Promise<{ success: boolean; user?: AuthUser; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ──────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  // In-memory registered users (extends demo accounts per session)
  const [registeredUsers, setRegisteredUsers] = useState<(AuthUser & { password: string })[]>(DEMO_ACCOUNTS);

  const login = useCallback(async (phoneOrEmail: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
    await new Promise(r => setTimeout(r, 400)); // simulate network
    const found = registeredUsers.find(
      u => (u.phone === phoneOrEmail || u.email === phoneOrEmail) && u.password === password
    );
    if (!found) return { success: false, error: 'رقم الهاتف أو كلمة المرور غير صحيحة' };
    const { password: _, ...userData } = found;
    setUser(userData);
    return { success: true, user: userData };
  }, [registeredUsers]);

  const register = useCallback(async (data: { full_name: string; phone: string; password: string; email?: string }): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
    await new Promise(r => setTimeout(r, 500));
    const exists = registeredUsers.find(u => u.phone === data.phone);
    if (exists) return { success: false, error: 'رقم الهاتف مسجل بالفعل' };
    const newUser: AuthUser & { password: string } = {
      id: `u-${Date.now()}`,
      full_name: data.full_name,
      phone: data.phone,
      email: data.email,
      role: 'patient',
      password: data.password,
    };
    setRegisteredUsers(prev => [...prev, newUser]);
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return { success: true, user: userData };
  }, [registeredUsers]);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: user !== null,
      isAdmin: user !== null && ['admin', 'doctor', 'receptionist', 'collector'].includes(user.role),
      isPatient: user?.role === 'patient',
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
