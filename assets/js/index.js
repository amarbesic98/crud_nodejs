
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})
$("#update_user").submit(function(event){
    event.preventDefault();

    var noviNiz = $(update_user).serializeArray();
    var data = {}

    $.map(noviNiz, (n, i)=> {
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:5000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:5000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}