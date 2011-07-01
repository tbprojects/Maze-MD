class MoverTriggerScript extends MonoBehaviour
{

	var movingBlocks :  GameObject [];

	private var isMoved = false;

	function OnTriggerEnter(other: Collider) {
		if (!isMoved) {
			for( var movingBlock in movingBlocks) {
				movingBlock.GetComponent("MovingPlatformScript2").moveTimes = 1;			
			}
			isMoved = true;
		}
	}

	function Update () {
	
	}

}