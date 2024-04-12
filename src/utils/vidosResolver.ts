import type {
    DIDResolutionOptions,
    DIDResolutionResult,
    Resolvable
} from "did-resolver";

/** 
 * Create resolver that is using the Vidos service to resolve DIDs. 
 * 
 * - For more info: [https://vidos.id/](https://vidos.id/).
 * - For resolver configuration: [https://dashboard.vidos.id/](https://dashboard.vidos.id/).
 * - For docs: [https://vidos.id/docs/](https://vidos.id/docs/).
 */
export class VidosResolver implements Resolvable {
    constructor(readonly instanceUrl: string, readonly apiKey: string) {}
  
    async resolve(
        didUrl: string,
        options?: DIDResolutionOptions | undefined
    ): Promise<DIDResolutionResult> {
        const resolutionResponse = await fetch(`${this.instanceUrl}/${didUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                Accept: options?.accept ?? "",
            },
        });
  
        return resolutionResponse.json();        
    }
  
    async getSupportedDidMethods(): Promise<string[]> {
        const methodsResponse = await fetch(`${this.instanceUrl}/methods`, {
            method: "GET",
        });
        if (methodsResponse.ok) {
            const { methods } = await methodsResponse.json();
            return methods;
        }
        throw new Error("Failed to fetch supported DID methods");
    }
}
