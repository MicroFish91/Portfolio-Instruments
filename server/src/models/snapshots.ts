("use strict");
import { Model, Optional, Sequelize } from "sequelize";

interface SnapshotAttributes {
  id: number;
  title: string;
  benchmark: string;
  notes?: string | null;
  specifiedDate: Date;
  userId: number;
}

interface SnapshotCreationAttributes
  extends Optional<SnapshotAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Snapshots
    extends Model<SnapshotAttributes, SnapshotCreationAttributes>
    implements SnapshotAttributes
  {
    public id!: number;
    public title!: string;
    public benchmark!: string;
    public notes?: string | null;
    public specifiedDate!: Date;
    public userId!: number;

    static associate(models: any) {
      Snapshots.belongsTo(models.Users, { foreignKey: "userId" });
      Snapshots.hasMany(models.Accounts, { foreignKey: "snapshotId" });
    }
  }

  Snapshots.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      benchmark: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      notes: {
        type: DataTypes.STRING(100),
        defaultValue: null,
        allowNull: true,
      },
      specifiedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      modelName: "Snapshots",
      sequelize,
    }
  );
  return Snapshots;
};
