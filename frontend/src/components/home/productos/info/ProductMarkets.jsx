import { Globe, TrendingUp, Users, Star } from "lucide-react";

export function ProductMarkets({ product }) {
  const marketData = [
    {
      region: "América del Norte",
      percentage: 40,
      countries: ["Estados Unidos", "Canadá"],
    },
    {
      region: "Europa",
      percentage: 35,
      countries: ["Países Bajos", "Reino Unido", "Alemania"],
    },
    {
      region: "Asia",
      percentage: 20,
      countries: ["Japón", "Corea del Sur", "Singapur"],
    },
    {
      region: "Otros",
      percentage: 5,
      countries: ["Australia", "Nueva Zelanda"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mercados de Destino
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestros productos llegan a los mercados más exigentes del mundo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Market Distribution */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Distribución por Regiones
            </h3>
            {marketData.map((market, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    {market.region}
                  </span>
                  <span className="text-primary-600 font-semibold">
                    {market.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${market.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  {market.countries.join(", ")}
                </div>
              </div>
            ))}
          </div>

          {/* Market Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100">
                <Globe className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  50+
                </div>
                <div className="text-sm text-gray-600">Países de Destino</div>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100">
                <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  25%
                </div>
                <div className="text-sm text-gray-600">Crecimiento Anual</div>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100">
                <Users className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  200+
                </div>
                <div className="text-sm text-gray-600">Clientes Activos</div>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100">
                <Star className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  98%
                </div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
            </div>

            <div className="bg-secondary-50 p-6 rounded-xl">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Principales Mercados
              </h4>
              <div className="space-y-3">
                {product.markets.map((market, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">{market}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
