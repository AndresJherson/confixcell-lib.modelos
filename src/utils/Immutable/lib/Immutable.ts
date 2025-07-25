import { OptionalModel, Prop } from "../../../index";

export class Immutable {
    static type = 'Immutable';
    type = Immutable.type;

    constructor( item?: OptionalModel<Immutable> ) {
        Prop.initialize( this, item )
    }
}