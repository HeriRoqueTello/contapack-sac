export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500 mx-auto"></div>
        <p className="text-zinc-600 dark:text-zinc-400 mt-4">
          Estamos verificando la autenticación
        </p>
      </div>
    </div>
  );
}
