const jumlahPermintaan = document.querySelector('#jumlahPermintaan');
const jumlahPasien = document.querySelector('#jumlahPasien');
const jumlahKonselor = document.querySelector('#jumlahKonselor');


const getAllData = async () => {
    try{
        const { data } = await axios.get('https://howslifeapi.herokuapp.com/api/v1/admin/dashboard', )
        
        const {konsultasi, user, subjectMasalah} = data.data;

        jumlahPermintaan.innerHTML = konsultasi.waiting
        jumlahPasien.innerHTML = user.pasien
        jumlahKonselor.innerHTML = user.konselor

    }catch(error) {
        jumlahPermintaan.innerHTML = 'error to fetch'
        jumlahPasien.innerHTML = 'error to fetch'
        jumlahKonselor.innerHTML = 'error to fetch'
		
    }
}

getAllData();