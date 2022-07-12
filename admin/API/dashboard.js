const jumlahPermintaan = document.querySelector('#jumlahPermintaan');
const jumlahPasien = document.querySelector('#jumlahPasien');
const jumlahKonselor = document.querySelector('#jumlahKonselor');
const ctx = document.getElementById('mybarChart');

const getAllData = async () => {
    try{
        const { data } = await axios.get('https://howslifeapi.herokuapp.com/api/v1/admin/dashboard', )
        
        const {konsultasi, user, subjectMasalah} = data.data;
        const {keluarga, percintaan, pendidikan, pribadi, lainnya} = subjectMasalah

        jumlahPermintaan.innerHTML = konsultasi.total
        jumlahPasien.innerHTML = user.pasien
        jumlahKonselor.innerHTML = user.konselor

        const mybarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Keluarga', 'Percintaan', 'Pendidikan', 'Pribadi', 'Lainya'],
                datasets: [{
                    label: 'SUBJEK MASALAH',
                    data: [keluarga, percintaan, pendidikan, pribadi, lainnya],
                    backgroundColor: [
                        '#47B5FF',
                        '#47B5FF',
                        '#47B5FF',
                        '#47B5FF',
                        '#47B5FF'
                    ],
                    borderColor: [
                        'white',
                        'white',
                        'white',
                        'white',
                        'white'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }catch(error) {
        jumlahPermintaan.innerHTML = 'error to fetch'
        jumlahPasien.innerHTML = 'error to fetch'
        jumlahKonselor.innerHTML = 'error to fetch'
		
    }
}

getAllData();



        