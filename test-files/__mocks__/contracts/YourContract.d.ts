/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface YourContractInterface extends ethers.utils.Interface {
  functions: {
    "purpose()": FunctionFragment;
    "setPurpose(string)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "purpose", values?: undefined): string;
  encodeFunctionData(functionFragment: "setPurpose", values: [string]): string;

  decodeFunctionResult(functionFragment: "purpose", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPurpose", data: BytesLike): Result;

  events: {
    "SetPurpose(address,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetPurpose"): EventFragment;
}

export type SetPurposeEvent = TypedEvent<
  [string, string] & { sender: string; purpose: string }
>;

export class YourContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: YourContractInterface;

  functions: {
    purpose(overrides?: CallOverrides): Promise<[string]>;

    setPurpose(
      newPurpose: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  purpose(overrides?: CallOverrides): Promise<string>;

  setPurpose(
    newPurpose: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    purpose(overrides?: CallOverrides): Promise<string>;

    setPurpose(newPurpose: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "SetPurpose(address,string)"(
      sender?: null,
      purpose?: null
    ): TypedEventFilter<[string, string], { sender: string; purpose: string }>;

    SetPurpose(
      sender?: null,
      purpose?: null
    ): TypedEventFilter<[string, string], { sender: string; purpose: string }>;
  };

  estimateGas: {
    purpose(overrides?: CallOverrides): Promise<BigNumber>;

    setPurpose(
      newPurpose: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    purpose(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPurpose(
      newPurpose: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
