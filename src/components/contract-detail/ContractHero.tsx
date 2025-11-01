// src/components/contract-detail/ContractHero.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Download,
  Eye,
  FileText,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { useState } from 'react';

interface ContractHeroProps {
  contract: {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    planLevel: string | null;
    isNew: boolean;
    isFeatured: boolean;
    pageCount: number | null;
    category: {
      name: string;
      slug: string;
      icon: string | null;
    };
    stats: {
      favorites: number;
      downloads: number;
      purchases: number;
    };
    viewCount: number;
  };
}

export default function ContractHero({ contract }: ContractHeroProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    // TODO: Implementar funcionalidad de favoritos
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // TODO: Implementar funcionalidad de compartir
    if (navigator.share) {
      navigator.share({
        title: contract.title,
        text: contract.description,
        url: window.location.href
      });
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => router.push('/catalogo')}
          className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-sm">
                {contract.category.name}
              </Badge>

              {contract.planLevel && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  {contract.planLevel === 'BASIC' && 'Plan Básico'}
                  {contract.planLevel === 'INTERMEDIATE' && 'Plan Intermedio'}
                  {contract.planLevel === 'ALPHA' && 'Plan Alpha'}
                </Badge>
              )}

              {contract.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>
              )}

              {contract.isFeatured && (
                <Badge className="bg-amber-500 hover:bg-amber-600">
                  Destacado
                </Badge>
              )}
            </div>

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {contract.title}
            </h1>

            {/* Descripción corta */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {contract.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              {contract.pageCount && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{contract.pageCount} páginas</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{contract.viewCount} vistas</span>
              </div>

              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>{contract.stats.downloads} descargas</span>
              </div>

              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{contract.stats.favorites} favoritos</span>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas (Mobile/Tablet) */}
          <div className="lg:hidden flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleFavorite}
              className="flex-1"
            >
              <Heart
                className={`h-5 w-5 mr-2 ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
              {isFavorite ? 'Guardado' : 'Guardar'}
            </Button>

            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
