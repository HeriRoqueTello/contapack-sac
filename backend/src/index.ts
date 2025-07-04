import colors from 'colors';
import server from "./server";
import { connectToDatabase } from './config/db';

const port = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectToDatabase();
    server.listen(port, () => {
      console.log(colors.magenta.bold(`Servidor Funcionando en el puerto ${port}`));
    });
  } catch (error) {
    process.exit(1);
  }
}
startServer();


