<?php
  /**
   * ============================================================================
   * G-MAX TECH - PREMIUM CONTACT FORM HANDLER
   * Requires the 'PHP Email Form' library included in the assets/vendor folder.
   * ============================================================================
   */

  // Replace with your real receiving email address
  $receiving_email_address = 'gmaxkedesigns@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library! Please check your file paths.' );
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  
  // Clean up the subject line for your inbox
  $selected_service = isset($_POST['subject']) ? $_POST['subject'] : 'General Inquiry';
  $contact->subject = 'G-Max Tech Website Enquiry: ' . ucfirst(str_replace('-', ' ', $selected_service));

  // ==========================================================================
  // SMTP CONFIGURATION (Highly Recommended for Gmail Delivery)
  // Uncomment the code below and enter your SMTP credentials if emails are 
  // going to spam or not delivering. (Use a Google App Password if using Gmail)
  // ==========================================================================
  /*
  $contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => 'gmaxkedesigns@gmail.com',
    'password' => 'YOUR_GOOGLE_APP_PASSWORD',
    'port' => '587'
  );
  */

  // Add the form messages to the email body
  $contact->add_message( $_POST['name'], 'Client Name');
  $contact->add_message( $_POST['email'], 'Email Address');
  
  // Capture Phone Number if provided
  if (isset($_POST['phone']) && !empty($_POST['phone'])) {
      $contact->add_message($_POST['phone'], 'Phone Number');
  }
  
  // Add the main message block
  $contact->add_message( $_POST['message'], 'Project Details / Message', 10);

  // Send the email and echo the result back to the JS handler
  echo $contact->send();
?>