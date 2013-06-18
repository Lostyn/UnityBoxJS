/**
* About UnitySignal implementation of As3Signal for Unity 3D
* @Author Lostyne
*/
#pragma strict


import System.Collections.Generic;


public class UnitySignal extends MonoBehaviour{


	private static var _dChannels 			: Dictionary.<SignalEvent, List.<UnitySignalListener> >;

	/**
	* function UnitySignal
	*				Construteur
	* @param
	* @return
	*/
	public function UnitySignal( ){
		Debug.Log( "This is a static class ! Don't instantiate this class" );
	}


	// -------o Public

				/**
				* function connect
				*				connect a signal
				* @param
				* @return
				*/
				static public function connect( f:Function, sSign:SignalEvent, from:GameObject ) : boolean
				{
					if( !_dChannels )
						_dChannels = new Dictionary.<SignalEvent, List.<UnitySignalListener> >( );

					if( isRegistered( f, sSign ) )
						return false;

					var vTmp : List.<UnitySignalListener>;
					
					if( hasChannel( sSign ) )
						vTmp = _dChannels[ sSign ];
					else
						vTmp = new List.<UnitySignalListener>( );
						
					vTmp.Add( new UnitySignalListener( f, sSign, from, "" ) );

					_dChannels[ sSign ] = vTmp;
					return true;
				}

				/**
				* function connect
				*				connect a signal on spécifique channel
				* @param
				* @return
				*/
				static public function connect( f:Function, sSign:SignalEvent, from:GameObject, sChannel:String ) : boolean
				{
					if( !_dChannels )
						_dChannels = new Dictionary.<SignalEvent, List.<UnitySignalListener> >( );

					if( isRegistered( f, sSign ) )
						return false;

					var vTmp : List.<UnitySignalListener>;
					
					if( hasChannel( sSign ) )
						vTmp = _dChannels[ sSign ];
					else
						vTmp = new List.<UnitySignalListener>( );
						
					vTmp.Add( new UnitySignalListener( f, sSign, from, sChannel ) );

					_dChannels[ sSign ] = vTmp;
					return true;
				}

				/**
				* function disconnect
				*				disconnect a signal
				* @param
				* @return
				*/
				static public function disconnect( f:Function, c:SignalEvent )
				{
					if( !hasChannel( c ) )
						return false;

					var vTmp 	: List.<UnitySignalListener> = _dChannels[ c ];
					var i 		: int = 0;
					var l 		: int = vTmp.Count;
					var s 		: UnitySignalListener;

					if( l == 0 )
						return false;

					for( i = 0; i < l; i++ ){
						s = vTmp[ i ];
						if( s.fRef == f && s.sSignal == c )
							break;

						s = null;
					}

					if( s == null )
						return false;

					vTmp.Remove( s );
					_dChannels[ c ] = vTmp;

					return true;
				}


				/**
				* function emit
				*			emit signal with param
				* @param
				* @return
				*/
				static public function emit( c:SignalEvent, param:Object ):boolean {
					if( !hasChannel( c ) ){
						print( '|| ATTENTION || -Signal :: Aucun recepteur pour ::: ' + c );
						return false;
					}

					var vTmp 	: List.<UnitySignalListener> = _dChannels[ c ];
					var l 		: int = vTmp.Count;

					if( l == 0 )
						return false;

					var sl 		: UnitySignalListener;
					var vRem 	: List.<UnitySignalListener> = new List.<UnitySignalListener>( );
					var i 		: int = 0;

					for( i = 0; i < l; i++ ){
						sl = vTmp[ i ];

						if( sl.from == null ){
							vTmp.Remove( sl );
							return false;
						}
						
						if( sl.sChannel == "" )
							sl.fRef( param );
						
					}

					return true;
				}

