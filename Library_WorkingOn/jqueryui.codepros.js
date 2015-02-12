(function(window,Codepros){

	$.widget( "codepros.codepros", {
      // default options
      options: { },
 
      // the constructor
      _create: function() {
        console.log(1);
      },
 
      // called when created, and later when changing options
      _refresh: function() {
        
      },
 
      // a public method to change the color to a random value
      // can be called directly via .colorize( "random" )
      addMarker: function( opts ) {
        alert("Created");
      },
 
      // events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        
      },
 
      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
      
      },
 
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        // prevent invalid color values
      
    });
 
    // initialize with default options
    $( "#my-widget1" ).colorize();
 
    // initialize with two customized options
    $( "#my-widget2" ).colorize({
      red: 60,
      blue: 60
    });
 
    // initialize with custom green value
    // and a random callback to allow only colors with enough green
    $( "#my-widget3" ).colorize( {
      green: 128,
      random: function( event, ui ) {
        return ui.green > 128;
      }
    });
 
    // click to toggle enabled/disabled
    $( "#disable" ).click(function() {
      // use the custom selector created for each widget to find all instances
      // all instances are toggled together, so we can check the state from the first
      if ( $( ":custom-colorize" ).colorize( "option", "disabled" ) ) {
        $( ":custom-colorize" ).colorize( "enable" );
      } else {
        $( ":custom-colorize" ).colorize( "disable" );
      }
    });
 
    // click to set options after initialization
    $( "#green" ).click( function() {
      $( ":custom-colorize" ).colorize( "option", {
        red: 64,
        green: 250,
        blue: 8
      });
    });

})(window,Codepros);