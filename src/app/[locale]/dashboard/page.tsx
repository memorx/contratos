// src/app/[locale]/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Link } from '@/i18n/routing';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-blue-600 cursor-pointer">
                  LegalStock
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hola, <strong>{session.user.name}</strong>
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {session.user.role}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Dashboard de{' '}
                {session.user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
              </h1>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      ¡Bienvenido! Has iniciado sesión correctamente. El
                      dashboard completo estará disponible próximamente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Contratos</h3>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-blue-100 text-sm mt-2">Disponibles</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Usuarios</h3>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-green-100 text-sm mt-2">Registrados</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Ventas</h3>
                  <p className="text-3xl font-bold">$0</p>
                  <p className="text-purple-100 text-sm mt-2">Este mes</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Información de tu cuenta
                </h2>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Nombre
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {session.user.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {session.user.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Rol</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {session.user.role}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      ID de Usuario
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">
                      {session.user.id}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
