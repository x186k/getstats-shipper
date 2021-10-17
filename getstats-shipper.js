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
 * @return {string}
 **/
function rand63string() {
    var b = new BigUint64Array(1)
    window.crypto.getRandomValues(b)
    return BigInt.asUintN(63, b[0]).toString()
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
    console.debug('will send stats: statsUrl cookie WAS found')

    const ct = { 'Content-Type': 'application/json' }

    // a single unique 64 bit value per RTCPeerConnection
    // makes SQLite analysis easier
    const pcid = rand63string()     

    // milliseconds between reports
    const period = 30 * 1000 

    // launch first with no delay
    setTimeout(myCallback, 0)

    function myCallback() {
        pc.getStats(null).then(stats => {
            let reports = Object.fromEntries(stats)

            let body = { PCID: pcid, Reports: reports }

            let json = JSON.stringify(body)

            let fo = {
                method: 'POST',
                /** @type {RequestMode} */ mode: 'no-cors', // magic is real!
                headers: ct,
                body: json
            }

            fetch(url, fo)

            setTimeout(myCallback, period)
        })

    }
}
