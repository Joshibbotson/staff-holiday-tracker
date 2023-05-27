import { ApprovedRequestsType } from "../types";

interface Cache {
    [key: string]: ApprovedRequestsType[] | undefined;
}

export let approvedReqCache: Cache = {};
