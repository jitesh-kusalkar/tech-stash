/**
 * Enum for APIMethods
 */
export enum APIMethod {
    GET,
    POST,
    PUT,
    DELETE,
    IMAGE_GET
}

/**
 * Model for handling parameters of http request
 */
interface INameToValueMap {
    [key: string]: any;
}

export class APIRequest {
    endpoint: string;
    method: APIMethod;
    private contentType: string;
    private keys: Array<string>;
    private values: Array<string>;

    constructor(endpoint: string, method: APIMethod) {
        this.endpoint = endpoint;
        this.method = method;
        this.keys = [];
        this.values = [];
        this.contentType = 'application/json';
    }

    addProperty(key: any, value: any) {
        this.keys.push(key);
        this.values.push(value);
    }

    getBody(): any {
        let rawData: INameToValueMap = {};
        for (let index = 0; index < this.keys.length; index++) {
            rawData[this.keys[index]] = this.values[index];
        }

        return JSON.stringify(rawData);
    }

    getContentType() {
        return this.contentType;
    }

    setContentType(contentType: string) {
        this.contentType = contentType;
    }
}
