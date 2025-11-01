// src/app/api/contratos/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Buscar contrato por slug con todas sus relaciones
    const contract = await prisma.contract.findUnique({
      where: {
        slug,
        isActive: true,
        publishedAt: { not: null }
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            description: true
          }
        },
        addons: {
          include: {
            addon: {
              select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                currency: true,
                icon: true,
                requiresInput: true
              }
            }
          }
        },
        _count: {
          select: {
            favorites: true,
            downloads: true,
            transactions: true
          }
        }
      }
    });

    // Si no existe el contrato
    if (!contract) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contrato no encontrado'
        },
        { status: 404 }
      );
    }

    // Incrementar view count (fire and forget)
    prisma.contract
      .update({
        where: { id: contract.id },
        data: { viewCount: { increment: 1 } }
      })
      .catch((err) => console.error('Error updating view count:', err));

    // Transformar los addons para respuesta más limpia
    const addons = contract.addons.map((ca) => ca.addon);

    // Respuesta con contrato completo
    return NextResponse.json({
      success: true,
      data: {
        ...contract,
        addons,
        stats: {
          favorites: contract._count.favorites,
          downloads: contract._count.downloads,
          purchases: contract._count.transactions
        }
      }
    });
  } catch (error) {
    console.error('Error fetching contract:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener el contrato'
      },
      { status: 500 }
    );
  }
}
