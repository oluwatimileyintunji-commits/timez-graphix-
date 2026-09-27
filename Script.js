const SUPABASE_URL = "https://yfeksxaipskjluiuoxdu.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_2xJOW7uRIeea9kpKG6sfJw_bt0xWFpW";

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    alert("Sending order...");

    try {

        // SAVE ORDER TO SUPABASE
        const response = await fetch(
            SUPABASE_URL + "orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": "Bearer " + SUPABASE_KEY,
                    "Prefer": "return=minimal"
                },

                body: JSON.stringify({
                    customer_name: name,
                    customer_phone: phone,
                    service: service,
                    order_details: message,
                    status: "Pending"
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        // CREATE WHATSAPP MESSAGE
        const whatsappMessage =
            "Hello Timez Graphix!%0A%0A" +
            "🔔 *NEW ORDER*%0A%0A" +
            "👤 Customer: " +
            encodeURIComponent(name) +
            "%0A" +

            "📱 Customer WhatsApp: " +
            encodeURIComponent(phone) +
            "%0A" +

            "🎨 Service: " +
            encodeURIComponent(service) +
            "%0A%0A" +

            "📝 Order Details:%0A" +
            encodeURIComponent(message);

        // YOUR WHATSAPP NUMBER
        const myWhatsApp = "2349035366549";

        const whatsappURL =
            "https://wa.me/" +
            myWhatsApp +
            "?text=" +
            whatsappMessage;

        alert("Order saved successfully! Opening WhatsApp...");

        // OPEN WHATSAPP
        window.open(whatsappURL, "_blank");

        // CLEAR FORM
        orderForm.reset();

    } catch (error) {

        console.log("SUPABASE ERROR:", error);

        alert(
            "DATABASE ERROR:\n\n" +
            error.message
        );
    }
});