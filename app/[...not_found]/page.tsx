import { Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mt-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-white text-blue-500 px-6 py-3 rounded-lg mt-8 hover:bg-blue-50 transition-colors"
        >
          <Home className="w-5 h-5" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;