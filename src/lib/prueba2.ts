// Tipo para el callback
type RelationCallback = ( visitedObjects: Set<ModeloBase> ) => void;

// Clase base con SOLO el método setRelation
abstract class ModeloBase {
    private _relacionesEstablecidas: boolean = false;

    // ÚNICO método para establecer relaciones
    public setRelation(
        visitedObjects: Set<ModeloBase> = new Set(),
        relationCallback?: RelationCallback
    ): void {
        // Verificar si este objeto ya fue procesado
        if ( visitedObjects.has( this ) ) {
            return;
        }

        // Marcar este objeto como visitado
        visitedObjects.add( this );

        // Ejecutar el callback si existe
        if ( relationCallback ) {
            relationCallback( visitedObjects );
        }

        // Marcar que las relaciones fueron establecidas
        this._relacionesEstablecidas = true;
    }

    // Métodos helper
    protected setRelationOnChild( child: ModeloBase | null | undefined, visitedObjects: Set<ModeloBase> ): void {
        if ( child ) {
            child.setRelation( visitedObjects );
        }
    }

    protected setRelationOnChildren( children: ModeloBase[], visitedObjects: Set<ModeloBase> ): void {
        children.forEach( child => this.setRelationOnChild( child, visitedObjects ) );
    }

    public get relacionesEstablecidas(): boolean {
        return this._relacionesEstablecidas;
    }
}

// Usuario - SOLO setRelation
class Usuario extends ModeloBase {
    private _nombre: string;
    private _posts: Post[] = [];
    private _perfil?: Perfil;

    constructor( nombre: string ) {
        super();
        this._nombre = nombre;
    }

    get nombre(): string { return this._nombre; }
    get posts(): Post[] { return this._posts; }
    get perfil(): Perfil | undefined { return this._perfil; }

    public addPost( post: Post ): void {
        this._posts.push( post );
    }

    public setPerfil( perfil: Perfil ): void {
        this._perfil = perfil;
    }

    // SOLO setRelation - acepta callback para herencia profunda
    public override setRelation(
        visitedObjects: Set<ModeloBase> = new Set(),
        relationCallback?: RelationCallback
    ): void {
        super.setRelation( visitedObjects, ( visitedObjects ) => {
            // Establecer referencias bidireccionales
            this._posts.forEach( post => {
                post.setUsuario( this );
            } );

            if ( this._perfil ) {
                this._perfil.setUsuario( this );
            }

            // Procesar objetos hijos recursivamente
            this.setRelationOnChildren( this._posts, visitedObjects );
            this.setRelationOnChild( this._perfil, visitedObjects );

            // Ejecutar callback de clase hija si existe
            if ( relationCallback ) {
                relationCallback( visitedObjects );
            }
        } );
    }
}

// UsuarioAdministrador - SOLO setRelation
class UsuarioAdministrador extends Usuario {
    private _permisos: string[] = [];
    private _equipoACargo: Usuario[] = [];

    constructor( nombre: string, permisos: string[] ) {
        super( nombre );
        this._permisos = permisos;
    }

    get permisos(): string[] { return this._permisos; }
    get equipoACargo(): Usuario[] { return this._equipoACargo; }

    public agregarMiembro( usuario: Usuario ): void {
        this._equipoACargo.push( usuario );
    }

    // SOLO setRelation - acepta callback para herencia profunda
    public override setRelation(
        visitedObjects: Set<ModeloBase> = new Set(),
        relationCallback?: RelationCallback
    ): void {
        // Llamar al padre con callback específico del administrador
        super.setRelation( visitedObjects, ( visitedObjects ) => {
            // Relaciones específicas del administrador
            this.setRelationOnChildren( this._equipoACargo, visitedObjects );

            // Ejecutar callback de clase hija si existe
            if ( relationCallback ) {
                relationCallback( visitedObjects );
            }
        } );
    }
}

// Post - SOLO setRelation
class Post extends ModeloBase {
    private _titulo: string;
    private _usuario?: Usuario;
    private _comentarios: Comentario[] = [];

    constructor( titulo: string ) {
        super();
        this._titulo = titulo;
    }

    get titulo(): string { return this._titulo; }
    get usuario(): Usuario | undefined { return this._usuario; }
    get comentarios(): Comentario[] { return this._comentarios; }

    public setUsuario( usuario: Usuario ): void {
        this._usuario = usuario;
    }

    public addComentario( comentario: Comentario ): void {
        this._comentarios.push( comentario );
    }

