import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleGoHome = () => {
    setIsAnimating(true);

    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Número 404 grande */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-600 mb-4 animate-pulse">
            404
          </h1>
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-16 w-16 text-yellow-500 animate-bounce" />
          </div>
        </div>

        {/* Card principal */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Oops! Página no encontrada
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              La página que estás buscando no existe o ha sido movida. Puede que
              hayas escrito mal la URL o que el enlace esté desactualizado.
            </p>

            {/* Sugerencias */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <h3 className="text-green-800 font-semibold mb-2 flex items-center">
                <Search className="mr-2 h-5 w-5" />
                ¿Qué puedes hacer?
              </h3>
              <ul className="text-green-700 text-sm space-y-1 text-left">
                <li>• Verifica que la URL esté escrita correctamente</li>
                <li>• Regresa a la página anterior</li>
                <li>• Ve al inicio del dashboard</li>
                <li>• Contacta al administrador si el problema persiste</li>
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGoHome}
                className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base transition-all duration-300 ${
                  isAnimating ? "scale-95 opacity-75" : ""
                }`}
              >
                <Home className="mr-2 h-5 w-5" />
                Ir al Inicio
              </Button>

              <Button
                variant="outline"
                onClick={handleGoBack}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base bg-transparent"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Página Anterior
              </Button>
            </div>

            {/* Información adicional */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Si necesitas ayuda, contacta al soporte técnico en{" "}
                <a
                  href="mailto:soporte@contapck.com"
                  className="text-green-600 hover:text-green-700 underline"
                >
                  soporte@contapack.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Enlaces rápidos */}
        <div className="mt-8">
          <h3 className="text-gray-700 font-medium mb-4">Enlaces rápidos:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
