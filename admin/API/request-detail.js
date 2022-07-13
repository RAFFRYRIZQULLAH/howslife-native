const urlParams = new URLSearchParams(window.location.search)

const halamanRequestDetail = document.querySelector('#halamanRequestDetail')
const namaUmur = document.querySelector('#namaUmur')
const created = document.querySelector('#created')
const subjekMasalah = document.querySelector('#subjekMasalah')
const detailMasalah = document.querySelector('#detailMasalah')
const usaha = document.querySelector('#usaha')
const kendala = document.querySelector('#kendala')
const jenisKonselor = document.querySelector('#jenisKonselor')
const kelaminKonselor = document.querySelector('#kelaminKonselor')
const parentWaktuKonsul = document.querySelector('#parentWaktuKonsul')
const daftarKonselorParent = document.querySelector('#daftarKonselorParent')



const id = urlParams.get('id')

const getAllData = async () => {
    try{
        const { data } = await axios.get('https://howslifeapi.herokuapp.com/api/v1/konsultasi/' + id , )
        
        const {name,
        age,
        created : createdTime,
        preferenceTime,
        pref_konselor_type,
        pref_kelamin_konselor,
        subject_masalah,
        permasalahan,
        usaha :myUsaha,
        kendala : myKendala,
        konselor,        
        
        } = data.data;

        namaUmur.innerHTML = `
            ${name} , <span>${age} Th</span>
        `
        created.innerHTML = `Created at - ${createdTime}`
        subjekMasalah.innerHTML = subject_masalah
        detailMasalah.innerHTML = permasalahan
        usaha.innerHTML = myUsaha
        kendala.innerHTML = myKendala
        jenisKonselor.innerHTML = pref_konselor_type
        kelaminKonselor.innerHTML = pref_kelamin_konselor

        allPreferenceTime = preferenceTime.map((iter) => {
            const day = iter.split(' ')[0]
            const date = iter.split(' ')[1]
            const time = iter.split(' ')[2].split(':')[0] + ':' + iter.split(' ')[2].split(':')[1]

            return `
            <li class="mb-2">
                <div class="container d-flex flex-row justify-content-between align-items-center">
                    <span>${day} ${date}</span> <button  class="btn btn-info bg-white" style="color: black;">${time} WIB</button>
                </div>
            </li>
            `
        }).join('')
        parentWaktuKonsul.innerHTML = allPreferenceTime

        allKonselor = konselor.map((iter) => {
            const {konselorID ,name, ringkasan} = iter
            
            const roleMatch = ringkasan[0].isMatch?'&#10004':'&#10006'
            const role = ringkasan[0].role
            const kelaminMatch = ringkasan[1].isMatch?'&#10004':'&#10006'
            const kelamin = ringkasan[1].jenis_kelamin
            const haveTimeMatch = ringkasan[2].haveTimeMatch?'&#10004':'&#10006'
            const time = ringkasan[2].time || ' -'
            const link = `https://howslifeapi.herokuapp.com/api/v1/konsultasi/${id}/request/` + konselorID
            return `
            <div class="card ">
                <div class="card-body">
                    <div class="mx-auto d-block">
                        <img class="rounded-circle mx-auto d-block" src="images/icon/avatar-01.jpg" alt="Card image cap">
                        <h5 class="text-sm-center mt-2 mb-1">${name}</h5>
                        <div class="location text-sm-center">                                                            
                            <div>
                                <ul class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div style="text-align: start;">
                                            <p class="font-weight-normal ">Jenis Konselor Sesuai</p>
                                            <span class="font-weight-light text-muted" style="text-align:start;">${role}</span>
                                        </div>
                                        
                                        <span class="">${roleMatch};</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div style="text-align: start;">
                                            <p class="font-weight-normal ">Jenis Kelamin Sesuai</p>
                                            <span class="font-weight-light text-muted" style="text-align:start !important;">${kelamin}</span>
                                        </div>
                                        <span class="">${kelaminMatch};</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div style="text-align: start;">
                                            <p class="font-weight-normal ">Memiliki Waktu yang Sesuai</p>
                                            <span class="font-weight-light text-muted" style="text-align:start !important;"><i class="fa fa-clock-o"></i>${time}</span>
                                        </div>
                                        
                                        
                                        <span class="">${haveTimeMatch};</span>  
                                    </li>
                                    </ul>                                                               
                            </div>
                            
                            
                        </div>
                    </div>                                                    
                    <div class="card-text text-sm-center mt-2">
                        <form  class="requestForm">       
                            <p hidden>${link}</p>                                      
                            <button type="submit" class="btn btn-info bg-info">Request</button>                        
                        </form>                        
                    </div>
                </div>
            </div>
            
            `
        }).join('')

        daftarKonselorParent.innerHTML = allKonselor
        const requestForm = document.querySelectorAll('.requestForm')
        console.log(requestForm);
        requestForm.forEach((iter) => {
            console.log(iter);
            console.log(iter.children[0].innerHTML );
            iter.addEventListener('submit', async (e) => {
                e.preventDefault()
                try{
                    const respon = await axios.post(iter.children[0].innerHTML, )
                    alert(respon.data.message)
                }catch(error){
                    alert("Hello " + error)

                }
            })
           
        })
        



    }catch(error) {
        halamanRequestDetail.innerHTML =      `<p class="text-white"> error to fetch  ${error.response.data.message}</p>`

		
    }
}

 getAllData();


