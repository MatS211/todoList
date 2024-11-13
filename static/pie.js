// static/pie.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            const labels = data.labels;
            const values = data.values;

            const ctx = document.getElementById('myChart').getContext('2d');
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
                    }
                }
            });
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
        });
});
