import { UserSeeder } from "./UserSeeder";

export default function (migrateUp: boolean = true) {
  if (migrateUp) {
    UserSeeder.up();
  } else {
    UserSeeder.down();
  }
}
