ocultarElementos();
mostarElementos();
selectCategory();
selectFarm();
selectClient();
function ocultarElementos(dato){
    switch(dato){
        case "farm":
            $("#newFarm").toggle();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#tableData").hide();
            $("#reportsFarm").hide();
            break;
        case "client":
            $("#newFarm").hide();
            $("#newClient").toggle();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#tableData").hide();
            $("#reportsFarm").hide();
            break;
         case "message":
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").toggle();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#tableData").hide();
            $("#reportsFarm").hide();
            break;
         case "category":
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").toggle();
            $("#newReservation").hide();
            $("#tableData").hide();
            $("#reportsFarm").hide();
            break;
        case "reservation":
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").toggle();
            $("#tableData").hide();
            $("#reportsFarm").hide();
            break;
        case "reports":
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#tableData").hide();
            $("#reportsFarm").show();
             break;
        default:
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#reportsFarm").hide();
            
    }
}
function mostarElementos() {
    $("#tableData").hide();
    //formFarm
    $("#btnFarm").on("click", function(e){
       ocultarElementos("farm");
    });
    //formClient
    $("#btnClient").on("click", function(e){
        ocultarElementos("client");
    });
    //formMenssage
    $("#btnMessage").on("click", function(e){
        ocultarElementos("message");
    });
    //formCategory
    $("#btnCategory").on("click", function(e){
        ocultarElementos("category");
    });
    //formReservation
    $("#btnReservation").on("click", function(e){
        ocultarElementos("reservation");
    });
    
}
/*********************
        CATEGORY
**********************/
$("#btnListCategory").on("click", function(e){
    getCategory();
    $("#tableData").toggle();
    ocultarElementos();
})
//Mostar Datos
function getCategory(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#tableData").html(`<thead><tr><th>nombre</th><th>descripcion</th></tr></thead><tbody>`);
            $(respuesta).each(function(i, tutorial){
                $('#tableData').append($("<tr>")
                                        .append($("<td>").append(tutorial.name))
                                        .append($("<td>").append(tutorial.description))
                                        .append($("<td>").append(`
                                            <button class='btn btn-primary editCat' data-bs-toggle="modal" data-bs-target="#modalCategory" data-bs-whatever="@mdo" data-catid="`+tutorial.id+`"><i class="bi bi-pencil-square"></i></button>
                                            <button class='btn btn-danger deleteCat' data-catid="`+tutorial.id+`"><i class="bi bi-trash-fill"></i></button>
                                        `)));
                });
                $('#tableData').append("</tbody>")
                cargarBotones();
                //selectCategory();
        }
    });
}
//botones para editar y eliminar
function cargarBotones(){
    $(".editCat").on("click",function(e){
        getOneCategory($($(this)[0]).data("catid"));
            e.preventDefault();
    });
    $(".deleteCat").on("click",function(e){
        deleteCategory($($(this)[0]).data("catid"));
            e.preventDefault();
    });
}
//guardar datos
$("#newCat").on("click", function(e){
    let info={
        name: $($("#newCategory")[0].nameCat).val(),
        description: $($("#newCategory")[0].catDescript).val(),
    }
    data = JSON.stringify(info);
    //console.log(data)
    saveCategory(data)
    $("#newCategory").trigger("reset");
    e.preventDefault();
});
function saveCategory(data){
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Category/save',
        method: 'POST',
        dataType: 'JSON',
        contentType:"application/JSON; charset=utf-8",
        data: data,
        success: function(data) {
            console.log(data);
            //(alert("Se guardo correctamente");
            alertData('La categor??a se creo correctamente', 'success');
            getCategory();
            removeSelect();
            selectCategory();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alertCategory('no se puede crear la categoria', 'danger');
            //alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
function alertData(message, type){
    var alertPlaceholder = document.getElementById('alertCat')
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}
//a??adir categorias a los select realcionales
function selectCategory(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let newFarm = $("#categID");
            let updateFarm = $("#uptCatID")
            newFarm.append("<option selected>Eliga la categoria</option>");
            $.each(respuesta, function (id, category) {
                newFarm.append('<option value='+category.id+'>'+category.name+'</option>');
                updateFarm.append('<option value='+category.id+'>'+category.name+'</option>');
                //console.log("select "+category.id);
            }); 
        }
    })
}
function removeSelect(){
    $("#categID").empty()
    $("#uptCatID").empty()

}
//mostrar datos en el modal
function getOneCategory(id){
    console.log(id);
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Category/'+id,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $($("#uCategory")[0].catID).val(data.id);
            $($("#uCategory")[0].uNameCat).val(data.name);
            $($("#uCategory")[0].uCatDescript).val(data.description);
            //$("#uCategory").show();
            $("#modalCategory").show();
        }
    });
}
//actualizar datos categoria
$("#putCategory").on("click", function(e){
    let data ={
        id:$($("#uCategory")[0].catID).val(),
        name: $($("#uCategory")[0].uNameCat).val(),
        description: $($("#uCategory")[0].uCatDescript).val()
    }
    let dataToSend=JSON.stringify(data);
    actualizarCategoria(dataToSend);
    e.preventDefault();
})
function actualizarCategoria(data){
    $.ajax({
        url: "http://129.151.114.181:8080/api/Category/update",
        type: "PUT",
        dataType: "JSON",
        contentType:"application/JSON; charset=utf-8",
        data:data,
        success: function(response){
            console.log(response);
            getCategory();
            removeSelect();
            selectCategory();
            alert("Se actualizo correctamente");
            //$("#exampleModal").hide();
            var myModalEl = document.getElementById('modalCategory');  
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
//borrar catagoria
function deleteCategory(id){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Category/"+id,
        method:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            getCategory();
            removeSelect();
            selectCategory();
            alert("Se ha Eliminado.")
           // getCategory();
        }
    });
}
/*********************
        FARM
**********************/
$("#btnListFarm").on("click", function(e){
    getFarm();
    $("#tableData").toggle();
    ocultarElementos();
    e.preventDefault();
})
//Mostar Datos de fincas
function getFarm(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#tableData").html(`<thead><tr>
                                        <th>Nombre</th>
                                        <th>Direcci??n</th>
                                        <th>Extensi??n</th>
                                        <th>Descripci??n</th>
                                        <th>Categor??a</th>
                                        </tr>
                                        </thead>
                                        <tbody>`);
            $(respuesta).each(function(i, farm){
                $('#tableData').append($("<tr>")
                                        .append($("<td>").append(farm.name))
                                        .append($("<td>").append(farm.address))
                                        .append($("<td>").append(farm.extension))
                                        .append($("<td>").append(farm.description))
                                        .append($("<td>").append(farm.category.name))
                                        .append($("<td>").append(`
                                            <button class='btn btn-primary editFarm' data-bs-toggle="modal" data-bs-target="#modalFarm" data-bs-whatever="@mdo" data-farmid="`+farm.id+`"><i class="bi bi-pencil-square"></i></button>
                                            <button class='btn btn-danger deleteFarm' data-farmid="`+farm.id+`"><i class="bi bi-trash-fill"></i></button>
                                        `)));
                });
                $('#tableData').append("</tbody>")
                farmBotones();
        }
    });
}
//botones para editar y eliminar
function farmBotones(){
    $(".editFarm").on("click",function(e){
        getOneFarm($($(this)[0]).data("farmid"));
            e.preventDefault();
    });
    $(".deleteFarm").on("click",function(e){
        deleteFarm($($(this)[0]).data("farmid"));
            e.preventDefault();
    });
}
//guardar datos de finca
$("#createFarm").on("click", function(e){
    let info={
        name: $($("#newFarm")[0].name).val(),
        address: $($("#newFarm")[0].address).val(),
        extension: $($("#newFarm")[0].extension).val(),
        description: $($("#newFarm")[0].description).val(),
        category: {id:$($("#newFarm")[0].categID).val()}
    }
    data = JSON.stringify(info);
    //console.log(data)
    saveFarm(data)
    $("#newFarm").trigger("reset");
    e.preventDefault();
});
function saveFarm(dataFarm){
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Farm/save',
        method: 'POST',
        dataType: 'JSON',
        contentType:"application/JSON; charset=utf-8",
        data: dataFarm,
        success: function(data) {
            console.log(data);
            //alert("Se guardo correctamente");
            alertFarm('La finca se creo correctamente', 'success');
            getFarm();
            removeSelectFarm();
            selectFarm();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alertFarm('no se puede crear la categoria', 'danger');
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
function alertFarm(message, type){
    var alertPlaceholder = document.getElementById("alertFarm")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}
// llenar campos relacionales a finca
function selectFarm(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let newMessage = $("#farmID");
            let updateMessage = $("#uptFarm")
            let newReservation = $("#idFarm")
            let updateReservataion = $("#uptFarmm")
            newMessage.append("<option selected>Eliga la finca</option>");
            newReservation.append("<option selected>Eliga la finca</option>");
            $.each(respuesta, function (id, farm) {
                newMessage.append('<option value='+farm.id+'>'+farm.name+'</option>');
                updateMessage.append('<option value='+farm.id+'>'+farm.name+'</option>');
                newReservation.append('<option value='+farm.id+'>'+farm.name+'</option>');
                updateReservataion.append('<option value='+farm.id+'>'+farm.name+'</option>');
                //console.log("select "+farm.name);
            }); 
        }
    })
}
function removeSelectFarm(){
    $("#farmID").empty()
    $("#uptFarm").empty()
    $("#idFarm").empty()
    $("#uptFarm").empty()
}

//mostrar datos ha actualizar en el modal
function getOneFarm(id){
    console.log(id);
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Farm/'+id,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $($("#uFarm")[0].farmsID).val(data.id);
            $($("#uFarm")[0].uptName).val(data.name);
            $($("#uFarm")[0].uptAddress).val(data.address);
            $($("#uFarm")[0].uptExtension).val(data.extension);
            $($("#uFarm")[0].uptDescription).val(data.description);
            $($("#uFarm")[0].uptCatID).val(data.category.id).change();
            //$("#uCategory").show();
            $("#modalFarm").show();
        }
    });
}
//actualizar datos finca
$("#putFarm").on("click", function(e){
    let data ={
        id: $($("#uFarm")[0].farmsID).val(),
        name:$($("#uFarm")[0].uptName).val(),
        address:$($("#uFarm")[0].uptAddress).val(),
        extension:$($("#uFarm")[0].uptExtension).val(),
        description:$($("#uFarm")[0].uptDescription).val(),
        category:{id:$($("#uFarm")[0].uptCatID).val()}
    }
    let dataToSend=JSON.stringify(data);
    actualizarFarm(dataToSend);
    e.preventDefault();
})
function actualizarFarm(data){
    $.ajax({
        url: "http://129.151.114.181:8080/api/Farm/update",
        type: "PUT",
        dataType: "JSON",
        contentType:"application/JSON; charset=utf-8",
        data:data,
        success: function(response){
            console.log(response);
            getFarm();
            alert("Se actualizo correctamente");
            //$("#exampleModal").hide();
            var myModalEl = document.getElementById('modalFarm');  
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
//borrar finca
function deleteFarm(id){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Farm/"+id,
        method:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            getFarm();
            removeSelectFarm();
            selectFarm();
            alert("Se ha Eliminado.")
        }
    });
}

/*********************
        CLIENT
**********************/
$("#btnListClient").on("click", function(e){
    getClient();
    $("#tableData").toggle();
    ocultarElementos();
})
//Mostar Datos de Clientes
function getClient(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#tableData").html(`<thead><tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Contrase??a</th>
                                        <th>Edad</th>
                                        </tr>
                                        </thead>
                                        <tbody>`);
            $(respuesta).each(function(i, client){
                $('#tableData').append($("<tr>")
                                        .append($("<td>").append(client.name))
                                        .append($("<td>").append(client.email))
                                        .append($("<td>").append(client.password))
                                        .append($("<td>").append(client.age))
                                        .append($("<td>").append(`
                                            <button class='btn btn-primary editClient' data-bs-toggle="modal" data-bs-target="#modalClient" data-bs-whatever="@mdo" data-clientid="`+client.idClient+`"><i class="bi bi-pencil-square"></i></button>
                                            <button class='btn btn-danger deleteClient' data-clientid="`+client.idClient+`"><i class="bi bi-trash-fill"></i></button>
                                        `)));
                });
                $('#tableData').append("</tbody>")
                clientBotones();
        }
    });
}
//botones para editar y eliminar
function clientBotones(){
    $(".editClient").on("click",function(e){
        getOneClient($($(this)[0]).data("clientid"));
            e.preventDefault();
    });
    $(".deleteClient").on("click",function(e){
        deleteClient($($(this)[0]).data("clientid"));
            e.preventDefault();
    });
}
//guardar datos de cliente
$("#createClient").on("click", function(e){
    let info={
        email: $($("#newClient")[0].emailClient).val(),
        password: $($("#newClient")[0].passClient).val(),
        name: $($("#newClient")[0].nameClient).val(),
        age: $($("#newClient")[0].ageClient).val()
    }
    data = JSON.stringify(info);
    //console.log(data)
    saveClient(data)
    $("#newClient").trigger("reset");
    e.preventDefault();
});
function saveClient(dataClient){
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Client/save',
        method: 'POST',
        dataType: 'JSON',
        contentType:"application/JSON; charset=utf-8",
        data: dataClient,
        success: function(data) {
            console.log(data);
            //alert("Se guardo correctamente");
            alertClient('El cliente se creo correctamente', 'success');
            getClient();
            removeSelectClient();
            selectClient();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alertFarm('no se puede crear la categoria', 'danger');
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
function alertClient(message, type){
    var alertPlaceholder = document.getElementById("alertClient")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}
// llenar campos relacionales a cliente
function selectClient(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let newMessage = $("#clientID");
            let updateMessage = $("#uptClient");
            let newReservation = $("#idClient");
            let updateReservataion = $("#uptClientt");
            newMessage.append("<option selected>Eliga la finca</option>");
            newReservation.append("<option selected>Eliga la finca</option>");
            $.each(respuesta, function (id, client) {
                newMessage.append('<option value='+client.idClient+'>'+client.name+'</option>');
                updateMessage.append('<option value='+client.idClient+'>'+client.name+'</option>');
                newReservation.append('<option value='+client.idClient+'>'+client.name+'</option>');
                updateReservataion.append('<option value='+client.idClient+'>'+client.name+'</option>');
                //console.log("select "+category.id);
            }); 
        }
    })
}
function removeSelectClient(){
    $("#clientID").empty()
    $("#uptClient").empty()
    $("#idClient").empty()
    $("#uptClientt").empty()
}
//mostrar datos ha actualizar en el modal
function getOneClient(id){
    console.log(id);
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Client/'+id,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $($("#uClient")[0].clientsID).val(data.idClient);
            $($("#uClient")[0].uptEmailClient).val(data.email);
            $($("#uClient")[0].uptPassClient).val(data.password);
            $($("#uClient")[0].uptNameClient).val(data.name);
            $($("#uClient")[0].uptAgeClient).val(data.age);
            $("#modalClient").show();
        }
    });
}
//actualizar datos Cliente
$("#putClient").on("click", function(e){
    let data ={
        idClient: $($("#uClient")[0].clientsID).val(),
        email:$($("#uClient")[0].uptEmailClient).val(),
        password:$($("#uClient")[0].uptPassClient).val(),
        name:$($("#uClient")[0].uptNameClient).val(),
        age:$($("#uClient")[0].uptAgeClient).val()
    }
    let dataToSend=JSON.stringify(data);
    actualizarClient(dataToSend);
    e.preventDefault();
})
//actualiza los datos del cliente
function actualizarClient(data){
    $.ajax({
        url: "http://129.151.114.181:8080/api/Client/update",
        type: "PUT",
        dataType: "JSON",
        contentType:"application/JSON; charset=utf-8",
        data:data,
        success: function(response){
            console.log(response);
            getClient();
            alert("Se actualizo correctamente");
            //$("#exampleModal").hide();
            var myModalEl = document.getElementById('modalClient');  
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
//borrar Cliente
function deleteClient(id){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Client/"+id,
        method:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            getClient();
            removeSelectClient();
            selectClient();
            alert("Se ha Eliminado.")
        }
    });
}
/*********************
        MESSAGE
**********************/

$("#btnListMessage").on("click", function(e){
    getMessage();
    $("#tableData").toggle();
    ocultarElementos();
})
//Mostar Datos de Mensajes
function getMessage(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#tableData").html(`<thead><tr>
                                        <th>Mensaje</th>
                                        <th>Cliente</th>
                                        <th>Finca</th>
                                        </tr>
                                        </thead>
                                        <tbody>`);
            $(respuesta).each(function(i, message){
                $('#tableData').append($("<tr>")
                                        .append($("<td>").append(message.messageText))
                                        .append($("<td>").append(message.client.name))
                                        .append($("<td>").append(message.farm.name))
                                        .append($("<td>").append(`
                                            <button class='btn btn-primary editMessage' data-bs-toggle="modal" data-bs-target="#modalMessage" data-bs-whatever="@mdo" data-messageid="`+message.idMessage+`"><i class="bi bi-pencil-square"></i></button>
                                            <button class='btn btn-danger deleteMessage' data-messageid="`+message.idMessage+`"><i class="bi bi-trash-fill"></i></button>
                                        `)));
                });
                $('#tableData').append("</tbody>")
                messageBotones();
        }
    });
}
//botones para editar y eliminar
function messageBotones(){
    $(".editMessage").on("click",function(e){
        getOneMessage($($(this)[0]).data("messageid"));
            e.preventDefault();
    });
    $(".deleteMessage").on("click",function(e){
        deleteMessage($($(this)[0]).data("messageid"));
            e.preventDefault();
    });
}
//guardar datos de Mensajes
$("#createMessage").on("click", function(e){
    let info={
        messageText: $($("#newMessage")[0].smsText).val(),
        farm: {id:$($("#newMessage")[0].farmID).val()},
        client: {idClient:$($("#newMessage")[0].clientID).val()}
    }
    data = JSON.stringify(info);
    //console.log(data)
    saveMessage(data)
    $("#newMessage").trigger("reset");
    e.preventDefault();
});
function saveMessage(dataMessage){
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Message/save',
        method: 'POST',
        dataType: 'JSON',
        contentType:"application/JSON; charset=utf-8",
        data: dataMessage,
        success: function(data) {
            console.log(data);
            //alert("Se guardo correctamente");
            alertMessage('El mensaje se creo correctamente', 'success');
            getMessage();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alertFarm('no se puede crear la categoria', 'danger');
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
function alertMessage(message, type){
    var alertPlaceholder = document.getElementById("alertMessage")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}
//mostrar datos ha actualizar en el modal
function getOneMessage(id){
    console.log(id);
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Message/'+id,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $($("#uMessage")[0].messageID).val(data.idMessage);
            $($("#uMessage")[0].usmsText).val(data.messageText);
            $($("#uMessage")[0].uptClient).val(data.client.idClient).change();
            $($("#uMessage")[0].uptFarm).val(data.farm.id).change();
            //$("#uCategory").show();
            $("#modalMessage").show();
        }
    });
}
//actualizar datos mensajes
$("#putMessage").on("click", function(e){
    let data ={
        idMessage: $($("#uMessage")[0].messageID).val(),
        messageText:$($("#uMessage")[0].usmsText).val(),
        client:{idClient:$($("#uMessage")[0].uptCLient).val()},
        farm:{id:$($("#uMessage")[0].uptFarm).val()}
    }
    let dataToSend=JSON.stringify(data);
    actualizarMessage(dataToSend);
    e.preventDefault();
})
function actualizarMessage(data){
    $.ajax({
        url: "http://129.151.114.181:8080/api/Message/update",
        type: "PUT",
        dataType: "JSON",
        contentType:"application/JSON; charset=utf-8",
        data:data,
        success: function(response){
            console.log(response);
            getMessage();
            alert("Se actualizo correctamente");
            //$("#exampleModal").hide();
            var myModalEl = document.getElementById('modalMessage');  
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
//borrar Mensaje
function deleteMessage(id){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Message/"+id,
        method:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            getMessage();
            alert("Se ha Eliminado.")
        }
    });
}


/*****************************
        RESERVATION
******************************/

$("#btnListReservation").on("click", function(e){
    getReservation();
    $("#tableData").show();
    ocultarElementos();
})
//Mostar Datos de Reservaciones
function getReservation(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#tableData").html(`<thead><tr>
                                        <th>Fecha de inicio</th>
                                        <th>Fecha de entrega</th>
                                        <th>Finca</th>
                                        <th>Cliente</th>
                                        </tr>
                                        </thead>
                                        <tbody>`);
            $(respuesta).each(function(i, reservation){
                $('#tableData').append($("<tr>")
                                        .append($("<td>").append(dateReservation(reservation.startDate)))
                                        .append($("<td>").append(dateReservation(reservation.devolutionDate)))
                                        .append($("<td>").append(reservation.farm.name))
                                        .append($("<td>").append(reservation.client.name))
                                        .append($("<td>").append(`
                                            <button class='btn btn-primary editReservation' data-bs-toggle="modal" data-bs-target="#modalReservation" data-bs-whatever="@mdo" data-reservationid="`+reservation.idReservation+`"><i class="bi bi-pencil-square"></i></button>
                                            <button class='btn btn-danger deleteReservation' data-reservationid="`+reservation.idReservation+`"><i class="bi bi-trash-fill"></i></button>
                                        `)));
                });
                $('#tableData').append("</tbody>")
                reservationBotones();
        }
    });
}
//botones para editar y eliminar
function reservationBotones(){
    $(".editReservation").on("click",function(e){
        getOneReservation($($(this)[0]).data("reservationid"));
            e.preventDefault();
    });
    $(".deleteReservation").on("click",function(e){
        deleteReservation($($(this)[0]).data("reservationid"));
            e.preventDefault();
    });
}
//guardar datos de reservacion
$("#createReserva").on("click", function(e){
    let info={
        startDate: $($("#newReservation")[0].startDate).val(),
        devolutionDate: $($("#newReservation")[0].endDate).val(),
        farm: {id:$($("#newReservation")[0].idFarm).val()},
        client: {idClient:$($("#newReservation")[0].idClient).val()}
    }
    data = JSON.stringify(info);
    //console.log(data)
    saveReservation(data)
    $("#newReservation").trigger("reset");
    e.preventDefault();
});
function saveReservation(dataReservation){
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Reservation/save',
        method: 'POST',
        dataType: 'JSON',
        contentType:"application/JSON; charset=utf-8",
        data: dataReservation,
        success: function(data) {
            console.log(data);
            //alert("Se guardo correctamente");
            alertReservation('La reserva se creo correctamente', 'success');
            getReservation();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //alertFarm('no se puede crear la categoria', 'danger');
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
function alertReservation(message, type){
    var alertPlaceholder = document.getElementById("alertReservation")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}
//mostrar datos ha actualizar en el modal
function getOneReservation(id){
    console.log(id);
    $.ajax({
        url: 'http://129.151.114.181:8080/api/Reservation/'+id,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $($("#uReservation")[0].reservationID).val(data.idReservation);
            $($("#uReservation")[0].ustartDate).val(dateReservation(data.startDate));
            $($("#uReservation")[0].uendDate).val(dateReservation(data.devolutionDate));
            $($("#uReservation")[0].uptFarmm).val(data.farm.id).change();
            $($("#uReservation")[0].uptClientt).val(data.client.idClient).change();
            $("#modalReservation").show();
        }
    });
}
//mostrar solo la fecha
function dateReservation(date){
    let fecha = new Date(date);
    let year = fecha.getUTCFullYear();
    let mes = fecha.getUTCMonth()+1;
    let day="";
    let month="";
    if(fecha.getUTCDate().toString().length==1){
        day="0"+fecha.getUTCDate().toString();
    }else{
        day=fecha.getUTCDate();
    }
    if(mes.toString().length==1){
        month="0"+mes;
    }else{
        month=mes;
    }
    let fulldate = year+"-"+month+"-"+day;
    return fulldate;
}
//actualizar datos de reservaci??n
$("#putReservation").on("click", function(e){
    let data ={
        idReservation: $($("#uReservation")[0].reservationID).val(),
        startDate:$($("#uReservation")[0].ustartDate).val(),
        devolutionDate:$($("#uReservation")[0].uendDate).val(),
        client:{idClient:$($("#uReservation")[0].uptClientt).val()},
        farm:{id:$($("#uReservation")[0].uptFarmm).val()},
    }
    let dataToSend=JSON.stringify(data);
    actualizarReservation(dataToSend);
    e.preventDefault();
})
function actualizarReservation(data){
    $.ajax({
        url: "http://129.151.114.181:8080/api/Reservation/update",
        type: "PUT",
        dataType: "JSON",
        contentType:"application/JSON; charset=utf-8",
        data:data,
        success: function(response){
            console.log(response);
            getReservation();
            alert("Se actualizo correctamente");
            var myModalEl = document.getElementById('modalReservation');  
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
//Borrar Reservaci??n
function deleteReservation(id){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Reservation/"+id,
        method:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            getReservation();
            alert("Se ha Eliminado.")
        }
    });
}
/*+++++++++++++++++++++++++++++
            REPORTES
+++++++++++++++++++++++++++++++*/

/*-----------REPORTE 1---------------*/
$("#btnReportOk").on("click", function(e){
    //getCategory();
    getCompletCancel();
    ocultarElementos("reports");
})
function getCompletCancel(){
    $.ajax({
        url: "http://129.151.114.181:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function(data){
            console.log(data);
            $('#reporte').html(`<h4 class="card-title text-center">Reservas Completadas y Canceladas</h4>
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2" id="complet">
                                        <div class="text-uppercase text-primary fw-bold text-xs mb-1"><span>Completadas</span></div>
                                    </div>
                                    <div class="col-auto check"><i class="bi bi-check-circle-fill"></i></div>
                                    </div>
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2" id="cancel">
                                        <div class="text-uppercase text-danger fw-bold text-xs mb-1"><span>Canceladas</span></div>
                                    </div>
                                    <div class="col-auto cancel"><i class="bi bi-x-octagon-fill fa-2x text-gray-300"></i></div>
                                </div>`)
            $('#complet').append('<div class="text-dark fw-bold h5 mb-0"><span>'+data.completed+'</span></div>')
            $('#cancel').append('<div class="text-dark fw-bold h5 mb-0"></span>'+data.cancelled+'</span></div>')
            
        }

    });
}
/*-----------REPORTE 2---------------*/
$('#btnReportDate').on("click", function(e){
    ocultarElementos("reports");
    getRerportDate();
    e.preventDefault();
})
function getRerportDate(){
    $("#reporte").html(`<h4 class="card-title text-center">Reservas por un Tiempo determinado</h4>
                                <form method="post" id="searchDate">
                                    <h2 class="text-center"><strong>Buscar</strong> Reserva</h2>
                                    <div class="mb-3 form-floating">
                                        <input type="date" name="category" id="dateInicio" class="form-control" placeholder="fecha de Inicio"></input>
                                        <label for="dateInicio">Fecha de Inicio</label>
                                    </div>
                                    <div class="mb-3 form-floating">
                                        <input type="date" name="dateFin" id="dateFin" class="form-control" placeholder="fecha de finalizaci??n"></input>
                                        <label for="dateFin">Fecha de Finalizaci??n</label>
                                    </div>
                                    <div class="mb-3 form-floating">
                                        <button class="btn btn-primary d-block w-50 mx-auto" type="button" id="buscarDate">Buscar</button>
                                    </div>
                                </form>
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2" id="cantReserva">
                                    </div>
                                    <div class="col-auto"><i class="bi bi-calendar fa-2x text-gray-300"></i></div>
                                    <div id="datos"></div>
                                    
                                </div>
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2 table-responsive" id="dataReser">
                                        <table class="table" id="tableReservation">

                                        </table>
                                        
                                    </div>
                                </div>
            `)
            $("#buscarDate").on("click", function(e){
                $("#tableReservation").hide();
                getReservationDate();
            })
}
function getReservationDate(){
    let dataStart= $($("#searchDate")[0].dateInicio).val();
    let dataEnd= $($("#searchDate")[0].dateFin).val();
    console.log("Mensaje")
    console.log(dataStart);
    console.log(dataEnd);
    $.ajax({
        url:"http://129.151.114.181:8080/api/Reservation/report-dates/"+dataStart+"/"+dataEnd,
        type: "GET",
        datatype:"JSON",
        success:function (respuesta) {
            let cantReserva = 0;
            $("#tableReservation").html(`<thead class="table-info"><tr>
            <th>#</th>
            <th>Fecha Inicio</th>
            <th>Fecha de finalizaci??n</th>
            <th>Estado</th>
            </tr>
            </thead>
            <tbody>`);
            $(respuesta).each(function(i, data){
                cantReserva+=1
            $('#tableReservation').append($("<tr>")
                        .append($("<td>").append(i+1))
                        .append($("<td>").append(dateReservation(data.startDate)))
                        .append($("<td>").append(dateReservation(data.devolutionDate)))
                        .append($("<td>").append(data.status)))
            });
            $('#tableReservation').append("</tbody>")
            $('#cantReserva').html(`<div class="text-uppercase text-success fw-bold text-xs mb-1"><span>Cantidad de reservas</span></div>
                                    <div class="text-dark fw-bold h5 mb-0"><span>`+cantReserva+`</span></div>`)
            $('#datos').html('<button class="btn btn-primary d-block w-50 mx-auto" type="button" id="detalle">Ver Reservas</button>')
            verMas();
        }
    })
}
//mostrar detalle de las reservas
function verMas(){
    $("#detalle").on("click", function(e){
        $("#tableReservation").toggle();
    })
}

/*-----------REPORTE 3---------------*/
$("#btnReportTop").on("click", function(e){
    ocultarElementos("reports");
    getClientTop();
})
function getClientTop(){
    $.ajax({
        url:"http://129.151.114.181:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#reporte").html(`<h4 class="card-title text-center">Clientes Top</h4>
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2" id="reportThree">
                                        <div class="text-uppercase text-primary fw-bold text-xs mb-1"><span>Clientes</span></div>
                                        <div class="row g-0 align-items-center">
                                            <div class="col-auto table-responsive">
                                                <table class="table" id="tableTopClient">

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>`)

            $("#tableTopClient").html(`<thead class="table-info"><tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Reservas</th>
            </tr>
            </thead>
            <tbody>`);
            $(respuesta).each(function(i, data){
            $('#tableTopClient').append($("<tr>")
                        .append($("<td>").append(i+1))
                        .append($("<td>").append(data.client.name))
                        .append($("<td>").append(data.client.email))
                        .append($("<td>").append(data.client.age))
                        .append($("<td>").append(data.total)))
            });
            $('#tableTopClient').append("</tbody>")
        }
    })
}