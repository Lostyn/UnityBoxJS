public class SkyView extends MonoBehaviour {
		public var model : SkyModel;
		public var controller : SkyController;

		private var rectView        : Rect;
		private var rectAutoC		: Rect;
	
		private var scrollPosition  : Vector2;
		private var consoleString   : String;
		private var insertString    : String;

		private var bg : Texture2D;
		
		private var _y 			: float;
		private var slideFactor : float;
		private var limHeight : float;
		private var slideSpeed : float = 6;

		private var autoCompleteList : List.<String>;

		/**
		* function initialize
		*
		* @param
		* @return
		*/
		public function initialize( ){
			consoleString = "";
			consoleString += " _____ _____ __ __\n"; 
			consoleString += "|      __|     |    |    |    |\n";
			consoleString += "|__      |         -| _   _ |\n";
			consoleString += "|        _|__|__|     |_|";
			insertString = "";
			_y = 0;
			limHeight = 0;
			autoCompleteList = new List.<String>( );
			bg = Resources.Load( "SkyBg", Texture2D ) as Texture2D;


			consoleString += '\n\nWaiting for input...\n';
		}

		/**
		* function StartUp
		*
		* @param
		* @return
		*/
		public function StartUp( ){
				
		}

		// -------o Getter Setter
			/**
			* function get command
			*
			* @param
			* @return
			*/
			public function get command( ) : String{
				var s : String = insertString;
				return s;
			}

			/**
			* function set command
			*
			* @param
			* @return
			*/
			public function set command( value : String ){
				insertString = value;
			}

			/**
			* function set command
			*
			* @param
			* @return
			*/
			public function set consoleText( value:String ){
				consoleString = value;
			}

	
		/**
		* function OnGUI
		*
		* @param
		* @return
		*/
		public function OnGUI( ){
			rectView = new Rect( 
				0,
				0,
				Screen.width,
				_y
			);

			rectAutoC = new Rect( 
				0,
				_y,
				Screen.width,
				Screen.height-_y
			);	

			GUILayout.BeginArea( rectView );
				GUI.DrawTexture( rectView, bg );
			  	
			  		scrollPosition = GUILayout.BeginScrollView (
			            					scrollPosition, GUILayout.Width ( rectView.width ), GUILayout.Height ( rectView.height - 30 ) );
			        	
			        GUILayout.Label( consoleString );

			        
			    GUILayout.EndScrollView ();
			    
			    GUI.SetNextControlName("InsertBox");
			    insertString = GUILayout.TextField( insertString, 255, GUILayout.Width( rectView.width - 10 ), GUILayout.Height( 20 ) );

			    if( model.bOpen )
			    	GUI.FocusControl("InsertBox");
			    else
			    	GUI.FocusControl("");

			GUILayout.EndArea( );

			GUILayout.BeginArea( rectAutoC );
				
				var sAuto : String = '';
				for( s in autoCompleteList ){
					sAuto += s + "\n";
				}
				GUILayout.Label( sAuto );
			
			GUILayout.EndArea( );



			_y += slideFactor;

			if( limHeight == 0 ){
				if( _y < limHeight )
					slideFactor = 0;
			}else{
				if( _y > limHeight )
					slideFactor = 0;
			}


		}



		//---------o Public

				/**
				* function log
				*
				* @param
				* @return
				*/
				public function log( s ){
					consoleString += s + "\n";
				}

				/**
				* function open
				*
				* @param
				* @return
				*/
				public function open( ){
					slideFactor = slideSpeed;
					limHeight = Screen.height * .5f;
				}

				/**
				* function close
				*
				* @param
				* @return
				*/
				public function close( ){
					slideFactor = -slideSpeed;
					limHeight = 0;

					insertString = "";
					autoCompleteList = new List.<String>( );
				}

				/**
				* function autoComplete
				*
				* @param
				* @return
				*/
				public function autoComplete( aList:List.<String> ){
					autoCompleteList = aList;
				}

}