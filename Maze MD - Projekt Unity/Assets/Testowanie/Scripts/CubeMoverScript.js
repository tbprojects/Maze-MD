// wszystkie interaktywne obiekty (z wyj¹tkiem tych, poruszanych wy³¹cznie za pomoc¹ fizyki)
// powinny rozszerzaæ klasê MonoBehaviour - daje to dostêp do pewnych podstawowych w³asnoœci
// jak np. po³o¿enie i orientacja obiektu w przestrzeni

/* ===========================================================
	klasa opisuj¹ca szeœcian poruszaj¹cy siê w górê i w dó³
*/
class CubeMoverScript extends MonoBehaviour
{
	// zmienne nieoznaczone jako prywatne s¹ dostêpne w edytorze po prawej stronie 
	// (gdy skrypt jest przypisany do obiektu)
	// szybkoœæ - okreœla wartoœæ (np. w m/s)
	var speed : float;
	
	// okreœla kierunek, w którym porusza siê cube
	var velocity : Vector3;
	
	
	// ta funkcja wywo³ywana jest tylko raz, kiedy skrypt jest przypisywany do obiektu
	// tutaj warto ustawiæ wszystkie warunki pocz¹tkowe
	function Start()
	{		
		speed = 5;
	
		// w Unity oœ Y jest umieszczona w pionie
		velocity = Vector3(0, 1, 0);
	}
	
	
	// w tej funkcji poowinien byæ kod, który zawiera zmianê stanu obiektu (np. przemieszczanie siê/obrót)
	function Update()
	{		
		// transform to obiekt przechowuj¹cy dane o po³o¿eniu ( position ) i orientacji ( rotation )
		// deltaTime to czas od ostatniego update'u (mamy np. 10 m/s a nie minê³a sekunda, to musimy policzyæ
		// o ile metrów przesunie siê np. po pó³ sekundy, czyli np. 0.5 s * 10 m/s
		transform.position += velocity * speed * Time.deltaTime * Mathf.Sin(Time.realtimeSinceStartup);
	}
}