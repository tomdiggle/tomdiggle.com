jQuery(document).ready(function($) {
    $('#contact').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'contact.php',
            data: $(this).serialize(),
            dataType: 'json',
            timeout: 3000,
            success: function(s) {
                if (s.error == false) {
                    $('#contact_status').html('<p class="success">' + s.msg + '</p>');  
                    $('#submit').prop('value', 'Message sent');
                    $('#submit').prop('disabled', true);
                } else {
                    $('#contact_status').html('<p class="error">' + s.msg + '</p>');
                }
            },
            error: function(t, s) {
               $('#contact_status').html('There was an error when trying to send your message. Please try again, or send an email directly at <a href="mailto:tom+website@tomdiggle.com">tom+website@tomdiggle.com</a>.');
            }
        })
    });
});
