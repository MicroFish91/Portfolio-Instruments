import { SnapshotFormatted } from "../../pages/AddSnapshots/types";
import { GenericError } from "../api/types";

export type SnapshotsReducerState = SnapshotsReducerSuccess & {
  error: SnapshotsError;
  isLoading: boolean;
};

export type SnapshotsReducerSuccess = {
  byId: { [id: string]: ReducedSnapshot };
  allIds: string[];
};

export type ReducedSnapshot = {
  title: string;
  benchmark: string;
  notes: string;
  date: Date;
  total: number;
};

export type PostSnapshot = SnapshotFormatted;

export type SnapshotsError = GenericError;