    // SOLO setRelation - acepta callback para herencia profunda
    public override setRelation(
        visitedObjects: Set<ModeloBase> = new Set(),
        relationCallback?: RelationCallback
    ): void {
        super.setRelation( visitedObjects, ( visitedObjects ) => {
            // Establecer referencias bidireccionales
            this._comentarios.forEach( comentario => {
                comentario.setPost( this );
            } );

            // Procesar objetos hijos recursivamente
            this.setRelationOnChild( this._usuario, visitedObjects );
            this.setRelationOnChildren( this._comentarios, visitedObjects );

            // Ejecutar callback de clase hija si existe
            if ( relationCallback ) {
                relationCallback( visitedObjects );
            }
        } );
    }
}

// Comentario - SOLO setRelation
class Comentario extends ModeloBase {
    private _contenido: string;
    private _post?: Post;
    private _autor?: Usuario;

    constructor( contenido: string ) {
        super();
        this._contenido = contenido;
    }

    get contenido(): string { return this._contenido; }
    get post(): Post | undefined { return this._post; }
    get autor(): Usuario | undefined { return this._autor; }

    public setPost( post: Post ): void {
        this._post = post;
    }

    public setAutor( autor: Usuario ): void {
        this._autor = autor;
    }

    // SOLO setRelation - acepta callback para herencia profunda
    public override setRelation(
        visitedObjects: Set<ModeloBase> = new Set(),
        relationCallback?: RelationCallback
    ): void {
        super.setRelation( visitedObjects, ( visitedObjects ) => {
            // Procesar objetos relacionados recursivamente
            this.setRelationOnChild( this._post, visitedObjects );
            this.setRelationOnChild( this._autor, visitedObjects );

            // Ejecutar callback de clase hija si existe
            if ( relationCallback ) {
                relationCallback( visitedObjects );
            }
        } );
    }
}

// Perfil - SOLO setRelation
class Perfil extends ModeloBase {
    private _biografia: string;
    private _usuario?: Usuario;

    constructor( biografia: string ) {
        super();
        this._biografia = biografia;
    }

    get biografia(): string { return this._biografia; }
    get usuario(): Usuario | undefined { return this._usuario; }

    public setUsuario( usuario: Usuario ): void {
        this._usuario = usuario;
    }

    // SOLO setRelation - acepta callback para herencia profunda
    public override setRelation(
        visitedObjects: Set<ModeloBase> = new Set(),
        relationCallback?: RelationCallback
    ): void {
        super.setRelation( visitedObjects, ( visitedObjects ) => {
            // Procesar objetos relacionados recursivamente
            this.setRelationOnChild( this._usuario, visitedObjects );

            // Ejecutar callback de clase hija si existe
            if ( relationCallback ) {
                relationCallback( visitedObjects );
            }
        } );
    }
}

// Ejemplo de uso
function ejemploSoloSetRelation() {
    console.log( "=== Ejemplo SOLO setRelation ===" );

    // Crear objetos
    const admin = new UsuarioAdministrador( "Admin Juan", ["moderar", "eliminar"] );
    const usuario1 = new Usuario( "María" );
    const usuario2 = new Usuario( "Carlos" );
    const post1 = new Post( "Post importante" );
    const comentario1 = new Comentario( "Excelente post!" );
    const perfil1 = new Perfil( "Desarrollador Senior" );

    // Establecer relaciones básicas
    admin.agregarMiembro( usuario1 );
    admin.agregarMiembro( usuario2 );
    admin.addPost( post1 );
    admin.setPerfil( perfil1 );

    post1.addComentario( comentario1 );
    comentario1.setAutor( usuario1 );

    // SOLO UN MÉTODO: setRelation()
    admin.setRelation();

    // Verificar resultados
    console.log( "Admin:", admin.nombre );
    console.log( "Permisos:", admin.permisos );
    console.log( "Equipo a cargo:", admin.equipoACargo.length );
    console.log( "Posts del admin:", admin.posts.length );
    console.log( "Usuario del perfil:", perfil1.usuario?.nombre );
    console.log( "Autor del comentario:", comentario1.autor?.nombre );

    // Verificar que las relaciones están establecidas
    console.log( "\n=== Estado de Relaciones ===" );
    console.log( "Admin relaciones establecidas:", admin.relacionesEstablecidas );
    console.log( "Usuario1 relaciones establecidas:", usuario1.relacionesEstablecidas );
    console.log( "Usuario2 relaciones establecidas:", usuario2.relacionesEstablecidas );
    console.log( "Post1 relaciones establecidas:", post1.relacionesEstablecidas );
    console.log( "Comentario1 relaciones establecidas:", comentario1.relacionesEstablecidas );
    console.log( "Perfil1 relaciones establecidas:", perfil1.relacionesEstablecidas );
}

// Ejecutar ejemplo
ejemploSoloSetRelation();