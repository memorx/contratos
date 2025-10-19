import Link from 'next/link';
import { FileText, Shield, PenTool, MessageSquare, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">
                LegalStock
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#contratos"
                className="text-slate-600 hover:text-slate-900"
              >
                Contratos
              </Link>
              <Link
                href="#suscripciones"
                className="text-slate-600 hover:text-slate-900"
              >
                Suscripciones
              </Link>
              <Link
                href="#sectores"
                className="text-slate-600 hover:text-slate-900"
              >
                Sectores
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Comenzar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Contratos legales
            <span className="block text-blue-600">en minutos</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Plantillas de contratos profesionales, firma digital válida en
            México, y asesoría legal básica. Todo lo que tu negocio necesita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contratos"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Ver contratos
            </Link>
            <Link
              href="/suscripciones"
              className="bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition border-2 border-slate-200"
            >
              Planes y precios
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-blue-600" />}
            title="Contratos profesionales"
            description="Plantillas creadas por abogados, actualizadas con la legislación vigente"
          />
          <FeatureCard
            icon={<PenTool className="h-8 w-8 text-blue-600" />}
            title="Firma digital"
            description="Firma electrónica con validez oficial (NOM-151). Compatible con e.firma del SAT"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-blue-600" />}
            title="100% legal"
            description="Contratos que cumplen con todas las leyes mexicanas vigentes"
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8 text-blue-600" />}
            title="Asesoría incluida"
            description="Pregunta a nuestro asistente legal sobre dudas básicas (plan Premium)"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Elige tu contrato"
              description="Selecciona de nuestro catálogo el contrato que necesitas para tu negocio"
            />
            <StepCard
              number="2"
              title="Personaliza y descarga"
              description="Descarga el contrato en formato editable, listo para personalizar con tus datos"
            />
            <StepCard
              number="3"
              title="Firma digitalmente"
              description="Envía a firma digital a todas las partes involucradas. Validez oficial en México"
            />
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Planes para cada necesidad
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Desde contratos individuales hasta suscripciones con asesoría incluida
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            name="Por contrato"
            price="Desde $299"
            description="Compra solo lo que necesitas"
            features={[
              'Un contrato específico',
              'Descarga inmediata',
              'Formato editable',
              'Actualizaciones incluidas'
            ]}
          />
          <PricingCard
            name="Básico"
            price="$299/mes"
            description="Acceso ilimitado a contratos"
            features={[
              'Todos los contratos',
              'Descargas ilimitadas',
              'Actualizaciones automáticas',
              'Soporte por email'
            ]}
            highlighted
          />
          <PricingCard
            name="Premium"
            price="$349/mes"
            description="Todo + asesoría legal"
            features={[
              'Todo lo del plan Básico',
              'Chat con asistente legal',
              'Respuestas en 24hrs',
              'Firma digital incluida'
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Protege tu negocio hoy mismo
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a cientos de empresas que confían en LegalStock para sus
            contratos
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Comenzar ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">LegalStock</span>
              </div>
              <p className="text-sm">
                Contratos legales profesionales al alcance de tu negocio.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contratos" className="hover:text-white">
                    Contratos
                  </Link>
                </li>
                <li>
                  <Link href="/suscripciones" className="hover:text-white">
                    Suscripciones
                  </Link>
                </li>
                <li>
                  <Link href="/sectores" className="hover:text-white">
                    Sectores
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terminos" className="hover:text-white">
                    Términos de uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-white">
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/ayuda" className="hover:text-white">
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2025 LegalStock. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`p-8 rounded-xl border-2 ${
        highlighted ? 'border-blue-600 shadow-xl scale-105' : 'border-slate-200'
      } bg-white`}
    >
      {highlighted && (
        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Más popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-slate-900 mt-4">{name}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{price}</p>
      <p className="text-slate-600 mt-2 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/register"
        className={`block text-center w-full py-3 rounded-lg font-semibold transition ${
          highlighted
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
        }`}
      >
        Empezar ahora
      </Link>
    </div>
  );
}
