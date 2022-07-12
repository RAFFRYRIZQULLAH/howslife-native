const daftarRequest = document.querySelector('#daftarRequest')

const getAllData = async () => {
    try{
        const { data } = await axios.get('https://howslifeapi.herokuapp.com/api/v1/konsultasi', )
        
        let allrequest = data.data;
        if(allrequest.length < 1){
            daftarRequest.innerHTML = '<h5 class="empty-list">Tidak ada ppermintaan</h5>'
        }

        allrequest = allrequest.map((request) => {
            const {name, age, created, konsultasiId} = request;
            const link = 'req-next.html?id=' + konsultasiId
            return `
            <div class="card ">                            
                <div class="card-body">
                    <h4 class="card-title" style="text-transform: capitalize ;">${name} , <span>${age}</span></h4>
                    <h6 class="card-subtitle mb-2 text-muted">${created}</h6>
                    <a href="${link}" class="card-link">see detail</a>
                </div>
            </div>
            `
        }).join('')

        daftarRequest.innerHTML = allrequest

    }catch(error) {
        daftarRequest.innerHTML = '<h5 class="empty-list">Something went wrong cannot show request, please be patient 😁!</h5>'
		
    }
}


getAllData();