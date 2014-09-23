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

function _gaLt(event){
    var el = event.srcElement || event.target;

    /* Loop up the tree through parent elements if clicked element is not a link (eg: an image inside a link) */
    while(el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href))
        el = el.parentNode;

    if(el && el.href){
        if(el.href.indexOf(location.host) == -1){ /* external link */
            ga("send", "event", "Outgoing Links", el.href, document.location.pathname + document.location.search);
            /* if target not set then delay opening of window by 0.5s to allow tracking */
            if(!el.target || el.target.match(/^_(self|parent|top)$/i)){
                setTimeout(function(){
                    document.location.href = el.href;
                }.bind(el),500);
                /* Prevent standard click */
                event.preventDefault ? event.preventDefault() : event.returnValue = !1;
            }
        }
    }
}

/* Attach the event to all clicks in the document after page has loaded */
var w = window;
w.addEventListener ? w.addEventListener("load",function(){document.body.addEventListener("click",_gaLt,!1)},!1)
  : w.attachEvent && w.attachEvent("onload",function(){document.body.attachEvent("onclick",_gaLt)});
