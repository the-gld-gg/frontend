import React from 'react'
import './Map.css'

class Map extends React.Component {

    componentDidMount(){
        setTimeout(() => {
            if (!window || !window.L) return
            window.navigator.geolocation.getCurrentPosition(position => {
                const mymap = window.L.map('mapid').setView([position.coords.latitude,position.coords.longitude], 13);
                window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);
                const circle = window.L.circle([position.coords.latitude, position.coords.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(mymap);
                const popup = window.L.popup()
                    .setLatLng([position.coords.latitude, position.coords.longitude])
                    .setContent("You are here")
                    .openOn(mymap);
            });
        }, 1000);
    }
    render(){
        return (
            <div>
                <div id="mapid"></div>
            </div>
        )
    }
}

export default Map