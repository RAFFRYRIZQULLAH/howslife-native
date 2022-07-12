const daftarPasien = document.querySelector('#daftarKonselor');


const getAllData = async () => {
    try{
        const { data } = await axios.get('https://howslifeapi.herokuapp.com/api/v1/admin/konselor', )
        
        let allKonselor = data.data;
        if(allKonselor.length < 1){
            allKonselor.innerHTML = '<h5 class="empty-list">Tidak ada pasien terdaftar</h5>'
        }

        allKonselor = allKonselor.map((konselor) => {
            const {name, role, jenis_kelamin} = konselor;
            return `
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                    </div>
                    <div class="card-body">
                        <div class="mx-auto d-block">
                            <img class="rounded-circle mx-auto d-block" src="images/icon/avatar-01.jpg" alt="Card image cap">
                            <h5 class="text-sm-center mt-2 mb-1">${name}</h5>
                            <hr>
                            <h5 class="text-sm-center mt-2 mb-1">${role}</h5>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join('')

        daftarPasien.innerHTML = allKonselor

    }catch(error) {
        daftarPasien.innerHTML = '<h5 class="empty-list">Something went wrong cannot show your konselor, please be patient 😁!</h5>'
		
    }
}

getAllData();