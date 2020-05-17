import { DataToS3 } from "../models/data";

export function generateKey(data: DataToS3) {
    return (
        data.provider +
        "/" +
        (data.meta && data.meta !== [] ? data.meta.join("/") + "/" : "") +
        data.timestamp +
        "/" +
        data.filename +
        ".json"
    );
}
