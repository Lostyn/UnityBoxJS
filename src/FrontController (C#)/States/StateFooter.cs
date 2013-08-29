using UnityEngine;
using System.Collections;

public class StateFooter : StateProcess {

	void OnGUI() 
	{
		if (GUI.Button(new Rect(50, 500, 200, 80), "FOOTER"))
        {
            print( "footer" );
        }
	}
}
