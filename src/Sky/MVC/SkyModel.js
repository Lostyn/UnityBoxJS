import System.Collections.Generic;

public class SkyModel extends MonoBehaviour {
	public var view       : SkyView;
	public var controller : SkyController;
	public var bOpen 				: boolean;

	private var _dCOMMANDS 			: Dictionary.<String, SkyCommand>;


	/**
	* function initialize
	*
	* @param
	* @return
	*/
	public function initialize( ){
		_dCOMMANDS = new Dictionary.<String, SkyCommand>( );
		bOpen = false;
	}

	/**
	* function StartUp
	*
	* @param
	* @return
	*/
	public function StartUp( ){
		registerCommand( 'clear', 	_clear, 	"Clear console" );
		registerCommand( 'help', 	_help, 		"You need some help ^^" );
	}


	//------o Public

			
			/**
			* function registerCommand
			*
			* @param
			* @return
			*/
			public function registerCommand( sCOMM:String, f:Function, sHELP:String ){
				_dCOMMANDS[ sCOMM ] = new SkyCommand( sCOMM, f, sHELP );
			}


			/**
			* function send
			*
			* @param
			* @return
			*/
			public function send( ){
				view.autoComplete( new List.<String>( ) );

				var sINPUT : String = view.command;
				view.command = "";

				if( sINPUT == "" )
					return;

				view.log( '\n' + sINPUT );

				var sCOMMANDE : String = sINPUT.Split( " "[0] )[ 0 ];
				
				// Testing if command exist
					if( !_dCOMMANDS.ContainsKey( sCOMMANDE ) ){
						view.log( '-Sky ' + sCOMMANDE + ' not found.\nVerify your syntax or if the command is registered.' );
						return;
					}

				// Testing arguments
					var aARGS : Array = sINPUT.Split( ' '[0] );
					var uLEN : int = aARGS.length;
					if( uLEN > 1 )
						aARGS = aARGS.Slice( 1, uLEN );

				// Testing 
					var oCOM : SkyCommand = _dCOMMANDS[ sCOMMANDE ];
					var oCALLBACK : Function = oCOM.fCallback;

					view.log( '-Sky -Call function ' + sCOMMANDE );
					if( uLEN > 1 )
						oCALLBACK( aARGS[ 0 ] );
					else
						oCALLBACK( );
			}

			/**
			* function openClose
			*
			* @param
			* @return
			*/
			public function openClose( ){
				bOpen = !bOpen;

				if( bOpen )
					view.open( );
				else
					view.close( );
			}

			/**
			* function autoComplete
			*
			* @param
			* @return
			*/
			public function autoComplete( ){
				var s : String = view.command;
				if( s == '' ){
					view.autoComplete( new List.<String>( ) );
					return;
				}

				var v : List.<String> = new List.<String>( );
				var p : String;
				for( p in _dCOMMANDS.Keys ){
					
					if( p.IndexOf( s ) != -1 ){
						v.Add( p );
					}
				}

				view.autoComplete( v );

			}


	//---------o Private

		/**
		* function _clear
		*
		* @param
		* @return
		*/
		private function _clear( ){
			view.consoleText = "";
		}

		/**
		* function _help
		*
		* @param
		* @return
		*/
		private function _help( ){
			var sTMP : String = "-Sky -commands reference\n";
			var o : SkyCommand;

			for( o in _dCOMMANDS.Values ){
				sTMP += o.sName + '\t\t\t\t - ' + o.sDesc +'\n';
			}

			view.log( sTMP );
		}


}

class SkyCommand{
	public var sDesc     : String;
	public var sName     : String;
	public var fCallback : Function;

	/**
	* function SkyCommand
	*
	* @param
	* @return
	*/
	public function SkyCommand( name:String, f:Function, desc:String ){
		sDesc     = desc;
		sName     = name;
		fCallback = f;
	}
}