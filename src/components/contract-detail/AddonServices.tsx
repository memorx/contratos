// src/components/contract-detail/AddonServices.tsx
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Languages,
  FileSignature,
  Edit,
  FolderArchive,
  Plus,
  Check
} from 'lucide-react';

// Mapeo de iconos
const iconMap: { [key: string]: any } = {
  Languages,
  FileSignature,
  Edit,
  FolderArchive
};

interface Addon {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  icon: string | null;
  requiresInput: boolean;
}

interface AddonServicesProps {
  addons: Addon[];
}

export default function AddonServices({ addons }: AddonServicesProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const totalAddonsPrice = addons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Servicios Adicionales
        </h2>
        <p className="text-gray-600">
          Mejora tu contrato con estos servicios profesionales opcionales
        </p>
      </div>

      {/* Lista de servicios */}
      <div className="space-y-4">
        {addons.map((addon) => {
          const Icon = addon.icon ? iconMap[addon.icon] : Plus;
          const isSelected = selectedAddons.includes(addon.id);

          return (
            <div
              key={addon.id}
              className={`relative border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleAddon(addon.id)}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="flex items-center h-6">
                  <Checkbox
                    id={addon.id}
                    checked={isSelected}
                    onCheckedChange={() => toggleAddon(addon.id)}
                    className="cursor-pointer"
                  />
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-blue-600' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <label
                        htmlFor={addon.id}
                        className="text-lg font-semibold text-gray-900 cursor-pointer"
                      >
                        {addon.name}
                      </label>
                      {addon.requiresInput && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Requiere información
                        </Badge>
                      )}
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-gray-900">
                        ${addon.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {addon.currency}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {addon.description}
                  </p>

                  {isSelected && (
                    <div className="mt-3 flex items-center text-sm text-blue-600 font-medium">
                      <Check className="h-4 w-4 mr-1" />
                      Seleccionado
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen de selección */}
      {selectedAddons.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">
                {selectedAddons.length} servicio(s) adicional(es)
                seleccionado(s)
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Se agregarán al carrito junto con el contrato
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total adicional</div>
              <div className="text-xl font-bold text-blue-600">
                +${totalAddonsPrice.toLocaleString()} MXN
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
