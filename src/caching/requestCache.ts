import { IncomingRequestsType } from "../types";

interface Cache {
    [key: string]: IncomingRequestsType[] | undefined;
}
export let requestCache: Cache = {};
