const daftarPasien = document.querySelector('#daftarPasien');


const getAllData = async () => {
    try{
        const { data } = await axios.get('https://howslifeapi.herokuapp.com/api/v1/admin/pasien', )
        
        let allPasien = data.data;
        if(allPasien.length < 1){
            daftarPasien.innerHTML = '<h5 class="empty-list">Tidak ada pasien terdaftar</h5>'
        }

        allPasien = allPasien.map((pasien) => {
            const {name, age, jenis_kelamin} = pasien;
            return `
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                    </div>
                    <div class="card-body">
                        <div class="mx-auto d-block">
                            <img class="rounded-circle mx-auto d-block" src="images/icon/avatar-01.jpg" alt="Card image cap">
                            <h5 class="text-sm-center mt-2 mb-1">${name}</h5>
                            <div class="location text-sm-center">
                                <i class="fa fa-map-marker"></i> ${age} Th</div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join('')

        daftarPasien.innerHTML = allPasien

    }catch(error) {
        daftarPasien.innerHTML = '<h5 class="empty-list">Something went wrong cannot show your pasien, please be patient 😁!</h5>'
		
    }
}

getAllData();