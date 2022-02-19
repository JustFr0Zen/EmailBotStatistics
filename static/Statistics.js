class Statistics {
    constructor(statistics) {
        this.statistics = statistics;
        this.load();
    }

    load() {
        const mailPerHourData = [];
        this.statistics.forEach(([_, mails_hour, __, ___], index) => {
            if (index === (this.statistics || []).length - 1)
                return;

            const [date_next, mails_hour_next] = this.statistics[index + 1];

            const diff = mails_hour_next - mails_hour;

            if (diff < 0)
                return;

            mailPerHourData.push({
                'x': moment(date_next).format("YYYY-MM-DD HH:mm:ss"),
                'y': diff
            });
        })
        
        const mailPerDay = [];
        this.statistics.forEach(([_ , mails_hour, __, ___], index) => {
            if (index === (this.statistics || []).length - 1)
                return;

            const [date_next, mails_hour_next] = this.statistics[index + 1];

            const diff = mails_hour_next - mails_hour;

            if (diff >= 0)
                return;

            mailPerDay.push({
                'x': moment(date_next).format("YYYY-MM-DD"),
                'y': mails_hour
            });
        })
        const [currentDate, currentMaxMails] = this.statistics[this.statistics.length - 1];
        mailPerDay.push({
                'x': moment(currentDate).format("YYYY-MM-DD HH:mm:ss"),
                'y': currentMaxMails
            });

        this.mailsPerHourChart = new Chart(document.getElementById("mails-hour-chart"), {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: "Mails hour",
                        borderColor: "rgb(234,73,73)",
                        strokeColor: "rgb(234,73,73)",
                        lineColor: "rgb(234,73,73)",
                        backgroundColor: "rgb(234,73,73)",
                        borderWidth: 1,
                        pointRadius: 1.5,
                        data: mailPerHourData
                    },
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD.MM.YYYY',
                                hour: 'HH:mm',
                            },
                            tooltipFormat: "DD.MM.YYYY HH:mm"
                        },
                        min: moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss")
                    },
                    y: {
                        ticks: {
                             precision: 0
                             }
                        }
                },
                maintainAspectRatio: false
            }
        });
        
        this.mailsPerDayChart = new Chart(document.getElementById("mails-day-chart"), {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: "Mails day",
                        borderColor: "rgb(234,73,73)",
                        strokeColor: "rgb(234,73,73)",
                        lineColor: "rgb(234,73,73)",
                        backgroundColor: "rgb(234,73,73)",
                        borderWidth: 1,
                        pointRadius: 1.5,
                        data: mailPerDay
                    },
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD.MM.YYYY',
                                hour: 'HH:mm',
                            },
                            tooltipFormat: "DD.MM.YYYY HH:mm"
                        },
                        min: moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss")
                    },
                    y: {
        ticks: {
            precision: 0
        }
    }
                },
                maintainAspectRatio: false
            }
        });

        this.serverCountChart = new Chart(document.getElementById("server-count-chart"), {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: "Server Count",
                        pointRadius: 1.5,
                        borderColor: "rgba(220,220,220,1)",
                        strokeColor: "rgba(220,220,220,1)",
                        lineColor: "rgba(220,220,220,1)",
                        backgroundColor: "rgba(220,220,220,1)",
                        borderWidth: 1,
                        data: this.statistics.map(([date, _, __, server_count]) => {
                            return {
                                'x': moment(date).format("YYYY-MM-DD HH:mm:ss"),
                                'y': server_count
                            }
                        })

                    },
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD.MM.YYYY',
                                hour: 'HH:mm',
                            },
                            tooltipFormat: "DD.MM.YYYY HH:mm"
                        },
                        min: moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss")
                    },
                    y: {
        ticks: {
            precision: 0
        }
    }
                },
                maintainAspectRatio: false
            }
        });

        this.totalMailsChart = new Chart(document.getElementById("total-mails-chart"), {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: "Mails total",
                        borderColor: "rgb(33,245,15)",
                        strokeColor: "rgb(33,245,15)",
                        lineColor: "rgb(33,245,15)",
                        backgroundColor: "rgb(33,245,15)",
                        borderWidth: 1,
                        pointRadius: 1.5,
                        data: this.statistics.map(([date, _, mails_total, __]) => {
                            return {
                                'x': moment(date).format("YYYY-MM-DD HH:mm:ss"),
                                'y': mails_total
                            }
                        })

                    },
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD.MM.YYYY',
                                hour: 'HH:mm',
                            },
                            tooltipFormat: "DD.MM.YYYY HH:mm"
                        },
                        min: moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss")
                    },
                    y: {
        ticks: {
            precision: 0
        }
    }
                },
                maintainAspectRatio: false
            }
        });
    }

    setTimeInterval = (days) => {
        [this.mailsPerHourChart, this.totalMailsChart, this.serverCountChart, this.mailsPerDayChart].forEach(chart => {
            chart.options.scales.x.time.unit = this.getTimeUnit(days);

            if (!days) {
                chart.options.scales.x.min = undefined;
            } else {
                chart.options.scales.x.min = moment().subtract(days, "days").format("YYYY-MM-DD HH:mm:ss");
            }

            chart.update();
        });
    }

    getTimeUnit(days) {
        if (!days) {
            return "month"
        }

        if (days <= 1) {
            return "hour";
        }

        if (days <= 7) {
            return "day";
        }

        if (days <= 31) {
            return "week";
        }

        return "month";
    }
}

