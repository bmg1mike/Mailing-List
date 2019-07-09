const table = document.querySelector('tbody');
const form = document.querySelector('form');
const tr = document.querySelector('tr');
const h6 = document.querySelector('h6');

db.collection('mailingList').get().then(snapshot=>{
    console.log(snapshot.docs[1].data());
    snapshot.docs.forEach((person,index)=>{
        table.innerHTML +=`
            <tr>
                <td>${person.data().name}</td>
                <td>${person.data().email}</td>
                <td>${person.data().location}</td>
                <td>${person.data().genre}</td>
                <td>
                <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#model${index}">
                View
              </button>
              
              <!-- Modal -->
              <div class="modal fade" id="model${index}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title">${person.data().name}</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                          </div>
                          <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-6 my-5">
                                    <h5>Email:</h5>
                                    ${person.data().email}
                                    </div>
                                    <div class="col-md-6 my-5">
                                    <h5>Phone Number:</h5>
                                    ${person.data().phoneNumber}
                                    </div>
                                    <div class="col-md-6 my-5">
                                    <h5>Location:</h5>
                                    ${person.data().location}
                                    </div>
                                    <div class="col-md-6 my-5">
                                    <h5>Preffered List Group:</h5>
                                    ${person.data().mailList}
                                    </div>
                                    <div class="col-md-12 my-5">
                                    <h5>Preffered Genre:</h5>

                                        ${person.data().genre.split(',')}
                                    </div>

                                </div>
                            </div>
                              
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <!--<button type="button" class="btn btn-primary">Save</button>-->
                          </div>
                      </div>
                  </div>
              </div>
                
                </td>
                <!-- <td><button class="btn btn-sm btn-success">Update</button></td>
                 <td><button class="btn btn-sm btn-danger">Delete</button></td>
            </tr> -->
        `;
    });

    $('#customerTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    });
}).catch(err=>{
    console.log(err);
    
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let Customer = {
        name : form.name.value,
        email : form.email.value,
        location : form.location.value,
        phoneNumber : form.phonenumber.value,
        genre : form.genre.value,
        mailList : form.mailinglist.value
    }
    db.collection('mailingList').add(Customer).then(()=>{
        console.log('Customer Added');
        h6.innerHTML ="Customer Added";
        h6.className = "bg-success text-secondary"
        
    })
        form.name.value = "";
        form.email.value = "";
        form.location.value = "";
        form.phonenumber.value = "";
        form.genre.value = "";
        form.mailinglist.value = "";
})

tr.addEventListener('click',e=>{
    log(e.target)
})


    
