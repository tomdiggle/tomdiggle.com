document.getElementById('form_contact').addEventListener('submit', function(event) {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/assets/contact.php');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.error === false) {
                document.getElementById('form_contact_message').innerHTML = '<p class="success">' + response.msg + '</p>';
                document.getElementById('form_contact_submit').innerHTML = 'Message Sent';
                document.getElementById('form_contact_submit').disabled = true;
            } else {
                document.getElementById('form_contact_message').innerHTML = '<p class="error">' + response.msg + '</p>';
            }
        } else {
            document.getElementById('form_contact_message').innerHTML = '<p class="error">There was an error when trying to send your message. Please try again, or send an email directly at <a href="tom+website@tomdiggle.com">tom+website@tomdiggle.com</a>.</p>';
        }
    }

    var data = '';
    var elements = document.getElementById('form_contact').elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        if (elements[i].tagName === 'INPUT' || elements[i].tagName === 'TEXTAREA' || elements[i].tagName === 'SELECT') {
            data += elements[i].name + '=' + encodeURIComponent(elements[i].value) + '&';
        }
    }
    data = data.substring(0, data.length - 1);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
});
