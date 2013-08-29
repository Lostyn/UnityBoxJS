#pragma strict

public class StateFooter extends StateProcess
{
	function OnGUI() 
	{
		if (GUI.Button(new Rect(50, 500, 200, 80), "FOOTER"))
        {
            print( "footer" );
        }
	}
}