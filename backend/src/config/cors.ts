import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {

    console.log('--- Depuración CORS Detallada ---');
    console.log('Petición entrante desde el ORIGIN:', origin); // ESTO ES CLAVE
    console.log('Valor de process.env.FRONTEND_URL:', process.env.FRONTEND_URL);

    const whiteList = [process.env.FRONTEND_URL]

    console.log('Lista blanca configurada (Array):', whiteList);
    console.log('¿Origin está incluido en la lista blanca?', whiteList.includes(origin));
    console.log('------------------------------------');

    if (process.argv[2] === '--api') {
      whiteList.push(undefined)
    }


    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
}
