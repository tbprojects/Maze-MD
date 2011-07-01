enum MoveDirection2
	{
		ToStart,
		ToEnd
	}
	


class MovingPlatformScript2 extends MonoBehaviour
{
	// pozycja koñcowa
	var endPosition : Vector3;

	// zmienne nieoznaczone jako prywatne s¹ dostêpne w edytorze po prawej stronie 
	// (gdy skrypt jest przypisany do obiektu)
	// szybkoœæ - okreœla wartoœæ (np. w m/s)
	var speed : float = 1;
	
	// czas oczekiwania po osi¹gniêciu pozycji pocz¹tkowej
	var waitTimeOnStartPosition : float;
	
	// czas oczekiwania po osi¹gniêciu pozycji koñcowej
	var waitTimeOnEndPosition : float;
	
	//iloœæ wykonywanych ruchów od - do; -1 nieskoñcznoœæ
	var moveTimes : float = -1;
	
	// pozycja pocz¹tkowa
	private var startPosition : Vector3;
	
	// okreœla czy poruszamy siê w stronê pozycji pocz¹tkowej czy koñcowej
	private var moveDirection : MoveDirection2 = MoveDirection2.ToEnd;
	
	// okreœla kierunek, w którym porusza siê cube	
	private var velocity : Vector3;	
	
	// okreœla czy oczekujemy na pozycji pocz¹tkowej lub koñcowej
	private var waiting : boolean = false;
		
	private var timeToWait : float = 0;
		
	// czas spêdzony na czekaniu od ostatniego osi¹gniêcia pozycji pocz¹tkowej lub koñcowej
	private var timeSpentWaiting : float = 0;
	
	
	// ta funkcja wywo³ywana jest tylko raz, kiedy skrypt jest przypisywany do obiektu
	// tutaj warto ustawiæ wszystkie warunki pocz¹tkowe
	function Start()
	{		
		startPosition = transform.position;
		
		velocity = (endPosition - startPosition).normalized;
	}
	
	
	// w tej funkcji poowinien byæ kod, który zawiera zmianê stanu obiektu (np. przemieszczanie siê/obrót)
	function Update()
	{	
		if (moveTimes != 0 )
		{
			if (waiting)
			{
				timeSpentWaiting += Time.deltaTime;
				
				if (timeToWait - timeSpentWaiting < 0)
					waiting = false;
					
				return;
			}
		
			// osi¹gnêliœmy pozycjê pocz¹tkow¹
			if ((transform.position - startPosition).magnitude < 1
				&& moveDirection == MoveDirection2.ToStart)
			{
				waiting = true;
				timeSpentWaiting = 0;
				timeToWait = waitTimeOnStartPosition;
				velocity = -velocity;			
				moveDirection = MoveDirection2.ToEnd;
				moveTimes -= 1;
			}
			// osi¹gnêliœmy pozycjê koñcow¹
			else if ((transform.position - endPosition).magnitude < 1
				&& moveDirection == MoveDirection2.ToEnd)
			{
				waiting = true;
				timeSpentWaiting = 0;
				timeToWait = waitTimeOnEndPosition;
				velocity = -velocity;
				moveDirection = MoveDirection2.ToStart;
				moveTimes -= 1;
			}
			
			
			// transform to obiekt przechowuj¹cy dane o po³o¿eniu ( position ) i orientacji ( rotation )
			// deltaTime to czas od ostatniego update'u (mamy np. 10 m/s a nie minê³a sekunda, to musimy policzyæ
			// o ile metrów przesunie siê np. po pó³ sekundy, czyli np. 0.5 s * 10 m/s
			transform.position += velocity * speed * Time.deltaTime;
		}
	}
}