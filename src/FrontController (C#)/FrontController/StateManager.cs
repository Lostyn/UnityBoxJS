using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class StateManager : MonoBehaviour {

	public enum State
	{
		NULL,
		MENU,
		GAME,
		END
	}

	public static StateManager instance;
	public State defaultState;

	protected State _state;
	protected State _prevState;

	protected Hashtable _hStates = new Hashtable();

	// Use this for initialization ( this is a singleton )
	void Awake() {
		if( instance == null )
			instance = this;
		else
			Debug.LogError( "Cannot instantiate StateManager twice !" );

		init( );
	}

	/**
	* Initialisation of states
	*
	* @param
	* @return 
	*/
	public void init( ){
		List<System.Type> sMenu = new List<System.Type>( );
			sMenu.Add( typeof( StateMenu ) );
			sMenu.Add( typeof( StateFooter ) );
		
		List<System.Type> sGame = new List<System.Type>( );
			sGame.Add( typeof( StateGame ) );

		List<System.Type> sEnd = new List<System.Type>( );
			sEnd.Add( typeof( StateEnd ) );
			sEnd.Add( typeof( StateFooter ) );

		registerState( State.MENU, sMenu );
		registerState( State.GAME, sGame );
		registerState( State.END, sEnd );

		state = defaultState;
	}

	/**
	* Register a state
	* 
	* @public
	* @param 	eName 		: State cade name  ( enum State )
	* @param 	lProcess 	: List of process ( List<System.Type> )
	* @return 	true if success 	( bool )
	*/
	public bool registerState( State eName, List<System.Type> lProcess ){
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
	* @return 	list of process 	( List<System.Type> )
	*/
	public List<System.Type> getStateContent( State eName ) {
		return ( List<System.Type> ) _hStates[ eName ];
	}

	/**
	* UnRegister a state
	*
	* @param 	eName 		: State cade name  ( enum State )
	* @return 	true if success 	( bool )
	*/
	public bool unRegisterStater( State eName ){
		if( !_hStates.ContainsKey( eName ) )
			Debug.LogError( "getStateContent ::: The State " + eName + " is not registered" );

		_hStates.Remove( eName );
		return true;
	}



	public State state
	{
		get
		{
			return _state;
		}
		set
		{
			if( !_hStates.ContainsKey( value ) )
				Debug.LogError( "The state " + value + " is unkown" );

			if( _state == value )
				Debug.LogError( "The state " + value + " is already the current state" );

			_execState( value );
		}
	}



	//----------o Private

					/**
					* Store the last state before drawing the new state
					*
					* @param 	eName 	: State to draw 	( enum State )
					* @return
					*/
					private void _execState( State eName ){
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
					private void _drawState(){
						List<System.Type> v = ( List<System.Type> ) _hStates[ _state ];
						int i;
						StateProcess comp;

						List<System.Type> vTmp = ( List<System.Type> ) _hStates[ _prevState ];
						if( vTmp != null )
						{
							
							i = vTmp.Count;

							while( --i >= 0 )
							{
								if( v.Contains( vTmp[ i ] ) )
									continue;

								comp = ( StateProcess ) GetComponent( vTmp[ i ] );
								comp.Exit( );
								Destroy(  comp );
							}
						}

						i = v.Count;
						while( --i >= 0 )
						{
							comp = ( StateProcess ) GetComponent( v[ i ] );
							if( comp == null )
								gameObject.AddComponent( v[ i ] );
						}
					}
}
