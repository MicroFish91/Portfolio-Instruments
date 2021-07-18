import { AccountSeeder } from "./AccountSeeder";
import { SnapshotSeeder } from "./SnapshotSeeder";
import { UserSeeder } from "./UserSeeder";

export default async function (migrateUp: boolean = true) {
  try {
    if (migrateUp) {
      await UserSeeder.up();
      await SnapshotSeeder.up();
      await AccountSeeder.up();
    } else {
      await AccountSeeder.down();
      await SnapshotSeeder.down();
      await UserSeeder.down();
    }
  } catch (err) {
    console.log(err);
  }
}
