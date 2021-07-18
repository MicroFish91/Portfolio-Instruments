import { SnapshotSeeder } from "./SnapshotSeeder";
import { UserSeeder } from "./UserSeeder";

export default function (migrateUp: boolean = true) {
  if (migrateUp) {
    // UserSeeder.up();
    SnapshotSeeder.up();
  } else {
    SnapshotSeeder.down();
    UserSeeder.down();
  }
}
