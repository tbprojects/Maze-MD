var runSpeedScale = 0.25;
var walkSpeedScale = 0.25;


function Start ()
{
	// By default loop all animations
	animation.wrapMode = WrapMode.Loop;

	animation["run"].layer = -1;
	animation["walk"].layer = -1;
	animation["idle"].layer = -2;
	animation.SyncLayer(-1);

    animation["ledge_fall"].layer = 9;	
	animation["ledge_fall"].wrapMode = WrapMode.Loop;

	// The jump animation is clamped and overrides all others
	animation["jump"].layer = 10;
	animation["jump"].wrapMode = WrapMode.ClampForever;

	animation["jumpfall"].layer = 10;	
	animation["jumpfall"].wrapMode = WrapMode.ClampForever;

	animation["jumpland"].layer = 10;	
	animation["jumpland"].wrapMode = WrapMode.Once;

	// We are in full control here - don't let any other animations play when we start
	animation.Stop();
	animation.Play("idle");
}


function Update ()
{
	var playerController : RatPlayerController = GetComponent(RatPlayerController);
	var currentSpeed = playerController.GetSpeed();

	// Fade in run
	if (currentSpeed > playerController.walkSpeed)
	{
		animation.CrossFade("run");
		// We fade out jumpland quick otherwise we get sliding feet
		animation.Blend("jumpland", 0);
	}
	// Fade in walk
	else if (currentSpeed > 0.1)
	{
		animation.CrossFade("walk");
		// We fade out jumpland realy quick otherwise we get sliding feet
		animation.Blend("jumpland", 0);
	}
	// Fade out walk and run
	else
	{
		animation.Blend("walk", 0.0, 0.3);
		animation.Blend("run", 0.0, 0.3);
		animation.Blend("run", 0.0, 0.3);
	}
	
	animation["run"].normalizedSpeed = runSpeedScale;
	animation["walk"].normalizedSpeed = walkSpeedScale;
	
	if (playerController.IsJumping ())
	{
		if (playerController.HasJumpReachedApex ())
		{
			animation.CrossFade ("jumpfall", 0.2);
		}
		else
		{
			animation.CrossFade ("jump", 0.2);
		}
	}
	// We fell down somewhere
	else if (!playerController.IsGroundedWithTimeout())
	{
		animation.CrossFade ("ledge_fall", 0.2);
	}
	// We are not falling down anymore
	else
	{
		animation.Blend ("ledge_fall", 0.0, 0.2);
	}
}

function DidLand () 
{
	animation.Play("jumpland");
}

@script AddComponentMenu ("Rat Player Animation")