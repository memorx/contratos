// src/components/contratos/ContractCard.tsx
'use client';

import { Link } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Heart, FileText, Star } from 'lucide-react';
import { Contract, Category } from '@prisma/client';

interface ContractCardProps {
  contract: Contract & {
    category: Pick<Category, 'id' | 'name' | 'slug' | 'icon'>;
    _count: {
      favorites: number;
    };
  };
}

export function ContractCard({ contract }: ContractCardProps) {
  const {
    id,
    title,
    slug,
    description,
    price,
    currency,
    category,
    pageCount,
    isFeatured,
    isNew,
    planLevel,
    _count
  } = contract;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {category.name}
          </Badge>
          <div className="flex gap-1">
            {isNew && (
              <Badge variant="default" className="text-xs bg-blue-500">
                Nuevo
              </Badge>
            )}
            {isFeatured && (
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            )}
          </div>
        </div>

        <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>

        <CardDescription className="line-clamp-3 text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{pageCount} páginas</span>
          </div>

          {planLevel && (
            <Badge variant="secondary" className="text-xs">
              {planLevel}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            ${price.toLocaleString('es-MX')}
          </span>
          <span className="text-xs text-muted-foreground">{currency}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            aria-label="Agregar a favoritos"
          >
            <Heart className="h-4 w-4" />
          </Button>

          <Button asChild>
            <Link href={`/catalogo/${slug}`}>Ver detalles</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
