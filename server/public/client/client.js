$( document ).ready( onReady );

function onReady(){
    getTask();
    $( document ).on( 'click', '#addTaskBtn', addTask );
    $( document ).on( 'click', '.changeStatusBtn', changeStatus );
    $( document ).on( 'click', '.deleteBtn', deleteItem );
} // end onReady

function addTask(){
    let objectToSend = {
        task: $( '#taskIn' ).val(),
        urgency: $( '#urgencyIn' ).val(),
        status: 'Incomplete'
    } // end objectToSend
    $.ajax( {
        method: 'POST',
        url: `/tasks`,
        data: objectToSend
    } ).then( function( response ) {
        console.log( 'inside of ajax GET, response:', response );
        getTask();
    } ).catch( function( err ) {
        alert( 'error in ajax POST' );
        console.log( err );
    } ); // end ajax POST
} // end addTask

function getTask(){
    $.ajax( {
        method: 'GET',
        url: `/tasks`
    } ).then( function( response ) {
        console.log( 'inside of ajax GET, response:', response );
        let el = $( '#listOut' );
        el.empty();
        for( let i = 0; i < response.length; i++ ){
            if( response[ i ].status === 'Incomplete' ){
                el.append( `
                <tr>
                    <td>${ response[ i ].task }</td>
                    <td>${ response[ i ].urgency }</td>
                    <td>${ response[ i ].status }</td>
                    <td><button class="changeStatusBtn" data-id="${ response[ i ].id }">Change Status</button></td>
                    <td><button class="deleteBtn" data-id="${ response[ i ].id }">Delete</button></td>
                </tr>
            ` ); // end append
            } // end if
            else{
                el.append( `
                <tr class="complete">
                    <td>${ response[ i ].task }</td>
                    <td>${ response[ i ].urgency }</td>
                    <td>${ response[ i ].status }</td>
                    <td></td>
                    <td><button class="deleteBtn" data-id="${ response[ i ].id }">Delete</button></td>
                </tr>
            ` ); // end append
            } // end else
        } // end for
    } ).catch( function( err ) {
        alert( 'error in ajax GET' );
        console.log( err );
    } ); // end ajax GET
} // end getTask

function changeStatus(){
    let taskId = $( this ).data( 'id' );
    console.log( 'in changeStatus' );
    $.ajax( {
        method: 'PUT',
        url: `/tasks/${ taskId }`,
        data: {
            status: 'Incomplete'
        } // end data
    } ).then( function( response ){
        console.log( 'inside ajax PUT, response:', response );
        $( '.taskRow' ).addClass( 'complete' );
        getTask();
    } ).catch( function( err ){
        alert( 'error in ajax PUT' );
        console.log( err );
    } ); // end ajax PUT
} // end changeStatus

function deleteItem(){
    let taskId = $( this ).data( 'id' );
    $.ajax( {
        method: 'DELETE',
        url: `tasks/${ taskId }`
    } ).then( function( response ){
        console.log( 'inside ajax DELETE, response:', response );
        getTask();
    } ).catch( function( err ){
        alert( 'error in ajax DELETE' );
        console.log( err );
    } ); // end ajax
} // end deleteItem