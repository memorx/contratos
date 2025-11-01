// src/app/[locale]/catalogo/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ContractHero from '@/components/contract-detail/ContractHero';
import ContractDescription from '@/components/contract-detail/ContractDescription';
import AddonServices from '@/components/contract-detail/AddonServices';
import PurchaseSection from '@/components/contract-detail/PurchaseSection';

// Generar metadata dinámica
export async function generateMetadata({
  params
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }/api/contratos/${params.slug}`,
      { next: { revalidate: 3600 } } // Cache por 1 hora
    );

    if (!res.ok) {
      return {
        title: 'Contrato no encontrado',
        description: 'El contrato que buscas no está disponible'
      };
    }

    const { data: contract } = await res.json();

    return {
      title: contract.metaTitle || `${contract.title} - LegalStock`,
      description:
        contract.metaDescription ||
        contract.description.substring(0, 160) + '...',
      openGraph: {
        title: contract.title,
        description: contract.description,
        type: 'website'
      }
    };
  } catch (error) {
    return {
      title: 'Error',
      description: 'Error al cargar el contrato'
    };
  }
}

// Página principal
export default async function ContractDetailPage({
  params
}: {
  params: { slug: string; locale: string };
}) {
  // Fetch del contrato
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/api/contratos/${params.slug}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    notFound();
  }

  const { data: contract } = await res.json();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ContractHero contract={contract} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción y Detalles */}
            <ContractDescription contract={contract} />

            {/* Servicios Adicionales */}
            {contract.addons && contract.addons.length > 0 && (
              <AddonServices addons={contract.addons} />
            )}
          </div>

          {/* Columna Lateral - 1/3 (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PurchaseSection contract={contract} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
