#pragma strict

/**
* @Author Lostyne
* Singleton Machine class
* FrontController pattern for Unity3d ( Unityscript version )
*/

import System.Collections.Generic;

public class StateManager extends MonoBehaviour
{
	public enum State
	{
		NULL,
		MENU,
		GAME,
		END
	}

	public static var instance : StateManager;
	public var defaultState : State;

	protected var _state : State;
	protected var _prevState : State;

	protected var _hStates : Hashtable = new Hashtable( );

	// Use this for initialization ( This is a singleton )
	function Awake() {
		if( instance == null )
		{
			instance = this;
		}
		else
		{
			Debug.LogError( "Cannot instantiate StateManager twice !" );
		}

		init( );
		state = defaultState;
	}

	/**
	* Initialisation of states
	*/
	public function init(){
		var sMenu : List.<System.Type> = new List.<System.Type>( );
			sMenu.Add( StateMenu );
			sMenu.Add( StateFooter );
		
		var sGame : List.<System.Type> = new List.<System.Type>( );
			sGame.Add( StateGame );

		var sEnd : List.<System.Type> = new List.<System.Type>( );
			sEnd.Add( StateEnd );
			sEnd.Add( StateFooter );

		registerState( State.MENU, sMenu );
		registerState( State.GAME, sGame );
		registerState( State.END, sEnd );
	}

	/**
	* function get state
	*
	* @param
	* @return 	current State 		( enum State )
	*/
	public function get state() : State{
		return _state;
	}


	/**
	* Register a state
	* 
	* @public
	* @param 	eName 		: State cade name  ( enum State )
	* @param 	lProcess 	: List of process ( List.<System.Type> )
	* @return 	true if success 	( boolean )
	*/
	public function registerState( eName : State, lProcess : List.<System.Type> ) : boolean{
		if( _hStates.ContainsKey( eName ) )
			Debug.LogError( "registerState ::: A State with the name " + eName + "is already registered" );

		_hStates.Add( eName, lProcess );
		return true;
	}

	/**
	* function registerState
	* 
	* @public
	* @param 	eName 		: State cade name  ( enum State )
	* @return 	list of process 	( List.<StateProcess> )
	*/
	public function getStateContent( eName : State ) : List.<System.Type>{
		return _hStates[ eName ] as List.<System.Type>;
	}

	/**
	* UnRegister a state
	*
	* @param 	eName 		: State cade name  ( enum State )
	* @return 	true if success 	( boolean )
	*/
	public function unRegisterStater( eName : State ) : boolean{
		if( !_hStates.ContainsKey( eName ) )
			Debug.LogError( "getStateContent ::: The State " + eName + " is not registered" );

		_hStates.Remove( eName );
		return true;
	}

	/**
	* Set the current display state 
	*
	* @param 	value 	: State to draw 	( enum State )
	* @return
	*/
	public function set state( value:State ){
		if( !_hStates.ContainsKey( value ) )
			Debug.LogError( "The state " + value + " is unkown" );

		if( _state == value )
			Debug.LogError( "The state " + value + " is already the current state" );

		_execState( value );
	}




	//--------o protected 
				

				/**
				* Store the last state before drawing the new state
				*
				* @param 	eName 	: State to draw 	( enum State )
				* @return
				*/
				private function _execState( eName : State ){
					_prevState = _state;
					_state = eName;
					_drawState( );
				}

				/**
				* Drawning the DisplayList of the current state
				*
				* @param
				* @return
				*/
				private function _drawState(){
					var v : List.<System.Type> = _hStates[ _state ] as List.<System.Type>;
					var i : int;
					var comp : Component;

					if( _prevState )
					{
						var vTmp : List.<System.Type> = _hStates[ _prevState ];
						i = vTmp.Count;

						while( --i >= 0 )
						{
							if( v.Contains( vTmp[ i ] ) )
								continue;

							comp = GetComponent( vTmp[ i ] );
							( comp as StateProcess ).Exit( );
							Destroy(  comp );
						}
					}

					i = v.Count;
					while( --i >= 0 )
					{
						comp = GetComponent( v[ i ] );
						if( comp == null )
							gameObject.AddComponent( v[ i ] );
					}
				}
}