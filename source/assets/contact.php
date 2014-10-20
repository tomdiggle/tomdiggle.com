<?php

class contactForm {

    function formValidate() {

        $name = @$_POST['name'];
        $email = @$_POST['email'];
        $message = @$_POST['message'];
        $to = 'tom+website@tomdiggle.com';
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

?>
