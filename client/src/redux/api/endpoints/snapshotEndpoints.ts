import axios from "axios";
import { getToken } from "../../User/userUtils";
import {
  IncomingSnapshotFetchRaw,
  IncomingSnapshotsFetchStandardized,
} from "../types";
import { SNAPSHOT_ENDPOINT } from "./constants";

export async function getLatestSnapshotEndpoint(): Promise<IncomingSnapshotsFetchStandardized> {
  try {
    const snapshotResponse: IncomingSnapshotFetchRaw = await axios.get(
      SNAPSHOT_ENDPOINT.GET_LATEST,
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    return {
      data: snapshotResponse,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.message,
      },
    };
  }
}

export async function getRecentSnapshotsEndpoint(): Promise<IncomingSnapshotsFetchStandardized> {
  try {
    const snapshotResponse: IncomingSnapshotFetchRaw = await axios.get(
      SNAPSHOT_ENDPOINT.GET_RANGE(4),
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    return {
      data: snapshotResponse,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.message,
      },
    };
  }
}
