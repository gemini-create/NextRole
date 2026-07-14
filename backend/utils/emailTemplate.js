const emailTemplate = (username, otp) => {
    return `
    <div style="font-family: Arial, sans-serif; background:#0f766e; padding:40px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:10px;">

            <div style="background:#2563eb; padding:25px; text-align:center;">
                <h1 style="color:white;">NextRole</h1>
            </div>

            <div style="padding:30px;">
                <h2>Hello ${username}</h2>
                <p>We received a request to reset your password. </p>

                <div style="
                    margin:30px 0;
                    text-align:center;
                    font-size:34px;
                    font-weight:bold;
                    color:#0f766e;
                    letter-spacing:8px;">
                    ${otp}
                </div>

                <p>This OTP will expire in <b>5 minutes</b>. </p>

                <p>If you didn't request this, simply ignore this email.</p>
                <br>
                <p>
                    Regards,<br>
                    <b>NextRole Team</b>
                </p>
            </div>
        </div>
    </div>
    `;
};

module.exports = {
    emailTemplate,
};