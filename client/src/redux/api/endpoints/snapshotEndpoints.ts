import axios from "axios";
import { getToken } from "../../User/userUtils";
import {
  IncomingPaginateSnapshotsFetchRaw,
  IncomingPostSnapshotFetchRaw,
  IncomingPostSnapshotFetchStandardized,
  IncomingSnapshotFetchRaw,
  IncomingSnapshotsFetchStandardized,
  OutgoingSnapshot,
} from "../types";
import { SNAPSHOT_ENDPOINT } from "./constants";

export async function getLatestSnapshotEndpoint(): Promise<IncomingSnapshotsFetchStandardized> {
  try {
    const snapshotResponse: IncomingSnapshotFetchRaw = await axios.get(
      SNAPSHOT_ENDPOINT.GET_LATEST,
      {
        headers: {
          authorization: getToken(),
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

export async function getLineChartSnapshotsEndpoint(): Promise<IncomingSnapshotsFetchStandardized> {
  try {
    const snapshotResponse: IncomingSnapshotFetchRaw = await axios.get(
      SNAPSHOT_ENDPOINT.GET_RANGE(4),
      {
        headers: {
          authorization: getToken(),
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

export async function getPaginateSnapshotsEndpoint(): Promise<IncomingSnapshotsFetchStandardized> {
  try {
    const snapshotResponse: IncomingPaginateSnapshotsFetchRaw = await axios.get(
      SNAPSHOT_ENDPOINT.GET_ALL,
      {
        headers: {
          authorization: getToken(),
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

export async function postSnapshotEndpoint(
  snapshot: OutgoingSnapshot
): Promise<IncomingPostSnapshotFetchStandardized> {
  try {
    const snapshotResponse: IncomingPostSnapshotFetchRaw = await axios.post(
      SNAPSHOT_ENDPOINT.POST_SNAPSHOT,
      { snapshot },
      {
        headers: {
          authorization: getToken(),
        },
      }
    );
    return {
      data: snapshotResponse.data.message,
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
