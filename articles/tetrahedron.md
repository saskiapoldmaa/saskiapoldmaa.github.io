<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetrahedron Animation</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
    <div id="plot"></div>
    <script>
        fetch('trajectories.json')
            .then(response => response.json())
            .then(data => {
                const A = data.A;
                const B = data.B;
                const C = data.C;
                const D = data.D;
                
                const centroid = [
                    (A[0][0] + B[0][0] + C[0][0] + D[0][0]) / 4,
                    (A[0][1] + B[0][1] + C[0][1] + D[0][1]) / 4,
                    (A[0][2] + B[0][2] + C[0][2] + D[0][2]) / 4
                ];

                const dataPlot = [{
                    type: 'scatter3d',
                    mode: 'markers+lines',
                    x: A.map(p => p[0]).concat(B.map(p => p[0]), C.map(p => p[0]), D.map(p => p[0]), [A[0][0], C[0][0], B[0][0], D[0][0], C[0][0], D[0][0], B[0][0], A[0][0]]),
                    y: A.map(p => p[1]).concat(B.map(p => p[1]), C.map(p => p[1]), D.map(p => p[1]), [A[0][1], C[0][1], B[0][1], D[0][1], C[0][1], D[0][1], B[0][1], A[0][1]]),
                    z: A.map(p => p[2]).concat(B.map(p => p[2]), C.map(p => p[2]), D.map(p => p[2]), [A[0][2], C[0][2], B[0][2], D[0][2], C[0][2], D[0][2], B[0][2], A[0][2]]),
                    marker: { size: 4 },
                    line: { width: 2 }
                }, {
                    type: 'scatter3d',
                    mode: 'markers',
                    x: [centroid[0]],
                    y: [centroid[1]],
                    z: [centroid[2]],
                    marker: { size: 6, color: 'red' }
                }];

                const layout = {
                    title: 'Tetrahedron Animation',
                    scene: {
                        xaxis: { range: [-1, 1] },
                        yaxis: { range: [-1, 1] },
                        zaxis: { range: [-1, 1] }
                    }
                };

                Plotly.newPlot('plot', dataPlot, layout);
            });
    </script>
</body>
</html>
