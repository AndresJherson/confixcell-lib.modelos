import { OptionalModel } from "../../index";

export interface IImmutable {
    __Immutable: 'Immutable';
    type: string;
    constructor( item?: OptionalModel<IImmutable> ): IImmutable;
}