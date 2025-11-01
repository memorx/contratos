// src/components/contract-detail/ContractDescription.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  FileText,
  Download,
  Shield,
  Clock,
  Languages
} from 'lucide-react';

interface ContractDescriptionProps {
  contract: {
    description: string;
    pageCount: number | null;
    language: string;
    version: string;
    category: {
      name: string;
      description: string | null;
    };
  };
}

export default function ContractDescription({
  contract
}: ContractDescriptionProps) {
  // Features del contrato (basados en los requerimientos de Adrian)
  const features = [
    {
      icon: Shield,
      title: 'Validez Legal',
      description: 'Cumple con la legislación mexicana vigente'
    },
    {
      icon: FileText,
      title: 'Formato Editable',
      description: 'Descarga en PDF y DOCX para personalizar'
    },
    {
      icon: CheckCircle2,
      title: 'Revisado por Abogados',
      description: 'Elaborado y validado por profesionales'
    },
    {
      icon: Clock,
      title: 'Acceso Inmediato',
      description: 'Descarga instantánea después del pago'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
      {/* Título de sección */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Descripción del Contrato
        </h2>
        <p className="text-gray-600">
          Todo lo que necesitas saber sobre este documento legal
        </p>
      </div>

      {/* Descripción completa */}
      <div className="prose prose-gray max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {contract.description}
        </p>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        {contract.pageCount && (
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {contract.pageCount}
            </div>
            <div className="text-sm text-gray-600">Páginas</div>
          </div>
        )}

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {contract.language === 'es' ? '🇲🇽' : '🇺🇸'}
          </div>
          <div className="text-sm text-gray-600">
            {contract.language === 'es' ? 'Español' : 'Inglés'}
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            v{contract.version}
          </div>
          <div className="text-sm text-gray-600">Versión</div>
        </div>
      </div>

      {/* Características principales */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ¿Qué incluye este contrato?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categoría y contexto */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Sector: {contract.category.name}
        </h3>
        {contract.category.description && (
          <p className="text-gray-600 leading-relaxed">
            {contract.category.description}
          </p>
        )}
      </div>
    </div>
  );
}