				/**
				* function emit
				*			emit signal with param on specifique channel
				* @param
				* @return
				*/
				static public function emit( c:SignalEvent, s:String, param:Object ):boolean {
					if( !hasChannel( c ) ){
						print( '|| ATTENTION || -Signal :: Aucun recepteur pour ::: ' + c );
						return false;
					}

					var vTmp 	: List.<UnitySignalListener> = _dChannels[ c ];
					var l 		: int = vTmp.Count;

					if( l == 0 )
						return false;

					var sl 		: UnitySignalListener;
					var vRem 	: List.<UnitySignalListener> = new List.<UnitySignalListener>( );
					var i 		: int = 0;

					for( i = 0; i < l; i++ ){
						sl = vTmp[ i ];

						if( sl.from == null ){
							vTmp.Remove( sl );
							return false;
						}

						if( sl.sChannel == s )
							sl.fRef( param );
					}

					return true;
				}




				/**
				* function emit
				*			emit a simple signal without param
				* @param
				* @return
				*/
				static function emit( c:SignalEvent ):boolean {
					if( !hasChannel( c ) ){
						print( '|| ATTENTION || -Signal :: Aucun recepteur pour ::: ' + c );
						return false;
					}
					
					var vTmp 	: List.<UnitySignalListener> = _dChannels[ c ];
					var l 		: int = vTmp.Count;

					if( l == 0 )
						return false;

					var sl 		: UnitySignalListener;
					var vRem 	: List.<UnitySignalListener> = new List.<UnitySignalListener>( );
					var i 		: int = 0;

					for( i = 0; i < l; i++ ){
						sl = vTmp[ i ];

						if( sl.from == null ){
							vTmp.Remove( sl );
							return false;
						}

						if( sl.sChannel == "" ){
							sl.fRef( );
						}
					}

					return true;
				}


				/**
				* function emit
				*			emit a simple signal without param on spécifique channel
				* @param
				* @return
				*/
				static function emit( c:SignalEvent, s:String ):boolean {
					if( !hasChannel( c ) ){
						print( '|| ATTENTION || -Signal :: Aucun recepteur pour ::: ' + c );
						return false;
					}

					var vTmp 	: List.<UnitySignalListener> = _dChannels[ c ];
					var l 		: int = vTmp.Count;

					if( l == 0 )
						return false;

					var sl 		: UnitySignalListener;
					var vRem 	: List.<UnitySignalListener> = new List.<UnitySignalListener>( );
					var i 		: int = 0;

					for( i = 0; i < l; i++ ){
						sl = vTmp[ i ];

						if( sl.from == null ){
							vTmp.Remove( sl );
							return false;
						}

						if( sl.sChannel == s )
							sl.fRef( );
					}

					return true;
				}



	// -------o Private

								/**
								* function hasChannel
								*
								* @param
								* @return
								*/
								static private function hasChannel( c:SignalEvent ) : boolean{
									if( !_dChannels )
										_dChannels = new Dictionary.<SignalEvent, List.<UnitySignalListener> >( );

									return _dChannels.ContainsKey( c );
								}

								/**
								* function isRegistered
								*
								* @param
								* @return
								*/
								static private function isRegistered( f:Function, c:SignalEvent ) : boolean{
									if( !hasChannel( c ) )
										return false;

									var vTmp 	: List.<UnitySignalListener> = _dChannels[ c ];
									var l 		: int = vTmp.Count;
									var i 		: int = 0;
									var sl 		: UnitySignalListener;

									for( i = 0; i < l; i++ ){

										sl = vTmp[ i ];
										if( sl.fRef == f )
											return true;
									}

									return false;
								}

	
}

class UnitySignalListener{
	public var from     : GameObject;
	public var sSignal  : SignalEvent;
	public var fRef     : Function;
	public var sChannel : String;

	/**
	* function UnitySignalListener
	*
	* @param
	* @return
	*/
	public function UnitySignalListener( f:Function, sSign:SignalEvent, fr:GameObject, sChan:String ){
		from     = fr;
		sSignal  = sSign;
		fRef     = f;
		sChannel = sChan;
	}
}