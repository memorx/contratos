// src/app/[locale]/catalogo/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ContractCard } from '@/components/contratos/ContractCard';
import { SearchBar } from '@/components/contratos/SearchBar';
import { FilterSidebar } from '@/components/contratos/FilterSidebar';
import { Loader2 } from 'lucide-react';

interface Contract {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  pageCount: number;
  isFeatured: boolean;
  isNew: boolean;
  planLevel: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string;
  };
  _count: {
    favorites: number;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CatalogoPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [showFeatured, setShowFeatured] = useState(false);

  // Paginación
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch contratos
  useEffect(() => {
    fetchContracts();
  }, [selectedCategory, searchQuery, priceRange, showFeatured, page]);

  // Fetch categorías (solo una vez)
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });

      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      if (showFeatured) params.append('featured', 'true');
      params.append('minPrice', priceRange[0].toString());
      params.append('maxPrice', priceRange[1].toString());

      const response = await fetch(`/api/contratos?${params}`);
      const data = await response.json();

      if (data.success) {
        setContracts(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categorias');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setPriceRange([0, 1500]);
    setShowFeatured(false);
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Catálogo de Contratos</h1>
        <p className="text-muted-foreground">
          Encuentra el contrato legal perfecto para tu negocio
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Filtros */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              minPrice={0}
              maxPrice={1500}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              showFeatured={showFeatured}
              onFeaturedChange={setShowFeatured}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>

        {/* Grid de Contratos */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : contracts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No se encontraron contratos con los filtros aplicados.
              </p>
            </div>
          ) : (
            <>
              {/* Resultados */}
              <div className="mb-4 text-sm text-muted-foreground">
                Mostrando {contracts.length} contratos
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {contracts.map((contract) => (
                  <ContractCard key={contract.id} contract={contract} />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span className="px-4 py-2">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
