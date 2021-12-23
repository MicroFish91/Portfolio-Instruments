import axios from "axios";
import { getToken } from "../../User/userUtils";
import {
  IncomingRecordsJsonExport,
  IncomingRecordsJsonExportFetchStandardized,
} from "../types";
import { LOG_ENDPOINT } from "./constants";

export async function getExportedRecordsJson(
  years: string
): Promise<IncomingRecordsJsonExportFetchStandardized> {
  try {
    const exportedJsonResponse: IncomingRecordsJsonExport = await axios.get(
      LOG_ENDPOINT.GET_RECORDS_JSON(years),
      {
        headers: {
          authorization: getToken(),
        },
      }
    );
    return {
      data: exportedJsonResponse.data.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.message,
      },
    };
  }
}
