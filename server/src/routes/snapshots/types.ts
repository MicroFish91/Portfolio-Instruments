export type SnapshotData = {
  id: number;
  title: string;
  benchmark: string;
  notes: string | null;
  specifiedDate: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type GetLatestAccumulator =
  | {
      id: number;
      createdAt: Date;
    }
  | undefined;
