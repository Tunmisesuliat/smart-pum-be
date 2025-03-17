import { JSONFilePreset } from 'lowdb/node';

const db = await JSONFilePreset('app/db/database/db.json', { users: [] })

/**
 * Initializes the lowdb database.
 * 
 * Checks if the database file exists and if there is already data in it.
 * If the data property does not exist, it creates it with an empty users array.
 * 
 * @returns {Promise<void>}
 */
const initDB = async () => {
    await db.read();

    if (!db.data) {
        db.data = { users: [] };
        await db.write();
    }
};

await initDB();
export default db;