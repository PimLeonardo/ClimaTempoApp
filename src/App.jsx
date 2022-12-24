import { useState } from "react"

function App() {
  const [city, setCity] = useState("")
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSearch = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=546a70db88484961bdd163954222412&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((data) => {
        setWeatherForecast(data)
        console.log(data)
      })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#">
          Clima Tempo App
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>
            Veja agora a previsão do clima e tempo da sua cidade!
          </h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                placeholder="Nome da cidade"
                className="form-control"
                value={city}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleSearch}>
            Pesquisar
          </button>

          {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={weatherForecast.current.condition.icon} alt="" />
                </div>
                <div>
                  <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                  <p className="lead">
                    Temp: {weatherForecast.current.temp_c}º
                  </p>
                </div>
              </div>
            </div>
          ) : null}

        </div>
      </main>
    </div>
  )
}

export default App
