<style>
  /* -------------------------------------
  RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
  @media only screen and (max-width: 620px) {
    table[class=body] h1 {
      font-size: 28px !important;
      margin-bottom: 10px !important;
    }

    table[class=body] p,
    table[class=body] ul,
    table[class=body] ol,
    table[class=body] td,
    table[class=body] span,
    table[class=body] a {
      font-size: 16px !important;
    }

    table[class=body] .wrapper,
    table[class=body] .article {
      padding: 10px !important;
    }

    table[class=body] .content {
      padding: 0 !important;
    }

    table[class=body] .container {
      padding: 0 !important;
      width: 100% !important;
    }

    table[class=body] .main {
      border-left-width: 0 !important;
      border-radius: 0 !important;
      border-right-width: 0 !important;
    }

    table[class=body] .btn table {
      width: 100% !important;
    }

    table[class=body] .btn a {
      width: 100% !important;
    }

    table[class=body] .img-responsive {
      height: auto !important;
      max-width: 100% !important;
      width: auto !important;
    }
  }

  /* -------------------------------------
  PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */
  @media all {
    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    .apple-link a {
      color: inherit !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      text-decoration: none !important;
    }

    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    .btn-primary table td:hover {
      background-color: #4A7A27 !important;
    }

    .btn-primary a:hover {
      background-color: #4A7A27 !important;
      border-color: #4A7A27 !important;
    }
  }
</style>
<span class="preheader"
  style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">
  [Fy-Vue.com] Account Validation
</span>
<table border="0" cellpadding="0" cellspacing="0" class="body"
  style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
  <tr>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
    <td class="container"
      style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
      <div class="content"
        style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

        <!-- START CENTERED WHITE CONTAINER -->
        <table class="main"
          style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
          <tr>
            <td>
              <br />
              <h1 style="text-align: center;">Welcome to Fy-Vue</h1>
            </td>
          </tr>
          <!-- START MAIN CONTENT AREA -->
          <tr>
            <td class="wrapper"
              style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
              <table border="0" cellpadding="0" cellspacing="0"
                style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                <tr>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                    <p
                      style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                      Here is the code you need to finalize your registration:
                    </p>
                    <p
                      style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                      &nbsp;
                    </p>
                    <p
                      style="font-family: sans-serif; font-size: 18px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                      {{_USR/Validation_Code}}
                    </p>
                    <p
                      style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                      &nbsp;
                    </p>
                    <p
                      style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                      Your login: <b>{{_USR/Email|entities()}}</b>
                    </p>
                    <p
                      style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                      &nbsp;
                    </p>
                    <p
                      style="font-family: sans-serif; font-size: 12px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                      If you are not trying to create a new account, please ignore this email. It is possible that this
                      message was delivered to you accidentally. </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- END MAIN CONTENT AREA -->
        </table>

        <!-- START FOOTER -->
        <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
          <table border="0" cellpadding="0" cellspacing="0"
            style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
            <tr>
              <td class="content-block"
                style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">
                  This message was automatically sent to you. Please do not respond to it.
                </span>
                <br> {{@string("now")|date("%Y")}} ©
                <a href="https://www.fy-vue.com/" target="_blank"
                  style="text-decoration: underline; font-size: 12px; text-align: center;">www.fy-vue.com</a>.
              </td>
            </tr>
          </table>
        </div>
        <!-- END FOOTER -->

        <!-- END CENTERED WHITE CONTAINER -->
      </div>
    </td>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
  </tr>
</table>
