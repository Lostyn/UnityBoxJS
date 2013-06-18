public class SkyController extends MonoBehaviour {
	public var view : SkyView;
	public var model : SkyModel;

	/**
	* function initialize
	*
	* @param
	* @return
	*/
	public function initialize( ){
		
	}

	/**
	* function StartUp
	*
	* @param
	* @return
	*/
	public function StartUp( ){
		
	}


	//----------o Public

		/**
		* function OnEnterPress
		*
		* @param
		* @return
		*/
		public function OnEnterPress( ){
			model.send( );
		}


		/**
		* function OnF9
		*
		* @param
		* @return
		*/
		public function OnF9( ){
			model.openClose( );
		}
}