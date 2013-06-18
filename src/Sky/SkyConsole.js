public class SkyConsole extends MonoBehaviour {
	
	
	private static var instance : SkyConsole;

	private var model : SkyModel;
	private var view : SkyView;
	private var controller : SkyController;

	public function SkyConsole(){
		if( instance != null )
    		Debug.Log( "This is a single Instance class!  Use MySingletonInstance.getInstance()" );
	}


	// ----------o System

		


				// -------o Public



							/**
							* function Init
							*
							* @param
							* @return
							*/
							public function Init( ){
								model      = new SkyModel( );
								view       = gameObject.AddComponent( SkyView );
								controller = new SkyController( );

								model.view = view;
								model.controller = controller;

								controller.view = view;
								controller.model = model;

								view.model = model;
								view.controller = controller;

								model.initialize( );
								view.initialize( );
								controller.initialize( );

								model.StartUp( );
								view.StartUp( );
								controller.StartUp( );
							}

		/**
		* Systeme OnGUI function
		*/
		function OnGUI( ){
			//Input
			var e : Event = Event.current;
			if( Event.current.type != EventType.KeyUp )
				return;
			
			switch( e.keyCode ){
				case KeyCode.Return:
        			controller.OnEnterPress( );
					break;
				case KeyCode.F9:
					controller.OnF9( );
					break;
				default:
					if( model.bOpen )
						model.autoComplete( );
			}
		}					



		// --------o Static

			/**
			* function Log
			*			write something in the console
			* @param
			* @return
			*/
			public static function Log( s:String ){
				getInstance( ).log( s );
			}

			/**
			* function registerCommand
			*			register a command which can be execute with the console
			* @param
			* @return
			*/
			public static function RegisterCommand( sCOMM:String, f:Function, sHELP:String ){
				getInstance( ).model.registerCommand( sCOMM, f, sHELP );
			}





		// -------------o Singleton

					  	public static function CreateInstance () 
					  	{
					  		if ( instance == null ) 
					        {
					            go = new GameObject ("SkyConsole_" + Mathf.Round( ( Random.value * 1000 ) ) );
					            instance = go.AddComponent( SkyConsole );
					            DontDestroyOnLoad ( go );

					           	instance.getInstance( ).Init( );
					        }else{
					        	Debug.Log( "This is a single Instance class!  Use MySingletonInstance.CreateInstance() only on time!" );
					        }
					    }

					    public static function getInstance( ) : SkyConsole
					    {
					    	if( instance == null )
					    		CreateInstance( );

					    	return instance;
					    }

					    public function OnApplicationQuit() 
					    {
					    	instance = null;
					    }



}