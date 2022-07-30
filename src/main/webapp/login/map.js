
        function initMap() {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 6,
                center: { lat: 22.611055454616626, lng: 70.72304745531825 },
            });
            directionsRenderer.setMap(map);
            document.getElementById("submit_btn").addEventListener("click", () => {
                calculateDisplayRoutes(directionsService, directionsRenderer);
            });
        }

        function calculateDisplayRoutes(directionsService, directionsRenderer) {
            const waypts = [];
            const checkboxArray = document.getElementById("waypoints");

            for (let i = 0; i < checkboxArray.length; i++) {
            if (checkboxArray.options[i].selected) {
             waypts.push({
             location: checkboxArray[i].value,
             stopover: true,
              });
                }
             }

            directionsService.route({
                origin: document.getElementById("start").value,
                destination: document.getElementById("end").value,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            },(response, status) => {
                if (status === "OK" && response) {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];
                    const summaryPanel = document.getElementById("directions-route");
                    summaryPanel.innerHTML = "";

                    // For each route, display summary information.
                    for (let i = 0; i < route.legs.length; i++) {
                        const routeSegment = i + 1;
                        summaryPanel.innerHTML +=
                        "<b>Route Segment: " + routeSegment + "</b><br>";
                        summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                        summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
                        summaryPanel.innerHTML +=
                        route.legs[i].distance.text + "<br><br>";
                    }
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }
