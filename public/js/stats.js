// Fetch performance data for each event
document.querySelectorAll('.stat-card').forEach(card => {
    const event = card.querySelector('h3').textContent;
    fetch(`/api/performances/${encodeURIComponent(event)}`)
        .then(res => res.json())
        .then(data => {
            const ctx = document.getElementById(`chart-${event}`).getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.performances.map(p => p.date),
                    datasets: [{
                        label: 'Performance',
                        data: data.performances.map(p => parseFloat(p.time)),
                        borderColor: '#1a73e8',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get theme colors from CSS variables
    const style = getComputedStyle(document.documentElement);
    const primaryColor = style.getPropertyValue('--color-primary').trim();
    const lightColor = '#e9ecef';
    
    // Chart.js global defaults
    Chart.defaults.font.family = "'Poppins', 'system-ui', '-apple-system', 'sans-serif'";
    Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.05)';
    Chart.defaults.scale.grid.borderColor = 'rgba(0, 0, 0, 0.1)';
    
    // Initialize all event performance charts
    const eventCharts = document.querySelectorAll('.chart');
    eventCharts.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Race Times',
                    data: [12.2, 12.1, 11.9, 11.8, 11.7, 11.6],
                    borderColor: primaryColor,
                    backgroundColor: createGradient(ctx, lightColor, primaryColor),
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: primaryColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            size: 13
                        },
                        bodyFont: {
                            size: 12
                        },
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + 's';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return value + 's';
                            },
                            padding: 10
                        },
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    });

    // Initialize training load chart
    const trainingLoadCtx = document.getElementById('training-load-chart').getContext('2d');
    new Chart(trainingLoadCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Training Load',
                data: [85, 72, 90, 65, 88, 95, 60],
                backgroundColor: createGradient(trainingLoadCtx, lightColor, primaryColor),
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'Load: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        padding: 10
                    },
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Helper function to create gradients
    function createGradient(ctx, colorStart, colorEnd) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, colorEnd + '40'); // 25% opacity
        gradient.addColorStop(1, colorStart + '00'); // 0% opacity
        return gradient;
    }

    // Initialize progress circles with animation
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const value = parseInt(circle.dataset.value);
        animateProgress(circle, value);
    });

    function animateProgress(circle, targetValue) {
        let currentValue = 0;
        const duration = 1500;
        const increment = targetValue / (duration / 16);
        
        const animate = () => {
            if (currentValue < targetValue) {
                currentValue = Math.min(currentValue + increment, targetValue);
                circle.style.setProperty('--progress', (currentValue * 3.6) + 'deg');
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // Add scroll animations
    const animatedElements = document.querySelectorAll('.stat-card, .overview-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach(el => observer.observe(el));
});