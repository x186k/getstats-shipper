//@ts-check  
//The @ts-check statement above enables jsdoc typechecking
// https://stackoverflow.com/a/52076280/86375
// http://demo.unified-streaming.com/players/dash.js-2.4.1/build/jsdoc/jsdoc_cheat-sheet.pdf

/**
 * @param {string} name
 **/

 function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
 }


/**
 * @param {RTCPeerConnection} pc
 */
function startGetStatsShipping(pc) {

    let url = getCookie('getstats-shipper-url')
    if (typeof url === 'undefined') {
        console.debug('statsUrl cookie not found')
        return
    }
    console.debug('statsUrl cookie WAS found')

    const ct = { 'Content-Type': 'application/json' }

    const period = 30 * 1000 // milliseconds

    // launch first with no delay
    setTimeout(myCallback, 0)

    function myCallback() {
        pc.getStats(null).then(stats => {
            let json = JSON.stringify(Object.fromEntries(stats))

            let fo = { method: 'POST', headers: ct, body: json }

            fetch(url, fo)

            setTimeout(myCallback, period)
        })

    }
}
