// prisma/seed.ts
import { PrismaClient, UserRole, PlanLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...\n');

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  // ============================================
  // USUARIOS
  // ============================================

  const superAdmin = await prisma.user.upsert({
    where: { email: 'adrian@legalstock.com' },
    update: {},
    create: {
      email: 'adrian@legalstock.com',
      name: 'Adrian',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      emailVerified: new Date()
    }
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'guillermo.sanchezy@gmail.com' },
    update: {},
    create: {
      email: 'guillermo.sanchezy@gmail.com',
      name: 'Guillermo Sanchez',
      password: hashedPassword,
      role: UserRole.ADMIN,
      emailVerified: new Date()
    }
  });

  console.log('✅ Usuarios creados');
  console.log(`   - ${superAdmin.email} (SUPER_ADMIN)`);
  console.log(`   - ${adminUser.email} (ADMIN)\n`);

  // ============================================
  // CATEGORÍAS
  // ============================================

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'restaurant-bar' },
      update: {},
      create: {
        name: 'Restaurant y Bar',
        slug: 'restaurant-bar',
        description:
          'Contratos especializados para negocios de alimentos y bebidas',
        icon: 'Utensils',
        order: 1
      }
    }),
    prisma.category.upsert({
      where: { slug: 'salud' },
      update: {},
      create: {
        name: 'Profesionales de la Salud',
        slug: 'salud',
        description:
          'Documentos legales para médicos y profesionales de la salud',
        icon: 'Heart',
        order: 2
      }
    }),
    prisma.category.upsert({
      where: { slug: 'construccion' },
      update: {},
      create: {
        name: 'Construcción y Arquitectura',
        slug: 'construccion',
        description: 'Contratos para contratistas, ingenieros y arquitectos',
        icon: 'HardHat',
        order: 3
      }
    }),
    prisma.category.upsert({
      where: { slug: 'inmobiliaria' },
      update: {},
      create: {
        name: 'Agencia Inmobiliaria',
        slug: 'inmobiliaria',
        description:
          'Contratos de arrendamiento, compraventa y gestión de propiedades',
        icon: 'Home',
        order: 4
      }
    }),
    prisma.category.upsert({
      where: { slug: 'franquicias' },
      update: {},
      create: {
        name: 'Franquicias',
        slug: 'franquicias',
        description: 'Documentación legal para sistemas de franquicias',
        icon: 'Store',
        order: 5
      }
    }),
    prisma.category.upsert({
      where: { slug: 'general' },
      update: {},
      create: {
        name: 'Contratos Generales',
        slug: 'general',
        description: 'Contratos aplicables a diversos sectores',
        icon: 'FileText',
        order: 6
      }
    })
  ]);

  console.log('✅ Categorías creadas:');
  categories.forEach((cat) => console.log(`   - ${cat.name}`));
  console.log('');

  // ============================================
  // SERVICIOS ADICIONALES (ADDONS)
  // ============================================

  const addons = await Promise.all([
    prisma.addonService.upsert({
      where: { slug: 'traduccion' },
      update: {},
      create: {
        name: 'Servicio de Traducción',
        slug: 'traduccion',
        description:
          'Traducción profesional del contrato (sin validez jurídica fuera de México)',
        price: 299.0,
        icon: 'Languages'
      }
    }),
    prisma.addonService.upsert({
      where: { slug: 'firma-electronica' },
      update: {},
      create: {
        name: 'Firma Electrónica',
        slug: 'firma-electronica',
        description:
          'Servicio de firma electrónica o digital integrado. Ideal para empleados, socios o clientes fuera de tu ciudad',
        price: 499.0,
        icon: 'FileSignature',
        requiresInput: true
      }
    }),
    prisma.addonService.upsert({
      where: { slug: 'clausulas-personalizadas' },
      update: {},
      create: {
        name: 'Cláusulas Personalizadas',
        slug: 'clausulas-personalizadas',
        description:
          'Añade o modifica cláusulas específicas según tus necesidades',
        price: 799.0,
        icon: 'Edit',
        requiresInput: true
      }
    }),
    prisma.addonService.upsert({
      where: { slug: 'almacenamiento' },
      update: {},
      create: {
        name: 'Almacenamiento Premium',
        slug: 'almacenamiento',
        description:
          'Almacena y organiza tus documentos con marcas y categorías personalizadas',
        price: 199.0,
        icon: 'FolderArchive'
      }
    })
  ]);

  console.log('✅ Servicios adicionales creados:');
  addons.forEach((addon) =>
    console.log(`   - ${addon.name} ($${addon.price})`)
  );
  console.log('');

  // ============================================
  // CONTRATOS DE EJEMPLO
  // ============================================

  // Restaurant-Bar
  const restaurantCategory = categories.find(
    (c) => c.slug === 'restaurant-bar'
  )!;

  await prisma.contract.create({
    data: {
      title: 'Contrato de Trabajo para Mesero',
      slug: 'contrato-trabajo-mesero',
      description:
        'Contrato laboral completo para personal de servicio en restaurantes y bares. Incluye cláusulas de propinas, horarios, responsabilidades y términos de confidencialidad.',
      categoryId: restaurantCategory.id,
      price: 299.0,
      planLevel: PlanLevel.BASIC,
      pageCount: 8,
      isFeatured: true,
      isActive: true,
      publishedAt: new Date(),
      metaTitle: 'Contrato de Trabajo para Mesero | LegalStock',
      metaDescription:
        'Descarga contrato laboral profesional para meseros. Cumple con la LFT y protege tu negocio.'
    }
  });

  await prisma.contract.create({
    data: {
      title: 'Contrato de Trabajo para Chef',
      slug: 'contrato-trabajo-chef',
      description:
        'Contrato especializado para personal de cocina. Incluye cláusulas de recetas secretas, competencia, horarios extendidos y bonos por desempeño.',
      categoryId: restaurantCategory.id,
      price: 399.0,
      planLevel: PlanLevel.BASIC,
      pageCount: 10,
      isActive: true,
      publishedAt: new Date()
    }
  });

  await prisma.contract.create({
    data: {
      title: 'Contrato con Proveedores de Alimentos',
      slug: 'contrato-proveedores-alimentos',
      description:
        'Acuerdo comercial con proveedores. Incluye términos de entrega, calidad, garantías, pagos y cancelaciones.',
      categoryId: restaurantCategory.id,
      price: 499.0,
      planLevel: PlanLevel.INTERMEDIATE,
      pageCount: 12,
      isFeatured: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  // Salud
  const saludCategory = categories.find((c) => c.slug === 'salud')!;

  await prisma.contract.create({
    data: {
      title: 'Consentimiento Informado General',
      slug: 'consentimiento-informado-general',
      description:
        'Formato de consentimiento informado para procedimientos médicos generales. Cumple con NOM-004-SSA3-2012.',
      categoryId: saludCategory.id,
      price: 249.0,
      planLevel: PlanLevel.BASIC,
      pageCount: 5,
      isNew: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  await prisma.contract.create({
    data: {
      title: 'Contrato de Servicios Médicos Privados',
      slug: 'contrato-servicios-medicos-privados',
      description:
        'Contrato entre médico y paciente para servicios privados. Define honorarios, alcance de servicios, responsabilidades y términos de cancelación.',
      categoryId: saludCategory.id,
      price: 599.0,
      planLevel: PlanLevel.INTERMEDIATE,
      pageCount: 15,
      isFeatured: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  // Construcción
  const construccionCategory = categories.find(
    (c) => c.slug === 'construccion'
  )!;

  await prisma.contract.create({
    data: {
      title: 'Contrato de Obra a Precio Alzado',
      slug: 'contrato-obra-precio-alzado',
      description:
        'Contrato de construcción con precio fijo. Incluye alcance de obra, especificaciones técnicas, plazos, garantías y penalizaciones.',
      categoryId: construccionCategory.id,
      price: 799.0,
      planLevel: PlanLevel.ALPHA,
      pageCount: 20,
      isFeatured: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  await prisma.contract.create({
    data: {
      title: 'Contrato de Servicios Profesionales de Arquitecto',
      slug: 'contrato-servicios-arquitecto',
      description:
        'Acuerdo entre cliente y arquitecto para servicios de diseño. Define entregables, revisiones, derechos de autor y honorarios por etapa.',
      categoryId: construccionCategory.id,
      price: 699.0,
      planLevel: PlanLevel.INTERMEDIATE,
      pageCount: 16,
      isActive: true,
      publishedAt: new Date()
    }
  });

  // Inmobiliaria
  const inmobiliariaCategory = categories.find(
    (c) => c.slug === 'inmobiliaria'
  )!;

  await prisma.contract.create({
    data: {
      title: 'Contrato de Arrendamiento Residencial',
      slug: 'contrato-arrendamiento-residencial',
      description:
        'Contrato de renta para vivienda. Incluye obligaciones de arrendador y arrendatario, depósito, mantenimiento y causales de rescisión.',
      categoryId: inmobiliariaCategory.id,
      price: 349.0,
      planLevel: PlanLevel.BASIC,
      pageCount: 12,
      isFeatured: true,
      isNew: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  await prisma.contract.create({
    data: {
      title: 'Contrato de Arrendamiento Comercial',
      slug: 'contrato-arrendamiento-comercial',
      description:
        'Contrato de renta para locales comerciales. Incluye uso permitido, modificaciones, publicidad, horarios y renovación.',
      categoryId: inmobiliariaCategory.id,
      price: 499.0,
      planLevel: PlanLevel.INTERMEDIATE,
      pageCount: 18,
      isFeatured: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  await prisma.contract.create({
    data: {
      title: 'Contrato de Compraventa de Inmueble',
      slug: 'contrato-compraventa-inmueble',
      description:
        'Acuerdo de compraventa de propiedad. Define precio, forma de pago, fecha de entrega, gravámenes y gastos notariales.',
      categoryId: inmobiliariaCategory.id,
      price: 899.0,
      planLevel: PlanLevel.ALPHA,
      pageCount: 25,
      isActive: true,
      publishedAt: new Date()
    }
  });

  // Franquicias
  const franquiciasCategory = categories.find((c) => c.slug === 'franquicias')!;

  await prisma.contract.create({
    data: {
      title: 'Contrato de Franquicia Maestra',
      slug: 'contrato-franquicia-maestra',
      description:
        'Contrato completo de franquicia según Ley de Propiedad Industrial. Incluye derechos, obligaciones, regalías, territorio y confidencialidad.',
      categoryId: franquiciasCategory.id,
      price: 1299.0,
      planLevel: PlanLevel.ALPHA,
      pageCount: 35,
      isFeatured: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  // General
  const generalCategory = categories.find((c) => c.slug === 'general')!;

  await prisma.contract.create({
    data: {
      title: 'Convenio de Confidencialidad (NDA)',
      slug: 'convenio-confidencialidad-nda',
      description:
        'Acuerdo de no divulgación para proteger información confidencial. Válido para empleados, proveedores o socios comerciales.',
      categoryId: generalCategory.id,
      price: 199.0,
      planLevel: PlanLevel.BASIC,
      pageCount: 6,
      isFeatured: true,
      isNew: true,
      isActive: true,
      publishedAt: new Date()
    }
  });

  await prisma.contract.create({
    data: {
      title: 'Contrato de Prestación de Servicios Profesionales',
      slug: 'contrato-prestacion-servicios',
      description:
        'Contrato genérico para servicios profesionales independientes. Define alcance, honorarios, plazos y propiedad intelectual.',
      categoryId: generalCategory.id,
      price: 399.0,
      planLevel: PlanLevel.BASIC,
      pageCount: 10,
      isActive: true,
      publishedAt: new Date()
    }
  });

  console.log('✅ Contratos de ejemplo creados: 13 contratos\n');

  console.log('🎉 Seed completado exitosamente!\n');
  console.log('📊 Resumen:');
  console.log(`   - 2 usuarios (SUPER_ADMIN, ADMIN)`);
  console.log(`   - 6 categorías`);
  console.log(`   - 4 servicios adicionales`);
  console.log(`   - 13 contratos de ejemplo`);
  console.log('\n💡 Credentials:');
  console.log(`   Email: adrian@legalstock.com`);
  console.log(`   Password: Admin123!`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
