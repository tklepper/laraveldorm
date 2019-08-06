$(document).ready(function(){
    var dorm = null;
    var room_number = null;
    var unit_data = null;
    var table = $('#user_table').DataTable();

    function showUnit(unit){
        let user_show = $('<div></div>');
        if(unit.users.length > 0){
            $.each(unit.users, function(k,user){
                let user_row = $('<div class="row student"><div class="col-auto"><b>Name</b>: ' + user.name + '</div><div class="col"><b>Gender</b>: ' + user.gender + '</div></div>');
                $(user_row).data('user', user);
                
                $(user_show).append(user_row);
                
            })
            
        } else {
            $(user_show).append('<div class="p-2">This room is empty!</div>');
        }
        $('#unit-info').append(user_show);
        $('.show_room_number').text(unit.room_number);
        $('#userForm').hide();
        $('#floors').hide();
        $('#unit').show();
    }

    function getUnits(){
        // get the units
        $.ajax({
                type        : 'GET', 
                url         : '/api/api/units',
                dataType    : 'json', 
                encode          : true
            })
            // using the done promise callback
            .done(function(data) {
                let units = $('.unit');
                unit_data = data;
                
                $.each(units,function(k,v){
                    $.each(data,function(l,w){
                        if(w.building_number == dorm && w.room_number == $(v).data('room') ){
                            let occupants_span = '<p class="occupants">Occupants: <span class="occupant_number">' + w.users.length + '</span></p>';
                            $(v).data('unit', w);
                            $(v).append(occupants_span);
                        }
                    })
                    
                })

            });

    }

    function getUsers(){
        // get the users
        $('#user_table').DataTable( {
            destroy: true,
            ajax: '/api/api/users',
            "columns" : [
                { "data" : "name"},
                { "data" : "email"},
                { "data" : "gender"},
                { "data" : "unit.building_number"},
                { "data" : "unit.room_number"},
                { "data" : "student_id"}
            ]
        } );

    }

    $('form').submit(function(event){
        // get the form data
        var formData = {
            'name'      : $("input[name=name]").val(),
            'email'     : $("input[name=email]").val(),
            'street'    : $("input[name=street]").val(),
            'city'    : $("input[name=city]").val(),
            'state'    : $("select#state").val(),
            'zip'    : $("input[name=zip]").val(),
            'phone'    : $("input[name=phone]").val(),
            'gender'    : $("select#gender").val(),
            'dob'    : $("input[name=dob]").val(),
            'student_id'    : $("input[name=student_id]").val(),
            'building_number'    : $("input[name='building_number']:checked").val()
        };
        // process the form
        $.ajax({
            type        : 'POST', 
            url         : '/api/api/users', 
            data        : formData, 
            dataType    : 'json', 
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                dorm = data.unit.building_number;
                unit_data = data.units;
                showUnit(data.unit);
                
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

    // Navigate depending on the nav clicked.
    $('.nav-link').on('click', function(){
        $('#userForm').hide();
        $('#users').hide();
        $('#dorms').hide();
        $('#floors').hide();
        $('#unit').hide();
        $('#user').hide();
        $('#unit-info').html('');
        let target = $(this).attr('href');
        switch(target){
            case "#dorms":
                $('#dorms').show();
                break;
            case "#users":
                $('#users').show();
                getUsers();
                break;
            case "#add":
                $('#userForm').show();
                break;
        }
    });

    // Show dorm floors and units when clicking on a dorm
    $('.dorm').on('click', function(){
        dorm = $(this).data('dorm');
        $('.occupants').remove();
        $('#unit').hide();
        $('.show_dorm_number').text(dorm);
        $('#dorms').hide();
        getUnits();
        $('#floors').show();
    })

    // Show unit details when clicking on the unit
    $('.unit').on('click', function(){
        
        let unit = $(this).data('unit');
        room_number = unit.room_number;
        showUnit(unit); 
    })

    // Show Student details when clicking on their name
    $('body').on('click', '.student', function(){
        let user = $(this).data('user');
        $('#unit').hide();
        $('#user-info').html('');
        $('#user-info').append($('<div class="row"><div class="col">Name</div><div class="col-auto">' + user.name + '</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Email</div><div class="col-auto">' + user.email + '</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Address</div><div class="col-auto">' + user.street + '<br>' + user.city + ', ' + user.state + ' ' + user.zip +'</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Phone</div><div class="col-auto">' + user.phone + '</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Gender</div><div class="col-auto">' + user.gender + '</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Date of Birth</div><div class="col-auto">' + user.dob + '</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Student ID</div><div class="col-auto">' + user.student_id + '</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Dorm</div><div class="col-auto">' + dorm + '</div></div>'));
        $('#user-info').append($('<div class="row"><div class="col">Room Number</div><div class="col-auto">' + room_number + '</div></div>'));

        $('#user').show();
        
    })


});