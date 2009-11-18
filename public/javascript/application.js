new function(_) { // create the closure
  // create the package object
  var shapes = new base2.Package(this, {
    name:    "nice",
    version: "1.0",
    exports: "html,css,$"
  });
  
  // evaluate the imported namespace
  eval(this.imports); 
  
  var html = Base.extend({
    root: null,
    constructor: function( element ) {
			this.root = element;
		},
    tag: function( label, content ) {},
    self_closing_tag: function( label ) {},
		possibly_empty_tag: function( label ) {}
	}, {
    tag: function( label ) {
			this.prototype[label] = function( content ) {
				var newElement = document.createElement( label ) ;
				this.root.appendChild( newElement );
				if ( content instanceof Function ) {
					var oldRoot = this.root;
					this.root = newElement;
					content.apply( this );
					this.root = oldRoot;
				} else {
					newElement.innerText = content;
				}
			};
		},
		tags: function( labels ) {
			labels.forEach( function( label ) { html.tag( label ); });
		},
    self_closing_tag: function( label ) {},
		possibly_empty_tag: function( label ) {}
  });


  
  var css = Base.extend({
    constructor: function() {}
  });

	var $ =  Base.extend({
		
	}, {
		select: function( selector ) {
			return document.querySelector( selector );
		},
		initializers: null,
		initializer: function() {
			var self = this;
			return function() {
				self.initializers.forEach( function( fn ) {
					fn.call( self );
				});
			};
		},
		ready: function( fn ) {
			if ( !this.initializers ) {
				base2.DOM.bind(document);
				this.initializers = new Array2();
				document.addEventListener("DOMContentLoaded", this.initializer(), false);
			} 
			this.initializers.push( fn );
		} 
	});
  
  // evaluate the exported namespace (this initialises the Package)
  eval(this.exports);

	html.tags( 'div h1 p'.split(' ') );
}

eval(base2.JavaScript.namespace);
eval(base2.nice.namespace);

$.ready( function() {
	var View = html.extend({
		constructor: function( element ) {
			this.base( element );
		},
		article: function( title, summary ) {
			this.div( function() {
				this.h1( title );
				this.p( summary )
			});
		}
	});

	var view = new View( $.select( 'body' ) );
	view.article( "Introducing Nice", "Nice is JavaScript library based on Dean Edward's excellent Base2 library." );
	
	// next ... ? write the RSD parser? add all the html tags? get this working for css?
	// demonstrate how to integrate the two? see how JSB might mix-in here?
});
