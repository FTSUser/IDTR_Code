const protocol = "https";
const host = "backend.idtrkarnal.com";

// const protocol = "http";
// const host = "localhost:8001";

const hostUrl = `${protocol}://${host}/api/v1/`;
const hostUrlForSocket = `${protocol}://${host}/`;

export const API = {
    protocol: protocol,
    host: host,
    hostUrl: hostUrl,
    hostUrlForSocket: hostUrlForSocket,
};
