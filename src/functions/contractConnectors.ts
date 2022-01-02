import { BaseContract, ethers, Signer } from 'ethers';

import { TConnectorBase, TContractConnector } from '~~/models';
import {
  TDeployedContractJsonData,
  TExternalContractsAddressMap,
  THardhatContractsFileJson,
} from '~~/models/contractTypes';

const extractHardhatContracts = (configJson: THardhatContractsFileJson): TDeployedContractJsonData => {
  const contractData: TDeployedContractJsonData = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    const deployedDataByNetwork = Object.values(configJson[chainId]).filter(
      (f) => parseInt(f?.chainId) === chainId
    )?.[0];
    if (deployedDataByNetwork?.chainId != null) {
      for (const contractName in deployedDataByNetwork.contracts) {
        contractData[contractName] = { ...deployedDataByNetwork.contracts[contractName], chainId: chainId };
      }
    }
  }

  return contractData;
};

const extractExternalContracts = (configJson: TExternalContractsAddressMap): TDeployedContractJsonData => {
  const contractData: TDeployedContractJsonData = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId)) continue;

    for (const contractName in configJson[chainId]) {
      contractData[contractName] = { address: configJson[chainId][contractName], chainId: chainId };
    }
  }

  return contractData;
};

export const createConnectorsForHardhatContracts = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TConnectorBase<GBaseContract, GContractInterface>,
  deployedHardhatContractJson: THardhatContractsFileJson
): TContractConnector<GContractNames, GBaseContract, GContractInterface> => {
  const info = extractHardhatContracts(deployedHardhatContractJson)[contractName];

  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in deployed contracts (hardhat_config.json).  Check your hardhat deploy scripts and hardhat_config.json`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: (info?.abi ?? []) as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const createConnectorsForExternalContract = <
  GContractNames extends string,
  GBaseContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  contractName: GContractNames,
  typechainFactory: TConnectorBase<GBaseContract, GContractInterface>,
  deployedContractJson: TExternalContractsAddressMap
): TContractConnector<GContractNames, GBaseContract, GContractInterface> => {
  const info = extractExternalContracts(deployedContractJson)[contractName];

  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in external contract map.  Check that contractName: address map is correct.  This is required by eth-sdk`
    );
  }

  return {
    contractName,
    connect: typechainFactory.connect,
    createInterface: typechainFactory.createInterface,
    abi: (info?.abi ?? []) as Record<string, any>[],
    config: {
      [info.chainId]: {
        address: info.address,
      },
    },
  };
};

export const connectToContractWithSigner = async <
  GContractNames extends string,
  GContract extends BaseContract,
  GContractInterface extends ethers.utils.Interface
>(
  connector: TContractConnector<GContractNames, GContract, GContractInterface>,
  signer: Signer
): Promise<GContract | undefined> => {
  const chainId: number = await signer.getChainId();
  const address = connector?.config?.[chainId]?.address;
  if (chainId != null && address != null) {
    const contract = connector.connect(connector.config[chainId].address, signer);

    if (chainId != null && contract != null) {
      return contract;
    }
  }

  console.log(
    `Couldn't connect to contract ${connector?.contractName}, signer chainId: ${chainId}, config: ${JSON.stringify(
      connector?.config
    )}.`
  );
  console.log('🙅🏽‍♂️ Please make sure the correct network is connected and the contract is deployed.');
  return undefined;
};
