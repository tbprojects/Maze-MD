// wszystkie interaktywne obiekty (z wyj¹tkiem tych, poruszanych wy³¹cznie za pomoc¹ fizyki)
// powinny rozszerzaæ klasê MonoBehaviour - daje to dostêp do pewnych podstawowych w³asnoœci
// jak np. po³o¿enie i orientacja obiektu w przestrzeni

/* ===========================================================
	klasa opisuj¹ca szeœcian obracaj¹cy siê wokó³ osi Y (pionowej)
*/
class CubeRotatorScript extends MonoBehaviour
{
	// zmienne nieoznaczone jako prywatne s¹ dostêpne w edytorze po prawej stronie 
	// (gdy skrypt jest przypisany do obiektu)
	// szybkoœæ - okreœla wartoœæ (np. w m/s)
	var rotationSpeed : float;
	
	
	// ta funkcja wywo³ywana jest tylko raz, kiedy skrypt jest przypisywany do obiektu
	// tutaj warto ustawiæ wszystkie warunki pocz¹tkowe
	function Start()
	{		
		rotationSpeed = 100;
	}
	
	
	// w tej funkcji poowinien byæ kod, który zawiera zmianê stanu obiektu (np. przemieszczanie siê/obrót)
	function Update()
	{		
		transform.rotation *= Quaternion.AngleAxis(rotationSpeed*Time.deltaTime, Vector3.up);
	}
}