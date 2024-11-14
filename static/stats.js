// pie
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/stats/pie')
        .then(response => response.json())
        .then(data => {
            const labels = data.labels;
            const values = data.values;

            const ctx = document.getElementById('myChartPie').getContext('2d');
            const pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Kategorie zadań',
                        data: values,
                        backgroundColor: [
                            'rgba(66, 135, 245, 0.4)',
                            'rgba(247, 30, 48, 0.4)',
                            'rgba(129, 219, 2, 0.4)',
                            'rgba(2, 11, 107, 0.4)',
                            'rgba(196, 104, 163, 0.4)',
                            'rgba(196, 189, 57, 0.4)',
                            'rgba(92, 92, 92, 0.4)',
                            'rgba(2, 118, 176, 0.4)',
                            'rgba(232, 168, 84, 0.4)',
                            'rgba(184, 0, 0, 0.4)'
                        ],
                        borderColor: [
                            'rgba(66, 135, 245, 1)',
                            'rgba(247, 30, 48, 1)',
                            'rgba(129, 219, 2, 1)',
                            'rgba(2, 11, 107, 1)',
                            'rgba(196, 104, 163, 1)',
                            'rgba(196, 189, 57, 1)',
                            'rgba(92, 92, 92, 1)',
                            'rgba(2, 118, 176, 1)',
                            'rgba(232, 168, 84, 1)',
                            'rgba(184, 0, 0, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
        });
});

// line
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/stats/line')
        .then(response => response.json())
        .then(data => {
            const labels = data.labels;
            const values = data.values;

            const ctx = document.getElementById('myChartLine').getContext('2d');
            const lineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Ilość zadań w tej kategorii',
                        data: values,
                        backgroundColor: [
                            'rgba(66, 135, 245, 0.4)',
                            'rgba(247, 30, 48, 0.4)',
                            'rgba(129, 219, 2, 0.4)',
                            'rgba(2, 11, 107, 0.4)',
                            'rgba(196, 104, 163, 0.4)',
                            'rgba(196, 189, 57, 0.4)',
                            'rgba(92, 92, 92, 0.4)',
                            'rgba(2, 118, 176, 0.4)',
                            'rgba(232, 168, 84, 0.4)',
                            'rgba(184, 0, 0, 0.4)'
                        ],
                        borderColor: [
                            'rgba(66, 135, 245, 1)',
                            'rgba(247, 30, 48, 1)',
                            'rgba(129, 219, 2, 1)',
                            'rgba(2, 11, 107, 1)',
                            'rgba(196, 104, 163, 1)',
                            'rgba(196, 189, 57, 1)',
                            'rgba(92, 92, 92, 1)',
                            'rgba(2, 118, 176, 1)',
                            'rgba(232, 168, 84, 1)',
                            'rgba(184, 0, 0, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    // scales: {
                    //     x: {
                    //         type: 'time',
                    //         time: {
                    //             unit: 'day',
                    //             tooltipFormat: 'll', // format tooltipu
                    //             displayFormats: {
                    //                 day: 'DD MMM YYYY' // format dla dni
                    //             }
                    //         },
                    //         title: {
                    //             display: true,
                    //             text: 'Data'
                    //         }
                    //     }
                    // },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
        });
});

// pie2
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/stats/pie2')
        .then(response => response.json())
        .then(data => {
            const labels = data.labels;
            const values = data.values;

            const ctx = document.getElementById('myChartPie2').getContext('2d');
            const pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Ilość zadań z danym statusem',
                        data: values,
                        backgroundColor: [
                            'rgba(66, 135, 245, 0.4)',
                            'rgba(247, 30, 48, 0.4)',
                            'rgba(129, 219, 2, 0.4)',
                            'rgba(2, 11, 107, 0.4)',
                            'rgba(196, 104, 163, 0.4)',
                            'rgba(196, 189, 57, 0.4)',
                            'rgba(92, 92, 92, 0.4)',
                            'rgba(2, 118, 176, 0.4)',
                            'rgba(232, 168, 84, 0.4)',
                            'rgba(184, 0, 0, 0.4)'
                        ],
                        borderColor: [
                            'rgba(66, 135, 245, 1)',
                            'rgba(247, 30, 48, 1)',
                            'rgba(129, 219, 2, 1)',
                            'rgba(2, 11, 107, 1)',
                            'rgba(196, 104, 163, 1)',
                            'rgba(196, 189, 57, 1)',
                            'rgba(92, 92, 92, 1)',
                            'rgba(2, 118, 176, 1)',
                            'rgba(232, 168, 84, 1)',
                            'rgba(184, 0, 0, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
        });
});