// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  // Super Admin - Adrian
  const superAdmin = await prisma.user.upsert({
    where: { email: 'adrian@legalstock.com' },
    update: {},
    create: {
      email: 'adrian@legalstock.com',
      name: 'Adrian',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date()
    }
  });

  console.log('✅ Super Admin created:', superAdmin.email);
  console.log('📧 Email: adrian@legalstock.com');
  console.log('🔑 Password: Admin123!');

  // Admin - Guillermo
  const adminUser = await prisma.user.upsert({
    where: { email: 'guillermo.sanchezy@gmail.com' },
    update: {},
    create: {
      email: 'guillermo.sanchezy@gmail.com',
      name: 'Guillermo Sanchez',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date()
    }
  });

  console.log('✅ Admin created:', adminUser.email);
  console.log('📧 Email: guillermo.sanchezy@gmail.com');
  console.log('🔑 Password: Admin123!');

  const contract1 = await prisma.contract.upsert({
    where: { slug: 'asociacion-participacion' },
    update: {},
    create: {
      title: 'Contrato de Asociación en Participación',
      slug: 'asociacion-participacion',
      description: 'Contrato para establecer una asociación en participación.',
      category: 'empresarial',
      price: 299.0,
      language: 'es',
      isActive: true
    }
  });

  const contract2 = await prisma.contract.upsert({
    where: { slug: 'acta-asamblea-general' },
    update: {},
    create: {
      title: 'Acta de Asamblea General',
      slug: 'acta-asamblea-general',
      description: 'Formato para documentar acuerdos de asambleas generales.',
      category: 'empresarial',
      price: 199.0,
      language: 'es',
      isActive: true
    }
  });

  console.log('✅ Contracts created');
  console.log('   -', contract1.title);
  console.log('   -', contract2.title);
  console.log('\n🎉 Seed completed!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
