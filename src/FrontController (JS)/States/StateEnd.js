#pragma strict

public class StateEnd extends StateProcess
{
	function OnGUI()
    {
        if (GUI.Button(new Rect(50, 50, 200, 80), "MENU"))
        {
            StateManager.instance.state = StateManager.State.MENU;
        }
    }
}