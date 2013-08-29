using UnityEngine;
using System.Collections;

public class StateMenu : StateProcess {

	void OnGUI()
    {
        if (GUI.Button(new Rect(50, 50, 200, 80), "Play"))
        {
            StateManager.instance.state = StateManager.State.GAME;
        }
 
        if (GUI.Button(new Rect(50, 150, 200, 80), "Quit"))
        {
            StateManager.instance.state = StateManager.State.END;
        }
 
    }
}
