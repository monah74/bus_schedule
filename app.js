document.addEventListener('DOMContentLoaded', () => {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const daySelect = document.getElementById('day');
    const searchButton = document.getElementById('search-button');
    const scheduleDiv = document.getElementById('schedule');

    // Пример данных (замените на ваши данные)
    const routes = [
        {
            id: 1,
            name: "Одеса-Біляївка / Біляївка-Одеса",
            directions: [
                { from: "Біляївка", to: "Одеса", times: ["05:10", "06:10", "07:10", "08:10", "09:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:30", "16:30"] },
                { from: "Одеса", to: "Біляївка", times: ["07:10", "08:10", "09:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:30", "16:45", "17:45", "18:30"] }
            ]
        },
        {
            id: 2,
            name: "Теплодар-Одеса / Одеса-Теплодар",
            directions: [
                { from: "Теплодар", to: "Одеса", times: ["05:00", "05:30", "06:10", "06:35", "07:00", "07:30", "08:00", "08:30", "09:00", "10:00", "10:50", "11:30", "12:10", "12:50", "13:30", "14:00", "14:30", "15:00", "15:40", "16:20", "17:00", "18:20"] },
                { from: "Одеса", to: "Теплодар", times: ["07:00", "07:35", "08:05", "08:35", "09:00", "09:30", "10:00", "10:30", "11:00", "12:00", "12:50", "13:30", "14:10", "14:50", "15:30", "16:00", "16:30", "17:00", "17:40", "18:20", "19:00", "20:10"] }
            ]
        },
        {
            id: 3,
            name: "Теплодар-Біляївка / Біляївка-Теплодар",
            directions: [
                { from: "Теплодар", to: "Біляївка", times: ["07:10", "08:30", "11:00", "16:30"] },
                { from: "Біляївка", to: "Теплодар", note: "ч/з Майори", times: ["07:40", "10:00", "12:00", "17:30"] }
            ]
        }
    ];

    // Заполнение выпадающих списков
    const locations = [...new Set(routes.flatMap(route => route.directions.flatMap(direction => [direction.from, direction.to])))]
        .sort();
    locations.unshift("All Locations");

    fromSelect.innerHTML = locations.map(loc => `<option value="${loc}">${loc}</option>`).join('');
    toSelect.innerHTML = locations.map(loc => `<option value="${loc}">${loc}</option>`).join('');

    // Функция для поиска маршрутов
    const searchRoutes = () => {
        const from = fromSelect.value;
        const to = toSelect.value;
        const day = daySelect.value;

        scheduleDiv.innerHTML = '';

        const filteredRoutes = routes.flatMap(route =>
            route.directions.filter(direction =>
                (from === "All Locations" || direction.from === from) &&
                (to === "All Locations" || direction.to === to) &&
                (day === "All Days" || !direction.days || direction.days.includes(day))
            )
        );

        if (filteredRoutes.length === 0) {
            scheduleDiv.innerHTML = '<p>No routes found.</p>';
            return;
        }

        filteredRoutes.forEach(direction => {
            const directionHeader = document.createElement('h2');
            directionHeader.innerText = `${direction.from} → ${direction.to}`;
            scheduleDiv.appendChild(directionHeader);

            const timesList = document.createElement('ul');
            direction.times.forEach(time => {
                const timeItem = document.createElement('li');
                timeItem.innerText = time;
                timesList.appendChild(timeItem);
            });
            scheduleDiv.appendChild(timesList);
        });
    };

    // Обработчик событий для кнопки поиска
    searchButton.addEventListener('click', searchRoutes);
});
