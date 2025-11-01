// src/components/contract-detail/PurchaseSection.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Shield,
  Download,
  Zap
} from 'lucide-react';

interface PurchaseSectionProps {
  contract: {
    id: string;
    title: string;
    price: number;
    currency: string;
    planLevel: string | null;
  };
}

export default function PurchaseSection({ contract }: PurchaseSectionProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // TODO: Implementar lógica del carrito
    setTimeout(() => {
      setIsAddingToCart(false);
      alert('Funcionalidad del carrito próximamente');
    }, 1000);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implementar API de favoritos
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: contract.title,
        url: window.location.href
      });
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado al portapapeles');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border sticky top-24">
      {/* Precio */}
      <div className="p-6 border-b">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-gray-900">
            ${contract.price.toLocaleString()}
          </span>
          <span className="text-lg text-gray-600">{contract.currency}</span>
        </div>

        {contract.planLevel && (
          <div className="mt-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {contract.planLevel === 'BASIC' && 'Incluido en Plan Básico'}
              {contract.planLevel === 'INTERMEDIATE' &&
                'Incluido en Plan Intermedio'}
              {contract.planLevel === 'ALPHA' && 'Incluido en Plan Alpha'}
            </Badge>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <Check className="h-4 w-4 text-green-600" />
            <span>Pago único, sin suscripción</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span>Acceso inmediato después del pago</span>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="p-6 space-y-3">
        {/* Agregar al carrito */}
        <Button
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isAddingToCart ? 'Agregando...' : 'Agregar al Carrito'}
        </Button>

        {/* Comprar ahora */}
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleAddToCart}
        >
          <Zap className="h-5 w-5 mr-2" />
          Comprar Ahora
        </Button>

        {/* Guardar y Compartir */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            className={isFavorite ? 'text-red-600' : ''}
          >
            <Heart
              className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`}
            />
            {isFavorite ? 'Guardado' : 'Guardar'}
          </Button>

          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>

      {/* Garantías */}
      <div className="p-6 bg-gray-50 rounded-b-lg space-y-3">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm text-gray-900 mb-1">
              Validez Legal Garantizada
            </div>
            <p className="text-xs text-gray-600">
              Todos nuestros contratos cumplen con la legislación mexicana
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Download className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm text-gray-900 mb-1">
              Descarga Instantánea
            </div>
            <p className="text-xs text-gray-600">
              Acceso inmediato en PDF y DOCX editable
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm text-gray-900 mb-1">
              Soporte Incluido
            </div>
            <p className="text-xs text-gray-600">
              Ayuda por email para cualquier duda
            </p>
          </div>
        </div>
      </div>

      {/* Nota de planes */}
      {contract.planLevel && (
        <div className="p-4 bg-blue-50 border-t border-blue-100">
          <p className="text-xs text-blue-900 text-center">
            💡 <strong>Ahorra más:</strong> Incluido en nuestros planes de
            suscripción
          </p>
        </div>
      )}
    </div>
  );
}
