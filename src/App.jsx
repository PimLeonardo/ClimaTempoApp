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
      <nav className="navbar navbar-expand-md navbar-dark mb-4 bg-info">
        <img src="./favicon.svg" width="50" height="50" alt="" />
        <a className="navbar-brand text-white ml-2" href="#">
          Clima Tempo App
        </a>
      </nav>

      <main className="container col-md-4">
        <div className="jumbotron">
          <h1>
            Veja agora a previsão do clima e tempo da sua cidade!
          </h1>
          <p className="lead mb-4">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>

          <div className="row mb-4">
            <div className="col-md-12">
              <input
                placeholder="Nome da cidade"
                className="form-control"
                value={city}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="d-block ml-auto btn btn-outline-info btn-lg" onClick={handleSearch}>
            Pesquisar
          </button>

          {weatherForecast ? (
            <div className="flex-row flex-wrap mt-4">
              <div className="d-flex justify-content-around mb-2 p-4">
                <img className="m-auto p-2" src={weatherForecast.current.condition.icon} alt="" />
                <h3 className="m-auto text-left">Hoje o dia está: {weatherForecast.current.condition.text}</h3>
              </div>
              <div className="d-flex justify-content-around">
                <p className="lead">
                  Temp: {weatherForecast.current.temp_c}º
                </p>
                <p className="lead">
                  Umidade: {weatherForecast.current.humidity}%
                </p>
              </div>
              <div className="d-flex justify-content-around">
                <div class="p2 mr-auto">Cidade: {weatherForecast.location.name}</div>
                <div class="p2 ml-auto">Latitude: {weatherForecast.location.lat}</div>
              </div>
              <div className="d-flex justify-content-around">
                <div class="p2 mr-auto">Estado: {weatherForecast.location.region}</div>
                <div class="p2 ml-auto">Longitude: {weatherForecast.location.lon}</div>
              </div>
            </div>
          ) : null}

        </div>
      </main>
    </div>
  )
}

export default App
