import { ARBase, ARESBase } from "@flarenetwork/state-connector-protocol";

export interface AttestationRequestId {
    round: number;
    data: string;
}

export interface AttestationProof<RESPONSE extends ARESBase = ARESBase> {
    merkleProof: string[];
    data: RESPONSE;
}

export enum AttestationNotProved {
    NOT_FINALIZED = 'NOT_FINALIZED',
    DISPROVED = 'DISPROVED',
}

export type OptionalAttestationProof = AttestationProof | AttestationNotProved;

// All methods build attestation request, submit it to the Flare data connector and return the encoded request.
// We create one requester per chain, so chainId is baked in.
export interface IFlareDataConnectorClient {
    roundFinalized(round: number): Promise<boolean>;
    waitForRoundFinalization(round: number): Promise<void>;
    submitRequest(request: ARBase): Promise<AttestationRequestId | null>;
    obtainProof(round: number, requestData: string): Promise<OptionalAttestationProof>;
}
