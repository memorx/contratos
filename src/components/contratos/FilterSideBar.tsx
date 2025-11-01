// src/components/contratos/FilterSidebar.tsx
'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showFeatured: boolean;
  onFeaturedChange: (checked: boolean) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  priceRange,
  onPriceRangeChange,
  showFeatured,
  onFeaturedChange,
  onClearFilters
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-8"
        >
          <X className="h-4 w-4 mr-1" />
          Limpiar
        </Button>
      </div>

      {/* Categorías */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Categoría</h4>
        <RadioGroup
          value={selectedCategory || 'all'}
          onValueChange={(value) =>
            onCategoryChange(value === 'all' ? null : value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="cat-all" />
            <Label htmlFor="cat-all" className="cursor-pointer">
              Todas las categorías
            </Label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category.slug}
                id={`cat-${category.slug}`}
              />
              <Label
                htmlFor={`cat-${category.slug}`}
                className="cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Rango de precio */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Rango de precio</h4>
        <div className="px-2">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={50}
            value={priceRange}
            onValueChange={(value) =>
              onPriceRangeChange(value as [number, number])
            }
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Destacados */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={showFeatured}
            onCheckedChange={(checked) => onFeaturedChange(checked as boolean)}
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Solo destacados
          </Label>
        </div>
      </div>
    </div>
  );
}
