import UserSeeder from "./user.seeder";

async function runSeeds() {
  try {
    await UserSeeder.seed();
    // Add more seeders if needed

    console.log("All seeds executed successfully.");
  } catch (error) {
    console.error("Error executing seed scripts:", error);
  }
}

export default runSeeds;
