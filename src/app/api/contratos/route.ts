// src/app/api/contratos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parámetros de filtrado
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const planLevel = searchParams.get('planLevel');
    const featured = searchParams.get('featured');

    // Paginación
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Construir filtros dinámicos
    const where: Prisma.ContractWhereInput = {
      isActive: true,
      publishedAt: { not: null }
    };

    // Filtro por categoría
    if (category) {
      where.category = {
        slug: category
      };
    }

    // Filtro por búsqueda
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Filtro por rango de precio
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    // Filtro por plan
    if (planLevel) {
      where.planLevel = planLevel as any;
    }

    // Filtro por destacados
    if (featured === 'true') {
      where.isFeatured = true;
    }

    // Consultar contratos
    const [contracts, total] = await Promise.all([
      prisma.contract.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true
            }
          },
          _count: {
            select: {
              favorites: true
            }
          }
        },
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit
      }),
      prisma.contract.count({ where })
    ]);

    // Calcular metadata de paginación
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      success: true,
      data: contracts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener contratos'
      },
      { status: 500 }
    );
  }
}
