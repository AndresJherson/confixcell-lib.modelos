import { ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SuperUsuario } from '../../../index';

@Prop.Class()
export class Preset extends Model {

    static override type = 'Preset';
    override type = 'Preset';
    private __Preset!: 'Preset';

    @Prop.Set( { behavior: PropBehavior.object } ) json?: Record<string, any> | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SuperUsuario( x ) } ) superUsuario?: SuperUsuario | null;


    constructor( item?: OptionalModel<Preset> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Preset> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Preset> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context?: ExecutionContext ): this {

        super.setRelation( context );

        context?.execute( this, Preset.type, () => {
            
            this.superUsuario?.assign( {
                preset: this
            } ).setRelation( context );
            
        } )

        return this;
    }
}