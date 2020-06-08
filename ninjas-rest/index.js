<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Ninjago</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <link href="/styles.css" rel="stylesheet" />
    </head>
    <body>

        <h1 class="title">Ninjago - a Ninja REST API</h1>
        <div id="homepage">
            <h1>Hire a ninja in your area!</h1>
            <div id="ninjas"></div>
        </div>

        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        <script src="https://unpkg.com/react@15/dist/react.js"></script>
        <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>

        <!-- Create React Component -->
        <script type="text/babel">
        var Ninjas = React.createClass({
            getInitialState: function(){
                return({
                    ninjas: []
                });
            },
            render: function(){
                var ninjas = this.state.ninjas;
                ninjas = ninjas.map(function(ninja, index){
                    return(
                        <li key={index}>
                            <span className={ninja.obj.available}></span>
                            <span className="name">{ninja.obj.name}</span>
                            <span className="rank">{ninja.obj.rank}</span>
                            <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
                        </li>
                    );
                });
                return(
                    <div id="ninja-container">
                        <form id="search" onSubmit={this.handleSubmit}>
                            <label>Enter your Latitude:</label>
                            <input type="text" ref="lat" placeholder="latitude" required />
                            <label>Enter your Longitude:</label>
                            <input type="text" ref="lng" placeholder="longitude" required />
                            <input type="submit" value="Find Ninjas" />
                        </form>
                        <ul>{ninjas}</ul>
                    </div>
                );
            },
            handleSubmit: function(e){
                e.preventDefault();
                var lng = this.refs.lng.value;
                var lat = this.refs.lat.value;

                fetch('/api/ninjas?lng=' + lng + '&lat=' + lat).then(function(data){
                    return data.json();
                }).then( json => {
                    this.setState({
                        ninjas: json
                    });
                    console.log(json);
                });
            }
        });
        ReactDOM.render(<Ninjas />, document.getElementById('ninjas'));
        </script>


    </body>
</html>