using UnityEngine;
using System.Collections;

public class StateGame : StateProcess {

	void OnGUI()
    {
        if (GUI.Button(new Rect(50, 50, 200, 80), "END"))
        {
            StateManager.instance.state = StateManager.State.END;
        }
    }
}
