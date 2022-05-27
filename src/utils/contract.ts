import axios, { AxiosResponse } from "axios";
import { utils } from "ethers";
import { gql } from "@apollo/client";
import { firstValueFrom } from "rxjs";
import { graphql, Network } from "@reef-defi/react-lib";
import { contractsDeploy, metadataArtifactDeploy } from "./deployData";

const CONTRACT_VERIFICATION_URL = "/api/verificator/submit-verification";

interface BaseContract {
    runs: number;
    source: string;
    target: string;
    optimization: string;
    compilerVersion: string;
}

export interface VerificationContractReq extends BaseContract {
    name: string;
    address: string;
    filename: string;
    arguments: string;
    license: string;
}

export interface ReefContract extends BaseContract {
    filename: string;
    contractName: string;
    license: string;
}

const contractVerificatorApi = axios.create();

const toContractAddress = (address: string): string => utils.getAddress(address);

const CONTRACT_EXISTS_GQL = gql`
    subscription query($address: String!) {
        contract(where: { address: { _eq: $address } }) {
            address
        }
    }
`;

const CONTRACT_VERIFIED_GQL = gql`
    subscription query($address: String!) {
        verified_contract(where: { address: { _eq: $address } }) {
            address
        }
    }
`;

export const isContrIndexed = async (address: string): Promise<boolean> =>
    new Promise(async (resolve) => {
        const tmt = setTimeout(() => {
            resolve(false);
        }, 120000);
        const apollo = await firstValueFrom(graphql.apolloClientInstance$);
        apollo
            .subscribe({
                query: CONTRACT_EXISTS_GQL,
                variables: { address },
                fetchPolicy: "network-only",
            })
            .subscribe({
                next(result) {
                    if (result.data.contract && result.data.contract.length) {
                        clearTimeout(tmt);
                        resolve(true);
                    }
                },
                error(err) {
                    clearTimeout(tmt);
                    console.log("isContrIndexed error:", err);
                    resolve(false);
                },
                complete() {
                    clearTimeout(tmt);
                },
            });
    });

export const isContrVerified = async (address: string): Promise<boolean> =>
    new Promise(async (resolve) => {
        const tmt = setTimeout(() => {
            resolve(false);
        }, 120000);
        const apollo = await firstValueFrom(graphql.apolloClientInstance$);
        apollo
            .subscribe({
                query: CONTRACT_VERIFIED_GQL,
                variables: { address },
                fetchPolicy: "network-only",
            })
            .subscribe({
                next(result) {
                    if (result.data.verified_contract && result.data.verified_contract.length) {
                        clearTimeout(tmt);
                        resolve(true);
                    } else {
                        clearTimeout(tmt);
                        resolve(false);
                    }
                },
                error(err) {
                    clearTimeout(tmt);
                    console.log("isContrVefified error:", err);
                    resolve(false);
                },
                complete() {
                    clearTimeout(tmt);
                },
            });
    });

const verifyContract = async (
    deployedContractAddress: string,
    contract: ReefContract,
    arg: string,
    url?: string
): Promise<boolean> => {
    if (!url) {
        return false;
    }

    try {
        const contractAddress = toContractAddress(deployedContractAddress);
        if (!(await isContrIndexed(contractAddress))) {
            return false;
        }
        const body: VerificationContractReq = {
            address: contractAddress,
            arguments: arg,
            name: contract.contractName,
            filename: contract.filename,
            target: contract.target,
            source: contract.source,
            optimization: contract.optimization,
            compilerVersion: contract.compilerVersion,
            license: contract.license,
            runs: contract.runs,
        };
        await contractVerificatorApi.post<VerificationContractReq, AxiosResponse<string>>(
            `${url}${CONTRACT_VERIFICATION_URL}`,
            body
        );
        return true;
    } catch (err) {
        console.error("Verification err=", err);
        return false;
    }
};

export const verifySplitzContract = async (
    contractAddress: string,
    args: string,
    network: Network
): Promise<boolean> => {
    const { compilationTarget } = metadataArtifactDeploy.settings;
    const compTargetFileName = Object.keys(compilationTarget)[0];
    return await verifyContract(
        contractAddress,
        {
            source: JSON.stringify(contractsDeploy),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            contractName: compilationTarget[compTargetFileName],
            target: metadataArtifactDeploy.settings.evmVersion,
            compilerVersion: `v${metadataArtifactDeploy.compiler.version}`,
            optimization: metadataArtifactDeploy.settings.optimizer.enabled.toString(),
            filename: compTargetFileName,
            license: metadataArtifactDeploy.license,
            runs: metadataArtifactDeploy.settings.optimizer.runs,
        },
        args,
        network.reefscanUrl
    );
};
