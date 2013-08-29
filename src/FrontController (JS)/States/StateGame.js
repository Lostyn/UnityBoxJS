#pragma strict

public class StateGame extends StateProcess
{
	function OnGUI()
    {
        if (GUI.Button(new Rect(50, 50, 200, 80), "END"))
        {
            StateManager.instance.state = StateManager.State.END;
        }
    }
}