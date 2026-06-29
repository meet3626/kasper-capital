import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin3DBackground from '@/components/Admin3DBackground';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Seed master admin if adminUsers doesn't exist
    const users = localStorage.getItem('adminUsers');
    if (!users) {
      const masterAdmin = [{
        id: 1,
        name: 'Master Admin',
        email: 'admin@gmail.com',
        password: btoa('Admin123'),
        isMaster: true,
        permissions: {
          dashboard: true,
          users: true,
          newsletter: true,
          settings: true,
          manage_admins: true
        }
      }];
      localStorage.setItem('adminUsers', JSON.stringify(masterAdmin));
    }

    // Auto-redirect if already logged in
    if (localStorage.getItem('adminAuth')) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check against legacy 'true' string to force re-login if needed
    if (localStorage.getItem('adminAuth') === 'true') {
      localStorage.removeItem('adminAuth');
    }

    try {
      const users = JSON.parse(localStorage.getItem('adminUsers') || '[]');
      const user = users.find((u: any) =>
        u.email === email && u.password === btoa(password)
      );

      if (user) {
        const authData = {
          id: user.id,
          name: user.name,
          email: user.email,
          isMaster: user.isMaster || false,
          permissions: user.permissions
        };
        localStorage.setItem('adminAuth', JSON.stringify(authData));
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030610]">
      <Admin3DBackground />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to access the dashboard
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-[#111827] py-8 px-4 shadow-2xl shadow-yellow-400/5 sm:rounded-2xl sm:px-10 border border-gray-800">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm py-2.5"
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm py-2.5"
                  placeholder=""
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-black bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
