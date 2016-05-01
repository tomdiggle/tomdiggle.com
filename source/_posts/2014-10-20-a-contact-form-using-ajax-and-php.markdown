---
layout: "post"
title: "A Contact Form Using AJAX and PHP"
date: 2014-10-20 15:00
categories: "JavaScript"
vanityurlpath:
twitter_description: "A Contact Form Using AJAX and PHP"
---

In this blog post, you’ll learn how to create a website contact form that uses JavaScript and AJAX to submit the form and PHP to validate and send the form data via email. This example uses [XMLHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest) instead of popular JavaScript library [jQuery](http://jquery.com). The code for the contact form can be found on [GitHub](https://github.com/tomdiggle/contact-form).

## Requirements
- Submit form using AJAX
- Validate the form
- Display a message if successful or errors occur
- Email submitted form data

Now we have the requirements, let’s get started.

## The HTML
Firstly, you’ll need to set up the form that will collect the data. The form is simple HTML with a ```<div>``` to display any message returned a few inputs to collect data and a button which is used for submitting the form.

~~~ html
<div class="container">
    <form action="contact.php" method="post" id="form_contact">
        <div id="form_contact_message"></div>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
        <label for="message">Message</label>
        <textarea name="message" id="message" required></textarea>
        <button type="submit" id="form_contact_submit">Send Message</button>
    </form>
</div>
~~~

You’ll also need to add styling to the form. This can be done by adding a ```<link>``` element in the ```<head>``` to load the stylesheet. You can download the stylesheet from the [GitHub repo](https://github.com/tomdiggle/contact-form).

~~~ html
<link href="style.css" rel="stylesheet" type="text/css">
~~~

Finally, you’ll need to include the JavaScript file. This can be done by adding a ```<script>``` element that references ```contact.js```. This can be placed just before the closing ```</body>``` tag.

~~~ html
<script src="contact.js"></script>
~~~

That’s all for the HTML. Next up is the JavaScript.

## Submit the form using AJAX
You’ll need to attach a ```submit``` event to the contact form using the ```addEventListener()``` method. This event will intercept any ```submit``` events on the form. You also need to call the ```preventDefault()``` method to stop the browser from submitting the form as it normally would.

~~~ javascript
document.getElementById('form_contact').addEventListener('submit', function(event) {
  event.preventDefault();

  // TODO
});
~~~

Next, you need to store the form data in a ```FormData``` object. ```FormData``` objects provide a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the ```XMLHttpRequest send()``` method. You also need to create an instance of ```XMLHttpRequest``` object and initialise a request using the ```XMLHttpRequest open()``` method.

~~~ javascript
var formData = new FormData(document.getElementById('form_contact'));
var xhr = new XMLHttpRequest();
xhr.open('POST', 'contact.php');
~~~

When a request is sent to a server, you will want to perform some actions based on the response. The ```onreadystatechange``` stores a function that gets called each time the ```readyState``` property changes.

When the ```readyState``` equals 4 and the ```status``` also equals ```200```, the response is ready. If the response is successful you will need to parse the ```responseText``` property using the ```JSON.parse()``` method. Otherwise, if the response is unsuccessful an error message is displayed to the user.

~~~ javascript
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
        document.getElementById('form_contact_message').innerHTML = '<p class="error">There was an error when trying to send your message. Please try again, or send an email directly at <a href="mailto:mail@yourdomain.com">mail@yourdomain.com</a>.</p>';
    }
}
~~~

The parsed response from the server will have two properties, a ```string``` which will hold a message and a ```Boolean``` value which will be used to check for errors. If the ```Boolean``` property is true, no errors have occurred you can display a message in the ```form_contact_message``` element and disable the submit button to stop the user sending multiple messages. Otherwise, an error message is displayed to the user in the ```form_contact_message``` element describing the what went wrong.

Finally, send the form data using the ```XMLHttpRequest send()``` method.

~~~ javascript
xhr.send(formData);
~~~

This completes the JavaScript, on to the PHP.

## The PHP
The PHP first makes sure the data submitted by the user is valid. If the data is valid, then the data gets sent by email using the built in ```mail()``` function and a response is sent back to the browser encoded in JSON using the ```json_encode()``` function.

~~~ php
class contactForm {

    function formValidate() {

        $name = @$_POST['name'];
        $email = @$_POST['email'];
        $message = @$_POST['message'];
        $to = 'mail@yourdomain.com';
        $subject = @$_POST['name'] . ' has sent you a message from your site';

        $return = array();
        $return['error'] = false;
        $return['msg'] = '';

        if (!isset($message) || empty($message))
        {
            $return['error'] = true;
            $return['msg'] = 'Please enter a message.';
        }

        if (!isset($email) || empty($email))
        {
            $return['error'] = true;
            $return['msg'] = 'Please enter your email.';
        }

        if (!isset($name) || empty($name))
        {
            $return['error'] = true;
            $return['msg'] = 'Please enter your name.';
        }

        if ($return['error'] === false)
        {
            $body = "From: $name\n\nE-Mail: $email\n\nMessage:\n$message";
            $headers = 'From: ' . $email . '' . "\r\n" .
                       'Reply-To: ' . $email . '' . "\r\n" .
                           'X-Mailer: PHP/' . phpversion();

            if (mail($to, $subject, $body, $headers))
            {
                $return['msg'] = 'Your message was sent successfully. You will receive a response shortly.';
            }
            else
            {
                $return['error'] = true;
                $return['msg'] = 'There was an error when trying to process your request. Please try again, or send an email directly to us at <a href="' . $to . '">' . $to . '</a>.';
            }
        }

        return json_encode($return);
    }
}

$contactForm = new contactForm;
echo $contactForm->formValidate();
~~~

You will need to change the value of the ```$to``` variable to your email address.

## Conclusion
That’s it. A fully working contact form for your website using JavaScript, AJAX and PHP. The code for the contact form can be found on [GitHub](https://github.com/tomdiggle/contact-form).

One last thing, ```FormData``` objects have limited support on mobile browsers and IE has support in version 10+, so check your browser requirements before using this contact form on your website.

## Further Reading
- [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener)
- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
