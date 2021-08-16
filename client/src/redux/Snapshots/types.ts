import { SnapshotFormatted } from "../../pages/AddSnapshots/types";
import { GenericError } from "../api/types";

export type SnapshotsReducerState = {
  byId: { [id: string]: ReducedSnapshot };
  dashboardIds: string[];
  allIds: string[];
  error: SnapshotsError;
  isLoading: boolean;
};

export type SnapshotsDashboardReducerSuccess = {
  byId: { [id: string]: ReducedSnapshot };
  dashboardIds: string[];
};

export type SnapshotsPaginateReducerSuccess = {
  byId: { [id: string]: ReducedSnapshot };
  allIds: string[];
};

export type ReducedSnapshot = {
  title: string;
  benchmark: string;
  notes: string;
  date: Date;
  total: number;
  weightedExpenseRatio: number;
};

export type removeSnapshotPayload = {
  snapshotId: number;
  accountIds: string[];
  holdingIds: string[];
};

export type PostSnapshot = SnapshotFormatted;

export type SnapshotsError = GenericError;
