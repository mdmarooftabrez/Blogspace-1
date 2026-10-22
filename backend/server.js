import app from "./src/app.js";
import { initializeDatabase } from "./src/config/db.js";

const port = Number(process.env.PORT || 5000);

await initializeDatabase();
app.listen(port, () => console.log(`BlogSpace is listening on port ${port}`));
