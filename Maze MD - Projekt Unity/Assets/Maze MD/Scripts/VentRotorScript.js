class VentRotorScript extends MonoBehaviour
{	
	var sleepTime : float = 2.0;
	var workDuration : float = 2.0;
	var rotationSpeed : float;
	
	var windParticle : ParticleEmitter;
	var direction : Vector3 = Vector3(0, 0, 1);
	var windPower = 20;
	
	private var lastWorkStartTime = 0.0;	
	
	
	function Start()
	{
		windParticle.emit = false;
	}
	
	
	// w tej funkcji poowinien byæ kod, który zawiera zmianê stanu obiektu (np. przemieszczanie siê/obrót)
	function Update()
	{		
		var lastEruptionEndTime = lastWorkStartTime + workDuration;
		if (windParticle.emit)
		{
			RotateVentRotor();
		
			// cz¹steczki emitowane, a min¹³ czas erupcji, wiêc przerywamy emisjê
			if (Time.time >= lastEruptionEndTime)
			{
				windParticle.emit = false;
			}
		}
		else if (Time.time >= lastEruptionEndTime + sleepTime)
		{		
			lastWorkStartTime = Time.time;
			windParticle.emit = true;
		}
	}
	
	
	function RotateVentRotor()
	{
		transform.rotation *= Quaternion.AngleAxis(rotationSpeed*Time.deltaTime, direction);
	}
	
	
	function OnTriggerEnter(col : Collider)
	{
		var controller : RatPlayerController = col.GetComponent(RatPlayerController);
	}


	function OnTriggerStay (col : Collider) 
	{
		var controller : RatPlayerController = col.GetComponent(RatPlayerController);
		if (controller != null && windParticle.emit)
		{		
			controller.AddIncreasingVelocity(transform.rotation * direction, windPower);
		}	
	}


	// Auto setup the script and associated trigger.
	function Reset ()
	{
		if (collider == null)	
			gameObject.AddComponent(BoxCollider);
		collider.isTrigger = true;
	}


	private function GetWindPowerVector() : Vector3
	{
		return transform.rotation*direction*windPower;
	}


	function OnDrawGizmosSelected ()
	{
		Gizmos.color = Color.yellow;
		Gizmos.DrawLine(transform.position, transform.position + GetWindPowerVector());
	}
}


@script RequireComponent(BoxCollider)
@script AddComponentMenu("Third Person Props/Jump pad")