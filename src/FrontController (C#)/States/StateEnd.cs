using UnityEngine;
using System.Collections;

public class StateEnd : StateProcess {

	void OnGUI()
    {
        if (GUI.Button(new Rect(50, 50, 200, 80), "MENU"))
        {
            StateManager.instance.state = StateManager.State.MENU;
        }
    }
}
