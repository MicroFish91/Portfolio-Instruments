import { GenericError } from "../api/endpoints/types";

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
};

export type SnapshotsError = GenericError;
