import axios from "axios";
import { getToken } from "../../User/userUtils";
import { SNAPSHOT_ENDPOINT } from "./constants";
import {
  IncomingSnapshotFetchRaw,
  IncomingSnapshotsFetchStandardized,
} from "./types";

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
